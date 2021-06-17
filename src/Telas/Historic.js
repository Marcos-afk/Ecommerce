import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { historicOrder } from '../actions/orderAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function Historic(props){
    const OrderHistoric = useSelector(state => state.OrderHistoric)
    const {orders , loading , error} = OrderHistoric

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(historicOrder())

    },[dispatch])
    
    return(
        <div>
            <h1>Histórico de encomendas</h1>
            {
                loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                : 
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Data</th>
                                <th>Preço total</th>
                                <th>Pago ?</th>
                                <th>Entregue ?</th>
                                <th>Ações</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order)=>(
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Não'}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Não'}</td>
                                        <td>
                                            <button type="button" className="small"
                                            onClick={()=>{props.history.push(`/order/${order._id}`)}}>Detalhes</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }


        </div>
    )
    
}
