import React, {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {listUsers,deletetUser} from '../actions/userAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Button, Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate} from 'react-router-dom'

const UsersListScreen = () => {
 const dispatch=useDispatch()
const navigate=useNavigate()
 const userList=useSelector(state=>state.userList)
 const{loading ,users,error}=userList

 const userLogin=useSelector(state=>state.userLogin)
 const{userInfo}=userLogin

 const userDelete=useSelector(state=>state.userDelete)
 const{success:successDelete}=userDelete



 useEffect(()=>{
  
  if(userInfo && userInfo.isAdmin){
    dispatch(listUsers())
 }else{
   navigate('/login')
 }
 },[dispatch,navigate,userInfo,successDelete])

 const deleteHandler=(id)=>{
  if(window.confirm('Are you sure to delete')){

    dispatch(deletetUser(id))
  }
 }
  return (
    <>
    <h1>Users</h1>
    {loading ? <Loader/> : error ? <Message>{error}</Message> : ( 
      <Table striped bordered responsive hover>
        <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
              </tr>
          </thead>
          <tbody>
            {users.map(user=>(
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (<i className='fas fa-check' style={{color:'green'}}></i>) : (
                    <i className='fas fa-times' style={{color:'red'}}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                   <Button variant='light' className='btn-sm'>
                    <i className='fas fa-edit'></i>
                   </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                    <i className='fas fa-trash'></i>
                   </Button>
                </td>
              </tr>
            ))}
          </tbody>
       
      </Table>
    )}
    
    </>
  )
}

export default UsersListScreen