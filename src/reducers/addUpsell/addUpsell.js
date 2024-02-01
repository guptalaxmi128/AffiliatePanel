import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  upsell: [],
  state: "idle",
  error: null,
};

export const upsellReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_UPSELL:
      return {
        ...state,
        upsell: [...state.upsell, action.payload],
      };
    case actionTypes.DELETE_UPSELL:
      const upsellIdToDelete = action.payload;
      console.log(state.upsell)
      return {
        ...state,
        upsell: state.upsell.filter((upsell) => upsell.id !== upsellIdToDelete),
      };

    default:
      return state;
  }
};

export default upsellReducer;
