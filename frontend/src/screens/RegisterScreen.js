import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { register } from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
const LoginScreen = () => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const[message,setMessage]=useState('')
    const location=useLocation()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const redirect=location.search ? location.search.split('=')[1] : '/'
    const userRegister=useSelector(state=>state.userRegister)
    const { loading,error,userInfo}=userRegister
    useEffect(()=>{
    if(userInfo){
        navigate(redirect)
    }
    },[navigate,userInfo,redirect])
    const submitHandler=(e)=>{
    e.preventDefault()
    if(password!==confirmPassword){
        setMessage('Password do not Match')
    }else{
        dispatch(register(name,email,password))
    }
    }
  return (
    <FormContainer>
     <h1>Sign In</h1>
     {error && <Message varient='danger'>{error}</Message>}
     {message && <Message>{message}</Message>}
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
         <Button type='submit' className='my-2'>SignUP </Button>
     </Form>
     <Row className='py-2'>
         <Col>Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link></Col>
     </Row>
    </FormContainer>
  )
}

export default LoginScreen