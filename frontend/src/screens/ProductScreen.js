import { Col, Row ,Image, ListGroup, Card, Button,Form} from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import React, { useEffect ,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import{ productDetail,createProductReview} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'
import Meta from '../components/Meta'
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import products from '../products'

const ProductScreen = () => {
    const {id}=useParams()

    const [qty,setQty] =useState(1)
    const [rating ,setRating] =useState(0)
    const [comment ,setComment] =useState('')

    const navigate=useNavigate()
     const dispatch=useDispatch()

     const detailProduct=useSelector(state=>state.detailProduct)
     const{loading,error,product}=detailProduct

     const userLogin=useSelector(state=>state.userLogin)
     const{userInfo}=userLogin

     const productReviewCreate=useSelector(state=>state.productReviewCreate)
     const{loading:loadingProductReview,error:errorProductReview,success:successProductReview}=productReviewCreate

     useEffect(()=>{
      if(successProductReview){
        alert('Review Submitted')
        setRating(0)
        setComment('')
        dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
      }
     

        dispatch(productDetail(id))
      
     },[dispatch, id,successProductReview,])

     const addToCartHandler=()=>{
       navigate(`/cart/${id}?qty=${qty}`)
     }
     const submitHandler=(e)=>{
     e.preventDefault()
     dispatch(createProductReview(id,{rating,comment}))
     }
    // const product=products.find((p)=>p._id===(id))
    // const [product ,setProduct]=useState({})
    //   useEffect(()=>{
    //   const fetchProduct=async()=>{
    //     const {data}=await axios.get(`/products/${id}`)
    //     setProduct(data)
    //   }
    //   fetchProduct()
    // },[id])
  return (
    <>
    <Link to='/' className='btn bg-light my-3'> Go Back</Link>
    {loading ? <Loader/> : error ? {error} : (
      <>
      <Meta title={product.name}/>
    <Row>
        <Col md={6}>
            <Image src={product.image} fluid/>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                  {product.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} Reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price £{product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
       <Col md={3}>
       <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>Price</Col>
                        <Col>£{product.price}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Stock</Col>
                        <Col>{product.countInStock>0? 'In Stock' : 'Out Of Stock'}</Col>
                    </Row>
                </ListGroup.Item>
                {product.countInStock>0 &&(
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                      <Form.Control as='select' value={qty} onChange={(e)=> setQty(e.target.value)}>
                      {[...Array(product.countInStock).keys()].map((x)=>(
                        <option key={x+1} value={x+1}> {x+1}</option>
                      ))}
                      </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <Button className='btn-block' disabled={product.countInStock<=0} onClick={addToCartHandler}> Add to cart</Button>
            </ListGroup>
        </Card>
       </Col>
    </Row>
    <Row>
     <Col md={6}>
      <h2>Reviews</h2>
      {product.reviews.length===0 && <Message>No Reviews</Message>}
      <ListGroup variant='flush'>
       {product.reviews.map((review)=>(
        <ListGroup.Item key={review._id}>
          <strong>{review.name}</strong>
          <Rating value={review.rating}/>
          {/* <p>{review.createdAt.substring(0,10)}</p> */}
          <p>{review.comment}</p>
        </ListGroup.Item>
       ))}
       <ListGroup.Item>
        <h2>Write a Customer Review</h2>
        {/* {successProductReview && <Message variant='success'> review submitted Successfully</Message>} */}
        {loadingProductReview && <Loader/>}
        {errorProductReview && <Message>{errorProductReview}</Message>}
        
        {userInfo ? (
          <Form onSubmit={submitHandler}>
          <Form.Group controlId='rating'>
           <Form.Label>Rating</Form.Label>
           <Form.Control as='select' value={rating} onChange={(e=>setRating(e.target.value))}>
            <option value=''>Select...</option>
            <option value='1'> 1 - Poor </option>
            <option value='2'> 2 - Fair </option>
            <option value='3'> 3 - Good </option>
            <option value='4'> 4 - very Good</option>
            <option value='5'> 5 - Execellent</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='comment'>
            <Form.Label >Comment</Form.Label>
            <Form.Control as='textarea' row='3' value={comment} onChange={(e)=> setComment(e.target.value)}></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary' className='my-2'>submit</Button>
          </Form>
         ) : <Message>Please <Link to={'/login'}>SignIn</Link> to write a comment</Message>}
       </ListGroup.Item>
      </ListGroup>
     </Col>
    </Row>
    </>
    
)}
    </>
  )}

export default ProductScreen