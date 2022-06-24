import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
const Product = ({product}) => {
  return (
    <>
    <Card className='my-3 p-3'>
     <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} alt={product.name} varient='top'/>
     </Link>
     <Card.Body>
         <Card.Title> 
             <Link to={`/products/${product._id}`}>{product.name}</Link>
          </Card.Title>

           <Rating value={product.rating} text={`${product.numReviews} Reviews`}/>
           
         <Card.Text as='div'> <strong> Price £{product.price}</strong></Card.Text>
     </Card.Body>
    </Card>
    </>
  )
}

export default Product