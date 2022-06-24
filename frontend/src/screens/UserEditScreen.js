import React, { useEffect, useState } from 'react'
import { Button, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUserDetail } from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {updateUser} from '../actions/userAction'
import { USER_UPDATE_RESET } from '../constants/userConstants'



const UserEditScreen = () => {
    const dispatch=useDispatch()
    const {id}=useParams()
    const userId=id
    const navigate=useNavigate()

    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[isAdmin,setIsAdmin]=useState('')

    
    

    

    const userDetails=useSelector(state=>state.userDetails)
    const { loading,error,user}=userDetails

    const userUpdate=useSelector(state=>state.userUpdate)
    const{loading:loadingUpdate ,error:errorUpdate ,success:successUpdate}=userUpdate

    useEffect(()=>{
        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            navigate('/admin/userslist')
          }else{
            if(!user.name || user._id !==userId){
                dispatch(getUserDetail(userId))
                }else{
                    setName(user.name)
                    setEmail(user.email)
                    setIsAdmin(user.isAdmin)
                }
          }
    
    },[dispatch,user,userId,successUpdate,navigate])
    const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(updateUser({_id: userId,name,email,isAdmin}))
    }
  return (
    <>
    <Link to='/admin/userslist' className='btn btn-light my-2' > Go Back</Link>
    <FormContainer>
     <h1>Update User</h1>
     {loadingUpdate && <Loader/>}
     {errorUpdate&& <Message variant='danger'>{errorUpdate}</Message>}
     {loading ? <Loader/> : error ? <Message>{error}</Message>: (
 <Form onSubmit={submitHandler}>
 <Form.Group controlId='name'>
     <Form.Label>Name</Form.Label>
     <Form.Control type='name' placeholder='Enter Your Name ' value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
 </Form.Group>
 <Form.Group controlId='email'>
     <Form.Label>Email Address</Form.Label>
     <Form.Control type='email' placeholder='Enter Your Email ' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
 </Form.Group>
 <Form.Group controlId='isAdmin'>
     
     <Form.Check type='checkbox' label='Is Admin'   checked={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked)}></Form.Check>
 </Form.Group>

 <Button type='submit' className='my-2'>Update </Button>
</Form>
     ) }
   
    
    </FormContainer>
    </>
  )
}

export default UserEditScreen