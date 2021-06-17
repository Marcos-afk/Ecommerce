import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderList } from '../actions/orderAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function Orders(props) {

    const  OrderList = useSelector( state => state.OrderList)
    const {orders, loading, error} = OrderList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch( orderList())
    }, [dispatch])
    
    return (
        <div>
            <h1>Lista de encomendas</h1>
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
                            <th>Nome</th>
                            <th>Cidade</th>
                            <th>Código Postal</th>
                            <th>País</th>
                            <th>Data</th>
                            <th>Pago ?</th>
                            <th>Entregue ?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order) => (
                                   <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.shippingAddress.fullName}</td>
                                        <td>{order.shippingAddress.city}</td>
                                        <td>{order.shippingAddress.postalCode}</td>
                                        <td>{order.shippingAddress.country}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Não'}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Não'}</td>
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