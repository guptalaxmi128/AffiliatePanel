import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  linkRequest: [],
  state: "idle",
  error: null,
  success: null,
};

export const linkRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LINK_REQUEST:
      return {
        ...state,
        linkRequest: action.payload,
      };
    case actionTypes.UPDATE_ACCEPT_REQUEST:
      return {
        ...state,
        state: "idle",
        success: action.payload,
      };
      case actionTypes.UPDATE_BLOCK_REQUEST:
        return {
          ...state,
          state: "idle",
          success: action.payload,
        };
        case actionTypes.UPDATE_UNBLOCK_REQUEST:
          return {
            ...state,
            state: "idle",
            success: action.payload,
          };
  

    default:
      return state;
  }
};

export default linkRequestReducer;
