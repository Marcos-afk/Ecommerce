import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import { isAuth } from './utils.js'

const orderRouter = express.Router()

/*Rotas admin*/

orderRouter.get('/',isAuth, expressAsyncHandler (async (req, res) =>{
    const orders = await Order.find({})
    if(orders){
        res.send(orders)
    }else{
      res.status(404).send({message : 'Não existe encomendas!'})
    }
}))

/*Rotas Normais*/
orderRouter.get('/list', isAuth, expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if(orders){
    res.status(201).send(orders)
  }else{
    res.status(404).send({message : 'Usuário não possui histórico'})
  }
  
}))


orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
      if (req.body.orderItems.length === 0) {
        return res.status(400).send({ message: 'Carrinho vázio' });
      } 
        const order = new Order({
          orderItems: req.body.orderItems,
          shippingAddress: req.body.shippingAddress,
          paymentMethod: req.body.paymentMethod,
          itemsPrice: req.body.ItemsPrice,
          shippingPrice: req.body.shippingPrice,
          taxPrice: req.body.TaxPrice,
          totalPrice: req.body.TotalPrice,
          user: req.user._id,
        })
        const createdOrder = await order.save();
        res.status(201).send({ message: 'Encomenda solicitada ', order: createdOrder })
      
    })
  )

  orderRouter.get('/:id' , isAuth , expressAsyncHandler( async (req, res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
      res.send(order)
    }else{
      res.status(404).send({message : 'Pedido não existe no sistema'})
    }
  }))

  orderRouter.put('/:id/pay', isAuth, expressAsyncHandler (async (req, res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {id : req.body.id, status : req.body.status, update_time: req.body.update_time, email_address: req.body.email_address}
      const updateOrder = await order.save()
      res.status(201).send({ message: 'Pagamento realizado com sucesso ', order: updateOrder })
    }else{
      res.status(404).send({message : 'Pedido não existe no sistema'})
    }

    
  }))



export default orderRouter