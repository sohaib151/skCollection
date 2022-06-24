import Product from '../models/productModel.js'
import asyncHandler from "express-async-handler";

// @ dece fetch all products
// @ route   get /products
// @access   public
const getProducts= asyncHandler(async(req,res)=>{
// for pagination
  const pageSize=10
  const page=Number(req.query.pageNumber)  || 1

    // for search product
    const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }: {}
    //   end here<----->

    const count=await Product.countDocuments({...keyword})
    const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))

    res.json({products,page , pages: Math.ceil(count/pageSize)})
})

// @ dece fetch single products
// @ route   get /productsById
// @access   public

const getProductsById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error ('Product Not Found')
    }
})

// @ dece delete product
// @ route   delete /productsById
// @access   Private Admin

const deleteProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.json({messsage:'Product Remove'})
    }else{
        res.status(404)
        throw new Error ('Product Not Found')
    }
})

// @ dece create product
// @ route  post /products
// @access  private Admin

const createProduct=asyncHandler(async(req,res)=>{
    const product=new Product({
        image:'/sample/image.jpg',
        name:'Sample Name',
        user:req.user._id,
        price:0,
        brand:'sample brand',
        category:'sample category',
        numReviews:10,
        countInStock:10,
        rating:0,
        description:'sample description',

    })

    const createdProduct= await product.save()

    res.status(201).json(createdProduct)
    
})


// @ dece update product
// @ route   put/productsById
// @access   private admin

const updateProduct=asyncHandler(async(req,res)=>{

    const {name,image,price,countInStock,brand,category,description,numReviews,rating} =req.body

    const product=await Product.findById(req.params.id)
    if(product){
        product.name=name
        product.image=image
        product.price=price
        product.brand=brand
        product.category=category
        product.countInStock=countInStock
        product.description=description
        product.numReviews=numReviews
        product.rating=rating

        const updatedProduct=await product.save()
        res.status(201).json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

// @ dece new review product
// @ route   put/products/:id/review
// @access   private admin

const createProductReview=asyncHandler(async(req,res)=>{

    const {rating,comment} =req.body

    const product=await Product.findById(req.params.id)
    if(product){
       const alreadyReviewed= product.reviews.find(r=>r.user.toString()===req.user._id.toString())
       
       if(alreadyReviewed){
        res.status(400)
        throw new Error('Product Already Reviewed')
       }

       const review={
        name:req.user.name,
        rating:Number(rating),
        comment,
        user:req.user._id
       }

       product.reviews.push(review)

       product.numReviews=product.reviews.length

       product.rating=product.reviews.reduce((acc,item)=>  item.rating + acc ,0 )/product.reviews.length
      
       await product.save()
       res.status(201).json({message:'added review'})
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})


// @ dece     top rating product
// @ route   get products/top
// @access   public

const getTopProduct=asyncHandler(async(req,res)=>{
 const products= await Product.find({}).sort({ rating : -1 }).limit(3)
   res.json(products)
})

export {getProducts,getProductsById,deleteProduct,createProduct,updateProduct,createProductReview,getTopProduct}