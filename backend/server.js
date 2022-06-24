import path from 'path'
import express from  'express'
// import products from  './data/products.js'
import dotenv from  'dotenv'
import connectDB from './config/db.js'
import  Color  from 'colors'
import productRouter from './routes/productRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import  authUserRouter  from './routes/userRoutes.js'
import  orderRouter  from './routes/orderRoutes.js'
import  uploadRouter  from './routes/uploadRoutes.js'
import morgan from 'morgan'
dotenv.config()
connectDB()
const app=express()

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}


app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Api is running')
})

// app.use((req,res,next)=>{
//     console.log('hello');
//     console.log(req.originalUrl);
//     next()
// })

app.use('/products' , productRouter)
app.use('/users' , authUserRouter)
app.use('/orders' , orderRouter)
app.use('/upload',uploadRouter)

app.get('/api/config/paypal',(req,res)=>
res.send(process.env.PAYPAL_CLIENT_ID)
)
const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send(`API is running....`)
     
    })
  }

app.use(notFound)
app.use(errorHandler)

// app.use((req,res,next)=>{
//     const error=  new Error (`Not Found ${req.originalUrl}`)
//     res.status(404)
//     next(error)
// })

// app.use((err,req,res,next)=>{
//     const statusCode= res.statusCode === 200 ? 500 : res.statusCode
//     res.status(statusCode)
//     res.json({
//         message:err.message,
//         stack:process.env.MONGO_URI==='production' ? null : err.stack
//     })
// })

//  app.get('/products',(req,res)=>{
//      res.json(products)
//  })

//  app.get('/products/:id',(req,res)=>{
//      const product=products.find((p)=>p._id===req.params.id)
//      res.json(product)
//  })

const PORT=process.env.PORT || 5000
 app.listen(PORT,console.log(`app is running in ${process.env.NODE_ENV} ON ${PORT}`.yellow.bold))