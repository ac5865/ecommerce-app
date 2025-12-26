import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
} from "../actions/authActions";

const API_BASE_URL = "http://10.0.2.2:3000/api/auth";

// API call function for login
function loginApi(email, password) {
  const url = `${API_BASE_URL}/login`;
  console.log("🔵 Logging in with:", url, password, email);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      console.log("📡 Login response status:", response.status);
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.message || "Login failed");
        });
      }
      return response.json();
    })
    .then((json) => {
      console.log("📦 Login response:", json);
      return json.data;
    })
    .catch((error) => {
      console.error("❌ Login error:", error.message);
      throw error;
    });
}

// Worker Saga for login
function* loginSaga(action) {
  console.log("🚀 loginSaga triggered");
  try {
    const { email, password } = action.payload;
    const data = yield call(loginApi, email, password);
    console.log("✅ Login successful:", data);
    yield put(loginSuccess(data.user, data.token));
  } catch (error) {
    console.error("❌ Login saga error:", error.message);
    yield put(loginFailure(error.message));
  }
}

// Watcher Saga
export default function* authSaga() {
  console.log("👀 Auth saga watcher started");
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
