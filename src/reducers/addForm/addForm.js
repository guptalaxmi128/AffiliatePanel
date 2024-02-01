import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  formInfo: [],
  state: "idle",
  error: null,
  success: null,
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_FORM:
      return {
        ...state,
        formInfo: action.payload.formInfo,
      };
    case actionTypes.GET_FORM:
      return {
        ...state,
        formInfo: action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;
