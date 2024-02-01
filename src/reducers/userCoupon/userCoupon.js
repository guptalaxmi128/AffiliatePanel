import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  usercoupon: [],
  state: "idle",
  error: null,
};

export const userCouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_COUPON:
      return {
        ...state,
        usercoupon: action.payload,
      };
    default:
      return state;
  }
};

export default userCouponReducer;