import { call, put, takeLatest } from "redux-saga/effects";
import {
  UPDATE_PROFILE_REQUEST,
  updateProfileSuccess,
  updateProfileFailure,
} from "../actions/profileActions";
import { loginSuccess } from "../actions/authActions";

const API_URL = "http://10.0.2.2:3000";

// API Function
function updateProfileApi(userId, name, password, profileImage) {
  const body = { userId };

  if (name !== undefined) body.name = name;
  if (password !== undefined) body.password = password;
  if (profileImage !== undefined) body.profileImage = profileImage;

  return fetch(`${API_URL}/api/auth/update-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
}

// Saga Worker
function* updateProfileSaga(action) {
  try {
    const { userId, name, password, profileImage } = action.payload;
    console.log("🚀 Update profile saga triggered:", {
      userId,
      name,
      hasImage: !!profileImage,
    });

    const response = yield call(
      updateProfileApi,
      userId,
      name,
      password,
      profileImage
    );
    console.log("📡 Update profile response:", response);

    if (response.success) {
      yield put(updateProfileSuccess(response.data));
      // Also update auth state with new user data
      yield put(loginSuccess(response.data, null)); // null for token as it doesn't change
    } else {
      yield put(
        updateProfileFailure(response.message || "Failed to update profile")
      );
    }
  } catch (error) {
    console.error("❌ Update profile saga error:", error);
    yield put(updateProfileFailure(error.message));
  }
}

// Saga Watcher
export default function* profileSaga() {
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfileSaga);
}
