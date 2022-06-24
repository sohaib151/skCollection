import express from "express";
import { addOrder ,getOrderById,updateOrderToPaid,getMyOrder,getOrders,updateOrderToDelivered} from "../contoller/orderController.js";
import { protect,admin } from "../middleware/authMiddleware.js";

const router=express.Router()
router.route('/').post(protect,addOrder).get(protect,admin,getOrders)
router.route('/myorders').get(protect,getMyOrder)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,updateOrderToDelivered)



export default router