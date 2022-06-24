import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { getUserDetail ,userProfileUpdate} from '../actions/userAction'
import {listMyOrder} from '../actions/orderAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProfileScreen = () => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const[message,setMessage]=useState('')
   
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const userDetails=useSelector(state=>state.userDetails)
    const { loading,error,user}=userDetails
    
    const userLogin=useSelector(state=>state.userLogin)
    const { userInfo}=userLogin

    const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
    const { success}=userUpdateProfile

    const orderListMy=useSelector(state=>state.orderListMy)
    const { loading:loadingOrder,error:errorOrder,orders}=orderListMy

    useEffect(()=>{
    if(!userInfo){
        navigate('/login')
    }else{
        if(!user.name){
            dispatch(getUserDetail('profile'))
            dispatch(listMyOrder())
        }else{
            setName(user.name)
            setEmail(user.email)
        }
    }
    
    },[dispatch,navigate, userInfo, user])
    const submitHandler=(e)=>{
    e.preventDefault()
    if(password!==confirmPassword){
        setMessage('Password do not Match')
    }else{
    //   Dispatch user Update
    dispatch(userProfileUpdate({id:user._id,name,email,password}))
    }
    }
  return (
   <Row>
       <Col md={3}>
       <h3>User Profile</h3>
     {message && <Message>{message}</Message>}
     {error && <Message varient='danger'>{error}</Message>}
     {success && <Message varient='danger'>Profile Updated</Message>}
     {loading && <Loader/>}

     <Form onSubmit={submitHandler}>
         <Form.Group controlId='name'>
             <Form.Label>Name</Form.Label>
             <Form.Control type='name' placeholder='Enter Your Name ' value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
         </Form.Group>
         <Form.Group controlId='email'>
             <Form.Label>Email Address</Form.Label>
             <Form.Control type='email' placeholder='Enter Your Email ' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
         </Form.Group>
         <Form.Group controlId='password'>
             <Form.Label>Password </Form.Label>
             <Form.Control type='password' placeholder='Enter Your Password ' value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
         </Form.Group>
         <Form.Group controlId='confirmPassword'>
             <Form.Label>ConfirmPassword </Form.Label>
             <Form.Control type='password' placeholder='Enter Your ConfirmPassword ' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
         </Form.Group>
         <Button type='submit' className='my-2'>Update </Button>
     </Form>
       </Col>
       <Col md={9}>
        <h1>My Orders</h1>
        {loadingOrder ? <Loader/> : errorOrder ? <Message variant='danger'>{errorOrder}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order=>(
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>£{order.totalPrice}</td>
                        <td>{order.isPaid ? (order.paidAt.substring(0,10)) : (<i className='fas fa-times' style={{color:'red'}}></i>) }</td>
                        <td>{order.isDelivered ? (order.deliveredAt.substring(0,10)) : (<i className='fas fa-times' style={{color:'red'}}></i>) }</td>
                        <td>
                        <LinkContainer to={`/order/${order._id}`}>
                            <Button className='btn-sm' variant='light'>Details</Button>
                        </LinkContainer>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>

        )}
       </Col>
   </Row>
  )
}

export default ProfileScreen