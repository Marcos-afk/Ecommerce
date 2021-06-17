import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsOrder, payOrder } from '../actions/orderAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { ORDER_PAY_RESET } from '../constantes/orderConstante'

export default function OrderScreen(props){

    const orderId = props.match.params.id
    const [sdkReady, setSdkReady] = useState(false)
    const OrderDetails = useSelector(state => state.OrderDetails)   
    const {order, loading, error} = OrderDetails

    const OrderPay = useSelector(state => state.OrderPay)
    const {loading: loadingPay, error : errorPay, success : successPay} = OrderPay
   
    const dispatch = useDispatch()

    useEffect(()=>{
        const addPayPalScript = async () => {
            const {data} = await Axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
            script.async = true
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script)
        }

        if(!order || successPay || (order && order._id !== orderId)){
            dispatch({type: ORDER_PAY_RESET})
            dispatch(detailsOrder(orderId))
        }else{
            if(!order.isPaid){
                if(!window.paypal){
                    addPayPalScript()
                }else{
                    setSdkReady(true)
                }
            }
        }

        
    }, [dispatch, orderId, order, sdkReady, successPay])

    function successPaymentHandler(paymentResult) {
        dispatch(payOrder(order, paymentResult))
        
    }

    return loading ? (<LoadingBox></LoadingBox>)
            : error ? (<MessageBox variant="danger">{error}</MessageBox>) : 
            (
        <div>
            <h1> Id do pedido : {order._id}</h1>
             <div className="row top">
                <div className="colum2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Endereço para envio</h2>
                                <p> 
                                <strong>Nome : </strong> {order.shippingAddress.fullName} <br/>
                                <strong>Endereço : </strong> {order.shippingAddress.address} <br/>
                                <strong>Cidade : </strong> {order.shippingAddress.city}<br/>
                                <strong>Código Postal : </strong> {order.shippingAddress.postalCode} <br/>
                                <strong>País : </strong> {order.shippingAddress.country}
                               </p> 
                               <p>
                                {order.isDelivery ? 
                                   <MessageBox variant="success">Produto enviado</MessageBox>:
                                   <MessageBox variant="danger">Produto não enviado</MessageBox>

                                }
                               </p>

                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                            <h2>Método de pagamento</h2>
                            <p>
                                <strong>Método: </strong> {order.paymentMethod}
                            </p>  
                            <p>
                                {order.isPaid ? 
                                   <MessageBox variant="success">Produto pago</MessageBox>:
                                   <MessageBox variant="danger">Produto não pago</MessageBox>

                                }
                               </p> 

                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Itens a serem comprados</h2>
                                <ul>
                        {
                           order.orderItems.map( item => (
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
                                    <div>${order.itemsPrice.toFixed(2)}</div>

                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Taxa de envio</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>

                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Preço do imposto</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>

                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Valor total</strong></div>
                                    <div>${order.totalPrice.toFixed(2)}</div>

                                </div>
                            </li>
                            {
                                !order.isPaid && (
                                    <li>
                                        {!sdkReady? (
                                        <LoadingBox></LoadingBox>)
                                        :
                                        (
                                        <>
                                        {
                                            errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox>)
                                        }
                                        
                                        {
                                            loadingPay && (<LoadingBox></LoadingBox>)
                                        }
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                                        </> 
                                        ) 
                                    }
                                    </li>
                                )
                            }
                        </ul>

                    </div>
                </div>

             </div>
        </div>
    )

}