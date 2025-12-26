import { all } from "redux-saga/effects";
import productSaga from "./productSaga";
import authSaga from "./authSaga";
import cartSaga from "./cartSaga";
import profileSaga from "./profileSaga";

export default function* rootSaga() {
  yield all([productSaga(), authSaga(), cartSaga(), profileSaga()]);
}
