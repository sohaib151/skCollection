// import React,{useEffect,useState} from 'react'
import React,{useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import{useDispatch, useSelector} from 'react-redux'
import { listProduct } from '../actions/productActions'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { useParams } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
// import products from '../products'
// import axios from 'axios'
const HomeScreen = () => {
  // const keyword=match.params.keyword
  const {keyword}=useParams()
  const {pageNumber}=useParams()

  const productsList=useSelector(state=>state.productList)

  const {loading,error,products,page,pages} =productsList

const dispatch=useDispatch()

useEffect(()=>{
dispatch(listProduct(keyword,pageNumber))
},[dispatch,keyword,pageNumber])



  // const [products, setProducts]=useState([])
  // useEffect(()=>{
  //   const fetchProducts=async()=>{
  //     const {data}= await axios.get('/products')
  //     setProducts(data)
  //   }
  //   fetchProducts()
  // },[])
  return (
    <>
    <Meta/>
    {!keyword ? (<ProductCarousel/>) : ( <Link to={'/'} className='btn btn-light'> Go Back</Link> ) }
    <h1>Latest Products</h1>
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>  : (
     <>
    <Row>
     {products.map(p=>(
         <Col xs={6} sm={6} md={6} lg={4} xl={3} key={p._id}>
             <Product product={p}/>
             </Col>
     ))}
    </Row>
    <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''}/>
    </>
   )}
    </>
  )
}

export default HomeScreen