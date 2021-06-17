
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePayment } from '../actions/cartAction'
import CheckOutSteps from '../components/checkOutSteps'

export default function Payment(props){
    
    const [payment, setPayment] = useState('PayPal')
    const dispatch = useDispatch()

    const cart = useSelector( state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress.address){
        props.history.push('/shipping')
    }


    function submitHandler(e) {
        e.preventDefault()
        dispatch(savePayment(payment))
        props.history.push('/placeorder')
    }


    return (
        <div>
            <CheckOutSteps step1 step2 step3/>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1> Formas de pagamento</h1>
                </div>

                <div>
                    <div>
                        <label htmlFor="PayPal"> 
                        <input type="radio" id="PayPal" value="PayPal" name="payment" required checked onChange={e => setPayment(e.target.value) }/>
                        &nbsp; PayPal
                        </label>
                       
                    </div>
                </div>

                 <div>
                    <div>
                        <label htmlFor="Other"> 
                        <input type="radio" id="Other" value="Other" required name="payment"  onChange={e => setPayment(e.target.value) }/>
                        &nbsp; Outro tipo de pagamento 
                        </label>
                       
                    </div>
                </div>
                     
                <div>
                 <label/>   
                <button className="primary" type="submit">Continuar</button>
                </div>

            </form>
        </div>
    )
    
}