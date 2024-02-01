import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  ratio: [],
  state: "idle",
  error: null,
  success: null,
};

export const ratioReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_RATIO:
      return {
        ...state,
        ratio: action.payload.ratio,
      };
    case actionTypes.GET_RATIO:
      return {
        ...state,
        ratio: action.payload,
      };
      case actionTypes.UPDATE_RATIO:
        return {
          ...state,
          success: action.payload,
          error: null,
        };
    case actionTypes.DELETE_RATIO:
      const ratioIdToDelete = action.payload;
      // console.log(state.coupon)
      return {
        ...state,
        ratio: state.ratio.data.filter((ratio) => ratio.id !== ratioIdToDelete),
      };

    default:
      return state;
  }
};

export default ratioReducer;
