import express from 'express'
//import data from '../../src/data.js'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from './utils.js'

const userRouter = express.Router()

/*Rotas admin*/ 
userRouter.get('/' , isAuth, expressAsyncHandler( async (req, res)=>{
    const user = await User.find({})
    res.send(user)
}))

userRouter.delete('/:id', isAuth, expressAsyncHandler(async (req, res)=>{
   const user = await User.findById(req.params.id)
   if(user){
        if(user.isAdmin === true){
            return  res.status(400).send({ message: 'Você não pode deletar um usuário admin '})
        }
        
        const deleteUser = await user.remove()
        res.send({ message : 'Usuário deletado com sucesso! ' , user: deleteUser})
   }else{
       res.status(404).send({ message : 'Usuário não existe no sistema'})
   }
}))

userRouter.put('/:id', isAuth, expressAsyncHandler( async (req, res)=>{
   
    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null ){
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
       
    }

   
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)

        const updateUser = await user.save()
        res.send({message : 'Usuário editado com sucesso! ', user: updateUser})
    }else{
        res.status(404).send({ message : 'Usuário não existe no sistema'})
    }

}))




/*rotas normais*/

userRouter.get('/:id', expressAsyncHandler( async (req, res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        res.send(user)
    }else{
        res.status(404).send({message: 'Usuário não existe no sistema'})
    }
}))

/*
userRouter.get('/add' , expressAsyncHandler( async (req, res)=>{
    const createUser = await User.insertMany(data.user)
    res.send({createUser})
}))
*/

userRouter.post('/sign-in', expressAsyncHandler( async (req, res)=>{

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null ){
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
       
    }

    if(!req.body.password|| typeof req.body.password == undefined || req.body.password == null ){
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
   
    }

    const user = await User.findOne({email : req.body.email})
   

    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin : user.isAdmin,
                token: generateToken(user)
            })
            return
        }

    }
        res.status(401).send({message : 'email e/ou senha inválido(s)'})
}))

userRouter.post('/register', expressAsyncHandler( async (req, res)=>{

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null ){
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
       
    }

    if(!req.body.password|| typeof req.body.password == undefined || req.body.password == null ){
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
   
    }

    const user = await User.findOne({email : req.body.email})
    if(user){
        return res.status(401).send({message : 'Usuário já existe no sistema!'})
    }


    const userNew = new User({name : req.body.name , email : req.body.email , password : bcrypt.hashSync(req.body.password , 8)})
    const createdUser = await userNew.save()
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin : createdUser.isAdmin,
        token: generateToken(createdUser)
    })

}))

userRouter.put('/update' , isAuth, expressAsyncHandler( async (req, res)=>{
    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null ){
        
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null ){
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
       
    }

    if(!req.body.password|| typeof req.body.password == undefined || req.body.password == null ){
        return res.status(400).send({ message : 'Preencha os campos obrigatórios!'})
   
    }

    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = bcrypt.hashSync( req.body.password , 8)
        user.updateAt =  Date.now()  
        
        const updateUser = await user.save()

        res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin : updateUser.isAdmin,
            token: generateToken(updateUser)
        })

    }else{
        res.status(404).send({ message : 'Usuário não encontrado no sistema!'})
    }


}))


export default userRouter