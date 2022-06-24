import React from 'react'
// import {Routes, Route, useNavigate} from 'react-router-dom'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userAction'
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  // const navigate=useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <>
      <Navbar bg="success" expand="lg" >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand >SK Collection</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
           <SearchBox/>

            <Nav style={{ marginLeft: 'auto' }}>
              <LinkContainer to='/cart'>
                <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link><i className='fas fa-user'></i>LogIn</Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userslist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orders'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header