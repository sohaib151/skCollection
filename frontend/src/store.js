import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer,productDeatailReducer,productDeleteReducer,productCreateReducer,productUpdateReducer,productReviewCreateReducer ,productTopRatedReducer} from './reducers/productsReducers';
import { cartReducer } from './reducers/cartReducer';
import {userLoginReducer,userRegisterReducer ,userDetailsReducer,userUpdateProfileReducer,userListReducer,userDeleteReducer,userUpdateReducer} from './reducers/userReducer'
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderDeliverReducer,orderListMyReducer,orderListReducer} from './reducers/orderReducer'
 const reducer=combineReducers({
     productList:productListReducer,
     detailProduct:productDeatailReducer,
     productDelete:productDeleteReducer,
     productCreate:productCreateReducer,
     productUpdate:productUpdateReducer,
     productReviewCreate:productReviewCreateReducer,
     productTopRated:productTopRatedReducer,
     cart:cartReducer,
     userLogin:userLoginReducer,
     userRegister:userRegisterReducer,
     userDetails:userDetailsReducer,
     userUpdateProfile:userUpdateProfileReducer,
     userList:userListReducer,
     userDelete:userDeleteReducer,
     userUpdate:userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliverReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer,
 });

 const cartItemsFromStorge= localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]
 const userLogInFromStorge= localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null
 const saveShippingAddressFromStorge= localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')): {}
 const initialState={
     cart:{cartItems:cartItemsFromStorge,shippingAddress:saveShippingAddressFromStorge},
     userLogin:{userInfo:userLogInFromStorge}
 } 

 const middleware=[thunk]


const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store