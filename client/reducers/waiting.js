import { FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS } from '../actions/products'
import {
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_SUCCESS,
  PATCH_ORDER_PENDING,
  PATCH_ORDER_SUCCESS
} from '../actions/orders'
import { SHOW_ERROR } from '../actions/error'

function waiting (state = false, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_PENDING:
    case FETCH_ORDERS_PENDING:
    case PATCH_ORDER_PENDING:
      return true

    case FETCH_PRODUCTS_SUCCESS:
    case FETCH_ORDERS_SUCCESS:
    case PATCH_ORDER_SUCCESS:
    case SHOW_ERROR:
      return false

    default:
      return state
  }
}

export default waiting
