import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// redux devtools extensionに必要
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({})

const initialState = {}

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
