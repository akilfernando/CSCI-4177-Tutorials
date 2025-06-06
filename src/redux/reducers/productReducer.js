import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_RESET,
} from '../constants/productConstants';

// Initial state for products list
export const productListReducer = (state = { products: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload, error: null };
    case PRODUCT_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_CREATE_SUCCESS:
      return { ...state, products: [...state.products, action.payload] };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    case PRODUCT_RESET:
      return { products: [], loading: false, error: null };
    default:
      return state;
  }
};

// Initial state for a single product (for details or creation/update status)
export const productDetailsReducer = (state = { product: null, loading: false, error: null }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
    case PRODUCT_CREATE_REQUEST:
    case PRODUCT_UPDATE_REQUEST:
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true, error: null };
    case PRODUCT_DETAILS_SUCCESS:
    case PRODUCT_CREATE_SUCCESS:
    case PRODUCT_UPDATE_SUCCESS:
      return { ...state, loading: false, product: action.payload, error: null };
    case PRODUCT_DETAILS_FAILURE:
    case PRODUCT_CREATE_FAILURE:
    case PRODUCT_UPDATE_FAILURE:
    case PRODUCT_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, product: null, error: null };
    case PRODUCT_RESET:
      return { product: null, loading: false, error: null };
    default:
      return state;
  }
};