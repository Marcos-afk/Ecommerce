import React from 'react'

export default function CheckOutSteps(props){
    return(
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active' : ''}>
                Login
            </div>

            <div className={props.step2 ? 'active' : ''}>
                Envio
            </div>

            <div className={props.step3 ? 'active' : ''}>
                Formas de pagamento
            </div>

            <div className={props.step4 ? 'active' : ''}>
                Fazer encomenda
            </div>

        </div>
    )
}

