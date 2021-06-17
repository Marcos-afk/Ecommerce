import express from 'express'
//import data from '../../src/data.js'
import Produto from '../models/produtosModel.js'
import expressAsyncHandler from 'express-async-handler'
import { isAuth } from './utils.js'

const produtoRouter = express.Router()

/*Rotas de Admin*/
produtoRouter.get('/admin', isAuth, expressAsyncHandler( async (req, res) => {
    const produtos = await Produto.find({})
    if(produtos){
        res.send(produtos)
    }else{
        res.status(404).send({message : 'Sem Produtos no Sistema'})
    }
}))

produtoRouter.post('/' ,isAuth,  expressAsyncHandler( async (req, res) =>{
   
    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.category || typeof req.body.category == undefined || req.body.category == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.price || typeof req.body.price == undefined || req.body.price == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.brand || typeof req.body.brand == undefined || req.body.brand == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.description || typeof req.body.description == undefined || req.body.description == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.countInStock || typeof req.body.countInStock == undefined || req.body.countInStock == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.image || typeof req.body.image == undefined || req.body.image == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }


    const produto = new Produto({
        name : req.body.name,
        category: req.body.category,
        image : req.body.image,
        price: req.body.price,
        brand: req.body.brand,
        rating : 5 ,
        numReviews : 5,
        description: req.body.description,
        countInStock : req.body.countInStock
    })

    const createdProduto = await produto.save()
    res.send({ message: 'Produto Criado', produto: createdProduto })
}))

produtoRouter.delete('/:id', isAuth, expressAsyncHandler( async (req, res)=>{
    const produto = await Produto.findById(req.params.id)
    if(produto){
        const deleteProdto = await produto.remove()
        res.send({ message : 'Produto deletado com sucesso! ' , produto: deleteProdto})
    }else{
        res.status(404).send({ message : 'Produto não existe no sistema'})
    }
}))

produtoRouter.put('/:id' , isAuth, expressAsyncHandler( async (req, res)=>{

     
    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.category || typeof req.body.category == undefined || req.body.category == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.price || typeof req.body.price == undefined || req.body.price == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.brand || typeof req.body.brand == undefined || req.body.brand == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.description || typeof req.body.description == undefined || req.body.description == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.countInStock || typeof req.body.countInStock == undefined || req.body.countInStock == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.image || typeof req.body.image == undefined || req.body.image == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    const produto = await Produto.findById(req.params.id)
    if(produto){
        produto.name = req.body.name || produto.name
        produto.category = req.body.category || produto.category
        produto.image = req.body.image || produto.image
        produto.price = req.body.price || produto.price
        produto.brand = req.body.brand || produto.brand
        produto.rating = 5 || produto.rating
        produto.numReviews = 5 || produto.numReviews
        produto.description = req.body.description || produto.description
        produto.countInStock = req.body.countInStock || produto.countInStock
        const updateProduto = await produto.save()
        res.send({message : 'Produto editado com sucesso! ', user: updateProduto})
    }else{
        res.status(404).send({ message : 'Produto não existe no sistema'})
    }

}))



/*Rotas normais*/
produtoRouter.get('/', expressAsyncHandler( async (req, res)=>{
   const produtos =  await Produto.find({})
   res.send(produtos)
}))

produtoRouter.get('/:id', expressAsyncHandler( async (req, res)=>{
    const produto = await Produto.findById(req.params.id)
    if(produto){
        res.send(produto)
    }else{
        res.status(404).send({message : 'produto não existe no sistema'})
    }
}))



/*produtoRouter.get('/add', expressAsyncHandler( async (req , res) =>{
    const createProduto = await Produto.insertMany(data.produtos)
    res.send({createProduto})
}))*/

export default produtoRouter