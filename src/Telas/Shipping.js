import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAdress } from '../actions/cartAction'
import CheckOutSteps from '../components/checkOutSteps'

export default function Shipping(props){
    
    const userSignin = useSelector((state) => state.userSign)
    const { userInfo } = userSignin

    if(!userInfo){
        props.history.push('/sign-in')
    }

    const cart = useSelector( state => state.cart)
    const {shippingAddress} = cart

    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    function submitHandler(e) {
        e.preventDefault()
        dispatch(saveShippingAdress({fullName, address, city, postalCode, country}))
        props.history.push('/payment')
        
    }

    return(
        <div>
            <CheckOutSteps step1 step2/>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Endereço para envio</h1>
                </div>

                <div>
                    <label htmlFor="fullName"> Nome completo</label>
                    <input type="text" id="fullName" placeholder="Digite aqui seu nome completo" required
                    value={fullName} onChange={ e => setFullName(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="address"> Endereço</label>
                    <input type="text" id="address" placeholder="Digite aqui o endereço de entrega" required
                    value={address} onChange={ e => setAddress(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="city"> Cidade</label>
                    <input type="text" id="city" placeholder="Digite aqui o nome da cidade de entrega" required
                    value={city} onChange={ e => setCity(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="postalCode"> Código postal</label>
                    <input type="text" id="postalCode" placeholder="Digite aqui o código postal da cidade de entrega" required
                    value={postalCode} onChange={ e => setPostalCode(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="country"> País</label>
                    <input type="text" id="country" placeholder="Digite aqui o nome do país de entrega" required
                    value={country} onChange={ e => setCountry(e.target.value)}/>
                </div>


                <div>
                 <label/>   
                <button className="primary" type="submit">Continuar</button>
                </div>


            </form>
        </div>

    )

    
}