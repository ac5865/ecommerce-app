import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_PRODUCTS_REQUEST,
  fetchProductsSuccess,
  fetchProductsFailure,
  FETCH_PRODUCT_DETAILS_REQUEST,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailure,
} from "../actions/productActions";

// Use 10.0.2.2 for Android Emulator (maps to host machine's localhost)
// If using physical device, replace with your computer's IP address from ipconfig
const API_BASE_URL = "http://10.0.2.2:3000/api/products";

// API call function for products list
function fetchProductsApi() {
  return fetch(API_BASE_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      return json.data || json;
    })
    .catch((error) => {
      throw error;
    });
}

// API call function for product details
function fetchProductDetailsApi(productId) {
  const url = `${API_BASE_URL}/${productId}`;
  console.log("🔵 Fetching product details from:", url);
  return fetch(url)
    .then((response) => {
      console.log("📡 Product details response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      console.log("📦 Product details response:", json);
      return json.data || json;
    })
    .catch((error) => {
      console.error("❌ Product details fetch error:", error.message);
      throw error;
    });
}

// Worker Saga for products list
function* fetchProductsSaga() {
  try {
    const products = yield call(fetchProductsApi);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

// Worker Saga for product details
function* fetchProductDetailsSaga(action) {
  console.log(
    "🚀 fetchProductDetailsSaga triggered for product ID:",
    action.payload
  );
  try {
    const product = yield call(fetchProductDetailsApi, action.payload);
    console.log("✅ Product details fetched:", product);
    yield put(fetchProductDetailsSuccess(product));
  } catch (error) {
    console.error("❌ Product details saga error:", error.message);
    yield put(fetchProductDetailsFailure(error.message));
  }
}

// Watcher Saga
export default function* productSaga() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
  yield takeLatest(FETCH_PRODUCT_DETAILS_REQUEST, fetchProductDetailsSaga);
}
