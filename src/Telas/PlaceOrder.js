import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderAction'
import CheckOutSteps from '../components/checkOutSteps'
import { ORDER_CREATE_RESET } from '../constantes/orderConstante'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function PlaceOrder(props){

    const cart = useSelector( state => state.cart)

    if(!cart.paymentMethod){
        props.history.push('/payment')
    }

    const OrderCreate = useSelector(state => state.OrderCreate)
    const {loading, success, error, order} = OrderCreate

    const toPrice = (num) => Number(num.toFixed(2)) // 5.123 => "5.12" => 5.12
    cart.ItemsPrice = toPrice(cart.cartItems.reduce((a , c) => a + c.qtd * c.price , 0))
    cart.shippingPrice = cart.ItemsPrice > 100 ? toPrice(0) : toPrice(10)
    cart.TaxPrice = toPrice(0.10 * cart.ItemsPrice)
    cart.TotalPrice =  cart.ItemsPrice + cart.shippingPrice + cart.TaxPrice

    const dispatch = useDispatch()

    function submitPlaceHandler(){
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
    }

    useEffect(()=>{

        if(success){
            props.history.push(`/order/${order._id}`)
            dispatch({
                type: ORDER_CREATE_RESET
            })

        }

    }, [dispatch, order, props.history, success])


    return(
        <div>
             <CheckOutSteps step1 step2 step3 step4/>
             <div className="row top">
                <div className="colum2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Endereço para envio</h2>
                                <p> 
                                <strong>Nome : </strong> {cart.shippingAddress.fullName} <br/>
                                <strong>Endereço : </strong> {cart.shippingAddress.address} <br/>
                                <strong>Cidade : </strong> {cart.shippingAddress.city}<br/>
                                <strong>Código Postal : </strong> {cart.shippingAddress.postalCode} <br/>
                                <strong>País : </strong> {cart.shippingAddress.country}
                               </p> 

                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                            <h2>Método de pagamento</h2>
                            <p><strong>Método: </strong> {cart.paymentMethod}
                            </p>   

                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Itens a serem comprados</h2>
                                <ul>
                        {
                           cart.cartItems.map( item => (
                                <li key={item.produto}>
                                    <div className="row">
                                        <div>
                                            <img src={item.image} alt={item.name} className="small"/>
                                        </div>

                                   
                                    <div className="min-30">
                                        <Link to={`/produtos/${item.produto}`}>{item.name}</Link>
                                    </div>
                              
                                    <div>
                                      {item.qtd} &nbsp; x &nbsp; ${item.price} &nbsp; = &nbsp; ${item.qtd * item.price}
                                    </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>

                            </div>
                        </li>

                    </ul>
                </div>
                <div className="colum1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Resumo da encomenda solicitada</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Itens</div>
                                    <div>${cart.ItemsPrice.toFixed(2)}</div>

                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Taxa de envio</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>

                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Preço do imposto</div>
                                    <div>${cart.TaxPrice.toFixed(2)}</div>

                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Valor total</strong></div>
                                    <div>${cart.TotalPrice.toFixed(2)}</div>

                                </div>
                            </li>
                            <li>
                               
                                <button type="button" onClick={submitPlaceHandler} className="primary block"
                                disabled={cart.cartItems.length === 0 }>Solicitar encomenda</button>
                                 
                            </li>
                            <br/>
                            {
                                loading && <LoadingBox></LoadingBox>
                            }
                            {
                                error && <MessageBox variant="danger">{error}</MessageBox>
                            }
                        </ul>

                    </div>
                </div>

             </div>
        </div>
    )
    
}