import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL
} from '../constants/productConstants'

// 中の返される関数、下記ではasync (dispatch) => {}の部分をthunkという。actionがobjectではなくfunctionであるとき、redux-thunkがdispatchとgetStateを引数に持たせたthunkを実行する
// actionがobjectの時、store.dispatch({type: 'INCREMENT', payload: 1})でreducerにactionが渡され、返ってくるstateがstoreにsetされる
// actionがthunkの時、store.dispatch(thunk(dispatch, getState))でthunkの中の処理が実行される
// const listProducts = () => { return async (dispatch, getState) => {} }
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get('/api/products')
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message ?
          // { message: 'this is error }みたいな感じのerror
          error.response.data.message :
          // throw new Error('this is error')で投げられたerror
          error.message,
    })
  }
}
