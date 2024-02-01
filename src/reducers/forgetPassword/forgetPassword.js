import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  forgetPwd: [],
  state: "idle",
  error: null,
  success:null
};

export const forgetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SEND_OTP:
      return {
        ...state,
        forgetPwd: action.payload.forgetPwd,
      };
    case actionTypes.VERIFY_OTP:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case actionTypes.GENERATE_PASSWORD:
      return {
        ...state,
        success: action.payload,
        error: null,
      };

    default:
      return state;
  }
};

export default forgetPasswordReducer;
