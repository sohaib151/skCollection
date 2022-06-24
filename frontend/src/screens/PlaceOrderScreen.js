// challenge  make button block level
import React, { useEffect} from 'react'
import { Button, Col,Row ,ListGroup ,Image, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { Link} from 'react-router-dom'
import{createOrder} from '../actions/orderAction'



const PlaceOrderScreen = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const orderCreate=useSelector(state=>state.orderCreate)
    const{order,success,error}=orderCreate
    const cart=useSelector(state=>state.cart)
    
    const addDecimal=(num)=>{
        return(Math.round(num * 100)/100).toFixed(2)
    }
  cart.itemsPrice=addDecimal(cart.cartItems.reduce((acc,item)=> acc + item.qty*item.price , 0))
  cart.shippingPrice=addDecimal(cart.itemsPrice > 150 ? 0 : 0)
  cart.taxPrice=addDecimal( Number((0.05 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice=(Number (cart.itemsPrice) + Number (cart.shippingPrice) + Number (cart.taxPrice)).toFixed(2)

useEffect(()=>{
    if(success){
        navigate(`/order/${order._id}`)
    }
},[navigate,success,order])

const addToPlaceOrderHandler=()=>{
   dispatch(createOrder({
       orderItems:cart.cartItems,
       shippingAddress:cart.shippingAddress,
       paymentMethod:cart.paymentMethod,
       itemsPrice:cart.itemsPrice,
       shippingPrice:cart.shippingPrice,
       taxPrice:cart.taxPrice,
       totalPrice:cart.totalPrice
   }))
}

  return (
    <>
    <CheckoutSteps step1 step2 step3 step4/>
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
            <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                <strong>Address :</strong>
                {cart.shippingAddress.address},
                {cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country},
                </p>
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length===0 ? <Message>Your card is empty</Message>:(
                    <ListGroup variant='flush'>
                        {cart.cartItems.map((item,index)=>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} rounded fluid/>
                                    </Col>
                                    <Col><Link to={`/products/${item.product}`}>{item.name}</Link></Col>
                                    <Col md={4}>
                                        {item.qty} x £{item.price} = £{addDecimal (`${item.qty * item.price}`)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) }
            </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Items</Col>
                        <Col>£{cart.itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>£{cart.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax</Col>
                        <Col>£{cart.taxPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Total</Col>
                        <Col>£{cart.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    {error && <Message>{error}</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button type='submit' variant='primary' disabled={cart.cartItems===0} onClick={addToPlaceOrderHandler}>Place Order</Button>
                </ListGroup.Item>
            </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
  )
}

export default PlaceOrderScreen























































































































































































// import React, { useEffect } from 'react'
// import { Button, Col,Row,Image,ListGroup, Card } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useNavigate} from 'react-router-dom'
// import CheckoutSteps from '../components/CheckoutSteps'
// import Message from '../components/Message'
// import {createOrderAction} from '../actions/orderAction'

// const PlaceOrderScreen = () => {
//     const dispatch=useDispatch()
//     const navigate=useNavigate()
//     const cart=useSelector((state)=>state.cart)
//     // calculate prices
//     const addToDecimal=(num)=>{
//         return((num*100)/100).toFixed(2)
//     }
//     cart.itemPrice=addToDecimal(cart.cartItems.reduce((acc,item)=> acc + item.qty * item.price , 0))
//     cart.shippingPrice=addToDecimal(cart.itemPrice> 100 ? 0 : 10)
//     cart.taxPrice=addToDecimal(Number((0.15 * cart.itemPrice).toFixed(2)))
//     cart.totalPrice=addToDecimal(Number(cart.itemPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice))
    
//     const createOrder=useSelector(state=>state.createOrder)
//     const {order,success,error}=createOrder

//      useEffect(()=>{
//       if(success){
//           navigate(`/order/${order._id}`)
//       }
//      },[navigate,success,order])


//     const placeorderHandler=()=>{
       
//         dispatch(createOrderAction({
//             orderItems:cart.cartItems,
//             shippingAddress:cart.shippingAddress,
//             paymentMethod:cart.paymentMethod,
//             itemPrice:cart.itemPrice,
//             shippingPrice:cart.shippingPrice,
//             taxPrice:cart.taxPrice,
//             totalPrice:cart.totalPrice,

//         }))
//     }
//   return (
//     <>
//     <CheckoutSteps step1 step2 step3 step4/>
//     <Row>
//         <Col md={8}>
//         <ListGroup variant='flush'>
//             <ListGroup.Item>
//                 <h2>Shipping</h2>
//                 <p>
//                     <strong>Address:  </strong>
//                         {cart.shippingAddress.address},
//                         {cart.shippingAddress.city},
//                         {cart.shippingAddress.postalCode},
//                         {cart.shippingAddress.country},
//                 </p>
//             </ListGroup.Item>
//             <ListGroup.Item>
//                 <h2>Payment Method</h2>
//                 <strong>Method: </strong>
//                 {cart.paymentMethod}
//             </ListGroup.Item>
//             <ListGroup.Item>
//                 <h2>Order Item</h2>
//                 {cart.cartItems.length===0 ? <Message>Your cart is empty</Message>:(
//                     <ListGroup variant='flush'>
//                         {cart.cartItems.map((item, index)=>(
//                             <ListGroup.Item key={index}>
//                                 <Row>
//                                     <Col md={1}>
//                                       <Image src={item.image} alt={item.name} fluid rounded />
//                                     </Col>
//                                     <Col> <Link to={`/products/${item.product}`}>{item.name}</Link></Col>
//                                     <Col>{item.qty } x £{ item.price} = £{addToDecimal(`${item.qty*item.price}`)}</Col>
//                                 </Row>
//                             </ListGroup.Item>
//                         ))}
//                     </ListGroup>
//                 )}
//             </ListGroup.Item>
//         </ListGroup>
//         </Col>
//         <Col md={4}>
//             <Card>
//                 <ListGroup variant='flush' >
//                     <ListGroup.Item>
//                         <h2>Card Summary</h2>
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                     <Row>
//                             <Col>Item</Col>
//                             <Col>£ {cart.itemPrice}</Col>
//                         </Row>
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                     <Row>
//                             <Col>Shipping</Col>
//                             <Col>£ {cart.shippingPrice}</Col>
//                         </Row>
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                     <Row>
//                             <Col>Tax</Col>
//                             <Col>£ {cart.taxPrice}</Col>
//                         </Row>
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                     <Row>
//                             <Col>Total</Col>
//                             <Col>£ {cart.totalPrice}</Col>
//                         </Row>
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                         {error && <Message>{error}</Message>}
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                         <Button className='btn-block' disabled={cart.cartItems===0} onClick={placeorderHandler}>Place Order</Button>
//                     </ListGroup.Item>
//                 </ListGroup>
//             </Card>
//         </Col>
//     </Row>
//     </>
//   )
// }

// export default PlaceOrderScreen




