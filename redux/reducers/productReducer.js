import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  SET_SELECTED_CATEGORY,
  FETCH_PRODUCT_DETAILS_REQUEST,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAILURE,
} from "../actions/productActions";

const initialState = {
  products: [],
  loading: false,
  error: null,
  selectedCategory: "All",
  productDetails: null,
  productDetailsLoading: false,
  productDetailsError: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case FETCH_PRODUCT_DETAILS_REQUEST:
      console.log(
        "📥 FETCH_PRODUCT_DETAILS_REQUEST - Product ID:",
        action.payload
      );
      return {
        ...state,
        productDetailsLoading: true,
        productDetailsError: null,
      };

    case FETCH_PRODUCT_DETAILS_SUCCESS:
      console.log(
        "✅ FETCH_PRODUCT_DETAILS_SUCCESS - Product:",
        action.payload
      );
      return {
        ...state,
        productDetailsLoading: false,
        productDetails: action.payload,
        productDetailsError: null,
      };

    case FETCH_PRODUCT_DETAILS_FAILURE:
      console.log("❌ FETCH_PRODUCT_DETAILS_FAILURE - Error:", action.payload);
      return {
        ...state,
        productDetailsLoading: false,
        productDetailsError: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
