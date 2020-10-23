import {
  CART_ADD_ITEM,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      // x.product, item.productのproductは、id
      const existItem = state.cartItems.find(x => x.product === item.product)
      // cartの中に既にありの場合、新たにcartに追加したitemにoverride
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
        }
        // cartに存在しない場合、追加するだけ
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
    default:
      return state
  }
}
