import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

console.log("🔵 Creating Redux store...");

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create store with middleware
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

console.log("✅ Redux store created");
console.log("🔵 Running root saga...");

// Run the root saga
sagaMiddleware.run(rootSaga);

console.log("✅ Root saga started");

export default store;
