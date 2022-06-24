import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { productDetail, updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'





const ProductEditScreen = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const productId = id
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [numReviews, setNumReviews] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)






    const detailProduct = useSelector(state => state.detailProduct)
    const { loading, error, product } = detailProduct

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(productDetail(productId))
            } else {
                setName(product.name)
                setImage(product.image)
                setPrice(product.price)
                setBrand(product.brand)
                setCategory(product.category)
                setNumReviews(product.numReviews)
                setCountInStock(product.countInStock)
                setDescription(product.description)

            }
        }

    }, [dispatch, product, productId, navigate, successUpdate])

    const fileUploadHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {

            const config = {
                header: {
                    'Content-Type': 'multipart/formdata'
                }
            }
            const { data } = await axios.post('/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error);
            setUploading(false)

        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            numReviews,
            description,
        }))
    }


    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-2' > Go Back</Link>
            <FormContainer>
                <h1>Update Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter Your Name ' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter  price ' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                  <Form.Control type='text' placeholder='Enter image url' value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                
                type='file'
                label='Choose File'
                custom
                onChange={fileUploadHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>category</Form.Label>
                            <Form.Control type='text' placeholder='category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='countInStock'>
                            <Form.Label>CountInStock</Form.Label>
                            <Form.Control type='number' placeholder='countInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='numReviews'>
                            <Form.Label>numReviews</Form.Label>
                            <Form.Control type='number' placeholder='numReviews' value={numReviews} onChange={(e) => setNumReviews(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type='submit' className='my-2'>Update </Button>
                    </Form>
                )}


            </FormContainer>
        </>
    )
}

export default ProductEditScreen