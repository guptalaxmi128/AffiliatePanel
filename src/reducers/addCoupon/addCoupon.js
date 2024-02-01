import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  coupon: [],
  state: "idle",
  error: null,
  success: null,
};

export const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COUPON:
      return {
        ...state,
        coupon: action.payload.coupon,
      };
    case actionTypes.GET_COUPON:
      return {
        ...state,
        coupon: action.payload,
      };
    case actionTypes.ADD_COUPON_TO_COURSE:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case actionTypes.UPDATE_COUPON:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case actionTypes.DELETE_COUPON:
      const couponIdToDelete = action.payload;
      // console.log(state.coupon)
      return {
        ...state,
        coupon: state.coupon.data.filter(
          (coupon) => coupon.id !== couponIdToDelete
        ),
      };

    default:
      return state;
  }
};

export default couponReducer;
