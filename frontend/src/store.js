import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// redux devtools extensionに必要
import { composeWithDevTools } from 'redux-devtools-extension'
// reducers
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  }
}

const middleware = [thunk,]

// createStore(reducer, initialState, enhancer)
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

/* enhancerはcreateStoreを引数に受け取って、ラップしたcreateStoreを返す関数
function enhancer(createStore) {
  // ラップしたcreateStore
  return function wrappedCreateStore(reducer, preloadedState) {
    // storeを生成して返す
    return store
  }
}
*/
