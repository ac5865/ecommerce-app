import { call, put, takeLatest } from "redux-saga/effects";
import {
  ADD_TO_CART_REQUEST,
  addToCartSuccess,
  addToCartFailure,
  FETCH_CART_REQUEST,
  fetchCartSuccess,
  fetchCartFailure,
  REMOVE_FROM_CART_REQUEST,
  removeFromCartSuccess,
  removeFromCartFailure,
} from "../actions/cartActions";

const API_URL = "http://10.0.2.2:3000";

// API Functions
function addToCartApi(productId, quantity, userId) {
  return fetch(`${API_URL}/api/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      quantity,
      userId,
    }),
  }).then((response) => response.json());
}

function fetchCartApi(userId) {
  return fetch(`${API_URL}/api/cart/${userId}`).then((response) =>
    response.json()
  );
}

function removeFromCartApi(productId, userId) {
  return fetch(`${API_URL}/api/cart/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      userId,
    }),
  }).then((response) => response.json());
}

// Saga Workers
function* addToCartSaga(action) {
  try {
    const { productId, quantity, userId } = action.payload;
    console.log("🚀 Add to cart saga triggered:", action.payload);

    const response = yield call(addToCartApi, productId, quantity, userId);
    console.log("📡 Add to cart response:", response);

    if (response.success) {
      yield put(addToCartSuccess(response.data));
    } else {
      yield put(addToCartFailure(response.message || "Failed to add to cart"));
    }
  } catch (error) {
    console.error("❌ Add to cart saga error:", error);
    yield put(addToCartFailure(error.message));
  }
}

function* fetchCartSaga(action) {
  try {
    const { userId } = action.payload;
    console.log("🚀 Fetch cart saga triggered:", action.payload);

    const response = yield call(fetchCartApi, userId);
    console.log("📡 Fetch cart response:", response);

    if (response.success) {
      yield put(fetchCartSuccess(response.data));
    } else {
      yield put(fetchCartFailure(response.message || "Failed to fetch cart"));
    }
  } catch (error) {
    console.error("❌ Fetch cart saga error:", error);
    yield put(fetchCartFailure(error.message));
  }
}

function* removeFromCartSaga(action) {
  try {
    const { productId, userId } = action.payload;
    console.log("🚀 Remove from cart saga triggered:", action.payload);

    const response = yield call(removeFromCartApi, productId, userId);
    console.log("📡 Remove from cart response:", response);

    if (response.success) {
      yield put(removeFromCartSuccess(response.data));
      // Refetch cart after removal
      yield put({ type: FETCH_CART_REQUEST, payload: { userId } });
    } else {
      yield put(
        removeFromCartFailure(response.message || "Failed to remove from cart")
      );
    }
  } catch (error) {
    console.error("❌ Remove from cart saga error:", error);
    yield put(removeFromCartFailure(error.message));
  }
}

// Saga Watchers
export default function* cartSaga() {
  yield takeLatest(ADD_TO_CART_REQUEST, addToCartSaga);
  yield takeLatest(FETCH_CART_REQUEST, fetchCartSaga);
  yield takeLatest(REMOVE_FROM_CART_REQUEST, removeFromCartSaga);
}
