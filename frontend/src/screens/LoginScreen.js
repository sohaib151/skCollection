import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
const LoginScreen = () => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const location=useLocation()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const redirect=location.search ? location.search.split('=')[1] : '/'
    const userLogin=useSelector(state=>state.userLogin)
    const { loading,error,userInfo}=userLogin
    useEffect(()=>{
    if(userInfo){
        navigate(redirect)
    }
    },[navigate,userInfo,redirect])
    const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(login(email,password))
    }
  return (
    <FormContainer>
     <h1>Sign In</h1>
     {error && <Message varient='danger'>{error}</Message>}
     {loading && <Loader/>}
     <Form onSubmit={submitHandler}>
         <Form.Group controlId='email'>
             <Form.Label>Email Address</Form.Label>
             <Form.Control type='email' placeholder='Enter Your Email ' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
         </Form.Group>
         <Form.Group controlId='password'>
             <Form.Label>Password </Form.Label>
             <Form.Control type='password' placeholder='Enter Your Password ' value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
         </Form.Group>
         <Button type='submit' className='my-2'>LogIn </Button>
     </Form>
     <Row className='py-2'>
         <Col>New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
     </Row>
    </FormContainer>
  )
}

export default LoginScreen