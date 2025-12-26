// Cart Action Types
export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAILURE = "ADD_TO_CART_FAILURE";

export const FETCH_CART_REQUEST = "FETCH_CART_REQUEST";
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const FETCH_CART_FAILURE = "FETCH_CART_FAILURE";

export const REMOVE_FROM_CART_REQUEST = "REMOVE_FROM_CART_REQUEST";
export const REMOVE_FROM_CART_SUCCESS = "REMOVE_FROM_CART_SUCCESS";
export const REMOVE_FROM_CART_FAILURE = "REMOVE_FROM_CART_FAILURE";

// Action Creators
export const addToCartRequest = (productId, quantity, userId) => ({
  type: ADD_TO_CART_REQUEST,
  payload: { productId, quantity, userId },
});

export const addToCartSuccess = (data) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: data,
});

export const addToCartFailure = (error) => ({
  type: ADD_TO_CART_FAILURE,
  payload: error,
});

export const fetchCartRequest = (userId) => ({
  type: FETCH_CART_REQUEST,
  payload: { userId },
});

export const fetchCartSuccess = (data) => ({
  type: FETCH_CART_SUCCESS,
  payload: data,
});

export const fetchCartFailure = (error) => ({
  type: FETCH_CART_FAILURE,
  payload: error,
});

export const removeFromCartRequest = (productId, userId) => ({
  type: REMOVE_FROM_CART_REQUEST,
  payload: { productId, userId },
});

export const removeFromCartSuccess = (data) => ({
  type: REMOVE_FROM_CART_SUCCESS,
  payload: data,
});

export const removeFromCartFailure = (error) => ({
  type: REMOVE_FROM_CART_FAILURE,
  payload: error,
});
