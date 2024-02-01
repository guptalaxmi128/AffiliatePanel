import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  userLink: [],
  state: "idle",
  error: null,
  success:null
};

export const userAffiliateLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_AFFILIATE_LINK:
        return {
            ...state,
            userLink: [...state.userLink, action.payload],
          };
          case actionTypes.GET_AFFILIATE_USER_ID:
            return {
              ...state,
              userLink: action.payload,
            };
          
        
    default:
      return state;
  }
};

export default  userAffiliateLinkReducer;
