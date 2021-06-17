import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'
import produtoRouter from './routers/produtosRouter.js'
import dotenv from 'dotenv'
import orderRouter from './routers/orderRouter.js'
import multer from 'multer'
import {isAuth} from './routers/utils.js'
import path from 'path'


dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

mongoose.connect( process.env.MONGODB_URL || 'mongodb://localhost/ecommerce', {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex: true 
})

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}.jpg`);
    },
  });
  
  const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null, true)
    }else{
      cb(null, false)
    }
  }
  const upload = multer({ storage, fileFilter: fileFilter})
  
  app.post('/uploads',isAuth, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
  })

app.use('/api/users', userRouter)
app.use('/api/produtos', produtoRouter)
app.use('/api/order', orderRouter)
app.get('/api/config/paypal', (req, res)=>{
     res.send(process.env.PAYPAL_CLIENTE_ID || 'AU6pCeKIdScVIfM8QJkAI305gc-JXiskyuftKKHYy49XKVqCQ9wLUde1n9oyAOA6nL806-guw7Oixstp')
})


app.use((err, req, res, next)=>{
    res.status(500).send({ message : err.message})
})



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Servidor Rodando, url: http://localhost:${PORT}`)
})