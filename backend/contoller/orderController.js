import Order from '../models/orderModel.js'
import asyncHandler from "express-async-handler";


// @ dece order
// @ route   post /order
// @access   private
const addOrder= asyncHandler(async(req,res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
          }=req.body

   if(orderItems && orderItems.length===0){
       res.status(400)
       throw new Error ('No Order Items')
       return
   }else{
       const order=new Order({
           orderItems,
           user:req.user._id,
           shippingAddress,
           paymentMethod,
           itemPrice,
           shippingPrice,
           taxPrice,
           totalPrice
        })
        const createdOrder=await order.save()
        res.status(201).json(createdOrder)
   }
})


// @ dece get order
// @ route   get /order
// @access   private
const getOrderById= asyncHandler(async(req,res)=>{
   const order= await  Order.findById(req.params.id).populate('user', 'name email') 
   if(order){
       res.json(order)

   }else{
       res.status(404)
       throw new Error('Order not Found')
   }
})

// @ dece  update order to paid
// @ route   put orders/id/pay
// @access   private
const updateOrderToPaid= asyncHandler(async(req,res)=>{
    const order= await  Order.findById(req.params.id)
    if(order){
        order.isPaid=true,
        order.paidAt=Date.now()
        order.paymentResult={
            id:req.body.id,
            update_time:req.body.update_time,
            email_address:req.body.email_address,
        }

        const updatedOrder=await order.save()
        res.json(updatedOrder)
 
    }else{
        res.status(404)
        throw new Error('Order not Found')
    }
 })


 // @ dece  update order to delivered
// @ route   put orders/id/deliver
// @access   private/admin
const updateOrderToDelivered= asyncHandler(async(req,res)=>{
    const order= await  Order.findById(req.params.id)
    if(order){
        order.isDelivered=true,
        order.deliveredAt=Date.now()
      
        const updatedOrder=await order.save()
        res.json(updatedOrder)
 
    }else{
        res.status(404)
        throw new Error('Order not Found')
    }
 })


 // @ dece  loged in user Order
// @ route   get orders/myorders
// @access   private
const getMyOrder= asyncHandler(async(req,res)=>{
    const orders= await  Order.find({ user:req.user._id })
    res.json(orders)
 
 })

 
 // @ dece get All Orders
// @ route   get /orders
// @access   private/admin
const getOrders= asyncHandler(async(req,res)=>{
    const orders= await  Order.find({ }).populate('user', 'id  name')
    res.json(orders)
 
 })

export{addOrder,getOrderById,updateOrderToPaid,getMyOrder,getOrders,updateOrderToDelivered}
