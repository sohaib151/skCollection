
import React, { useState } from 'react'
import { Button,  Form,  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingAddressScreen = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart

    const [address,setAddress]=useState(shippingAddress.address)
    const [city,setCity]=useState(shippingAddress.city)
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const [country,setCountry]=useState(shippingAddress.country)

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        navigate('/payment')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
             <Form.Label>Address</Form.Label>
             <Form.Control type='text' required placeholder='Enter Your Address ' value={address} onChange={(e)=> setAddress(e.target.value)}></Form.Control>
         </Form.Group>
         <Form.Group controlId='city'>
             <Form.Label>City</Form.Label>
             <Form.Control type='text' required placeholder='Enter Your City ' value={city} onChange={(e)=> setCity(e.target.value)}></Form.Control>
         </Form.Group>
         <Form.Group controlId='postalCode'>
             <Form.Label>Postal Code</Form.Label>
             <Form.Control type='text' required placeholder='Enter Your Postal Code ' value={postalCode} onChange={(e)=> setPostalCode(e.target.value)}></Form.Control>
         </Form.Group>
         <Form.Group controlId='country'>
             <Form.Label>Country</Form.Label>
             <Form.Control type='text' required placeholder='Enter Your Country ' value={country} onChange={(e)=> setCountry(e.target.value)}></Form.Control>
         </Form.Group>
         <Button type='submit' varient='primary' className='my-3'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingAddressScreen






























































































































































// import React, { useState } from 'react'
// import { Button, Form } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { saveShippingAddress } from '../actions/cartActions'
// import FormContainer from '../components/FormContainer'
// import CheckoutSteps from '../components/CheckoutSteps'


// const ShippingAddressScreen = () => {
//     const cart = useSelector(state => state.cart)
//     const { shippingAddress } = cart
//     const [address, setAddress] = useState(shippingAddress.address)
//     const [city, setCity] = useState(shippingAddress.city)
//     const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
//     const [country, setCountry] = useState(shippingAddress.country)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const submitHandler = (e) => {
//         e.preventDefault()
//         dispatch(saveShippingAddress({ address, city, postalCode, country }))
//         navigate('/payment')
//     }
//     return (
//         <FormContainer>
//            <CheckoutSteps step1 step2/>
//             <h1>Shipping</h1>
//             <Form onSubmit={submitHandler}>
//                 <Form.Group controlId='address'>
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control type='text' required placeholder='Enter Your Address ' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
//                 </Form.Group>
//                 <Form.Group controlId='city'>
//                     <Form.Label>City</Form.Label>
//                     <Form.Control type='text' required placeholder='Enter Your City ' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
//                 </Form.Group>
//                 <Form.Group controlId='postalCode'>
//                     <Form.Label>Postal Code</Form.Label>
//                     <Form.Control type='text' required placeholder='Enter Your Postal Code ' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
//                 </Form.Group>
//                 <Form.Group controlId='country'>
//                     <Form.Label>Country</Form.Label>
//                     <Form.Control type='text' required placeholder='Enter Your Country ' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
//                 </Form.Group>
//                 <Button type='submit' className='my-2'>Continue</Button>


//             </Form>
//         </FormContainer>
//     )
// }

// export default ShippingAddressScreen