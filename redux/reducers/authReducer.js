import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/authActions";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      console.log("🔐 LOGIN_REQUEST");
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      console.log("✅ LOGIN_SUCCESS - User:", action.payload.user);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case LOGIN_FAILURE:
      console.log("❌ LOGIN_FAILURE - Error:", action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };

    case LOGOUT:
      console.log("🚪 LOGOUT");
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default authReducer;
