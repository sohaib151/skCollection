import express  from "express";
import { protect ,admin} from "../middleware/authMiddleware.js";
const router=express.Router()

import { getProducts, getProductsById ,deleteProduct,createProduct,updateProduct, createProductReview,getTopProduct} from "../contoller/productContoller.js";

router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/:id/reviews').post(protect,createProductReview)
router.route('/top').get(getTopProduct)
router.route('/:id').get(getProductsById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)


// export default router


















// @ dece fetch all products
// @ route   get /products
// @access   public
// router.get('/',asyncHandler(async(req,res)=>{

//     const products=await Product.find({})
//     res.json(products)
//  }))
// @ dece fetch single products
// @ route   get /productsById
// @access   public
// router.get('/:id',asyncHandler(async(req,res)=>{
//     const product=await Product.findById(req.params.id)

//     if(product){
//         res.json(product)
//     }else{
//         res.status(404)
//         throw new Error ('product not found')
//     }
// }))

// router.get('/', async(req,res)=>{
//   try {
//     const products=await Product.find({})
//     res.json(products)
//   } catch (error) {
//       res.status(404).send(`failed due to this ${error}`)
//   }
// })

// router.get('/:id',async(req,res)=>{
//     // const product=products.find((p)=>p._id===req.params.id)
//     try {
//         const product=await Product.findById(req.params.id)
    
//         res.json(product)
//     } catch (error) {
//         res.status(404).send('noteee founde')
//     }
    
// })



export default router