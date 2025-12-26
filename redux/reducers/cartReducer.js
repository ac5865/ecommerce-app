import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
} from "../actions/cartActions";

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false,
  error: null,
  addingToCart: false,
  addToCartError: null,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      console.log("🔵 ADD_TO_CART_REQUEST", action.payload);
      return {
        ...state,
        addingToCart: true,
        addToCartError: null,
      };

    case ADD_TO_CART_SUCCESS:
      console.log("✅ ADD_TO_CART_SUCCESS", action.payload);
      return {
        ...state,
        addingToCart: false,
        totalItems: action.payload.cartItems || state.totalItems + 1,
      };

    case ADD_TO_CART_FAILURE:
      console.log("❌ ADD_TO_CART_FAILURE", action.payload);
      return {
        ...state,
        addingToCart: false,
        addToCartError: action.payload,
      };

    case FETCH_CART_REQUEST:
      console.log("🔵 FETCH_CART_REQUEST", action.payload);
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_CART_SUCCESS:
      console.log("✅ FETCH_CART_SUCCESS", action.payload);
      return {
        ...state,
        loading: false,
        items: action.payload.items || [],
        totalItems: action.payload.totalItems || 0,
        totalPrice: action.payload.totalPrice || 0,
      };

    case FETCH_CART_FAILURE:
      console.log("❌ FETCH_CART_FAILURE", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case REMOVE_FROM_CART_REQUEST:
      console.log("🔵 REMOVE_FROM_CART_REQUEST", action.payload);
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REMOVE_FROM_CART_SUCCESS:
      console.log("✅ REMOVE_FROM_CART_SUCCESS", action.payload);
      return {
        ...state,
        loading: false,
        totalItems: action.payload.cartItems || state.totalItems - 1,
      };

    case REMOVE_FROM_CART_FAILURE:
      console.log("❌ REMOVE_FROM_CART_FAILURE", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
