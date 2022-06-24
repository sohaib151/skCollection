
import React, { useState } from 'react'
import { Button,  Form, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart

    if(!shippingAddress){
        navigate('/shipping')
    }

    const[paymentMethod,setPaymentMethod]=useState('PayPal')
    

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
            <Form.Check 
            type='radio'
            label='PayPal or Cradit Card' 
            id='PayPal' 
            value='PayPal' 
            checked
            name='paymenyMethod'
            onChange={(e)=> setPaymentMethod(e.target.value)}>
            </Form.Check>
            <Form.Check 
            type='radio'
            label='Stripe' 
            id='Stripe' 
            value='Stripe' 
           
            name='paymenyMethod'
            onChange={(e)=> setPaymentMethod(e.target.value)}>
            </Form.Check>
            </Col>
        </Form.Group>
         <Button type='submit' varient='primary' className='my-3'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen

































// import React, { useState } from 'react'
// import { Button, Form ,Col} from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { savePaymentMethod } from '../actions/cartActions'
// import FormContainer from '../components/FormContainer'
// import CheckoutSteps from '../components/CheckoutSteps'


// const PaymentScreen = () => {
//     const [paymentMethod, setPaymentMethod] = useState('PayPal')


//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const cart = useSelector(state => state.cart)
//     const { shippingAddress } = cart
     
//     if(!shippingAddress){
//         navigate('/shipping')
//     }

//     const submitHandler = (e) => {
//         e.preventDefault()
//         dispatch(savePaymentMethod(paymentMethod))
//         navigate('/placeorder')
//     }
//     return (
//         <FormContainer>
//            <CheckoutSteps step1 step2 step3/>
//             <h1>Payment Method</h1>
//             <Form onSubmit={submitHandler}>
//                 <Form.Group>
//                     <Form.Label as='legend'>Select Payment Method</Form.Label>
//                     <Col>
//                     <Form.Check type='radio' label='PayPal or Cradit Card' id='paypal' value='paypal' name='paymentMethod'
//                     onChange={(e)=>setPaymentMethod(e.target.value)} checked></Form.Check>
//                     {/* <Form.Check type='radio' label='Stripe' id='stripe' value='stripe' name='paymentMethod'
//                     onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check> */}
//                     </Col>
//                 </Form.Group>
//                 <Button type='submit' className='my-2'>Continue</Button>


//             </Form>
//         </FormContainer>
//     )
// }

// export default PaymentScreen