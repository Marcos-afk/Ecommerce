import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartAction'
import MessageBox from '../components/MessageBox'
import { Link} from 'react-router-dom'

export default function Cart(props){
    const dispatch = useDispatch()
    const produtoId = props.match.params.id
    const qtd = props.location.search? Number(props.location.search.split('=')[1]) : 1

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(() =>{
        if(produtoId){
            dispatch(addToCart(produtoId, qtd))
        }
    }, [dispatch , produtoId, qtd])

    function RemoveFromCartHanlder(_id){
        
        dispatch(removeFromCart(_id))
    }

    function checkoutHandler(){
        props.history.push('/sign-in?redirect=shipping')
    }

    return(
        <div className="row top">
            <div className="colum2">
                <h1>Carrinho de compras</h1>
                {cartItems.length === 0 ?
                 <MessageBox>Carrinho de compras vázio! <br></br>
                     <Link to="/"> Ir para as compras</Link>
                </MessageBox> 
                 : 
                 (
                    <ul>
                        {
                            cartItems.map( item => (
                                <li key={item.produto}>
                                    <div className="row">
                                        <div>
                                            <img src={item.image} alt={item.name} className="small"/>
                                        </div>

                                   
                                    <div className="min-30">
                                        <Link to={`/produtos/${item.produto}`}>{item.name}</Link>
                                    </div>
                                    <div>
                                        <select value={item.qtd} onChange={ e => 
                                        dispatch(
                                            addToCart(item.produto, Number(e.target.value)
                                        ))}>
                                        {
                                                            [...Array(item.countInStock).keys()].map(x => (
                                                                <option key={x+1} value={x + 1} >{ x + 1}</option>
                                                            ))
                                                        }

                                        </select>
                                    </div>
                                    <div>
                                        ${item.price}
                                    </div>
                                    <div>
                                        <button type="button" onClick={ () => {RemoveFromCartHanlder(item.produto)}}> Remover do carrinho</button>
                                    </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                 )
                 }

            </div>
            <div className="colum1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h1>
                                Quantidade total : {cartItems.reduce((a, c) => a + c.qtd, 0)}<br/>
                                Preço total : {cartItems.reduce((a, c) => a + (c.price * c.qtd) , 0)}
                            
                            </h1>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className="primary block"
                            disabled={cartItems.length === 0 }> Finalizar compra</button>
                        </li>
                    </ul>
                </div>

            </div>
            
        </div>
    )
}