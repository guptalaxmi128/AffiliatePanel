import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  saleLink: [],
  state: "idle",
  error: null,
  success: null,
};

export const saleLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SALE_LINK:
      return {
        ...state,
        saleLink: action.payload.saleLink,
      };

    default:
      return state;
  }
};

export default saleLinkReducer;
