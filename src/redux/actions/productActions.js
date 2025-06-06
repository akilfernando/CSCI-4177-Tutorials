import axios from 'axios';
import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_RESET,
} from '../constants/productConstants';

const API_URL = 'http://localhost:5000/api/products';

const showToast = (message, type = 'info') => {
  console.log(`Toast (${type}): ${message}`);
};

// --- CREATE PRODUCT ---
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(API_URL, productData, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
    showToast('Product created successfully!', 'success');
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_CREATE_FAILURE,
      payload: message,
    });
    showToast(`Error creating product: ${message}`, 'error');
  }
};

// --- READ PRODUCTS (GET ALL) ---
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(API_URL);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_LIST_FAILURE,
      payload: message,
    });
    showToast(`Error fetching products: ${message}`, 'error');
  }
};

// --- READ SINGLE PRODUCT (GET ONE) ---
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${API_URL}/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload: message,
    });
    showToast(`Error fetching product details: ${message}`, 'error');
  }
};

// --- UPDATE PRODUCT ---
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`${API_URL}/${id}`, productData, config);

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
    showToast('Product updated successfully!', 'success');
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_UPDATE_FAILURE,
      payload: message,
    });
    showToast(`Error updating product: ${message}`, 'error');
  }
};

// --- DELETE PRODUCT ---
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    await axios.delete(`${API_URL}/${id}`);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: id,
    });
    showToast('Product deleted successfully!', 'success');
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_DELETE_FAILURE,
      payload: message,
    });
    showToast(`Error deleting product: ${message}`, 'error');
  }
};

// --- RESET PRODUCT STATE ---
export const resetProductState = () => (dispatch) => {
  dispatch({ type: PRODUCT_RESET });
};