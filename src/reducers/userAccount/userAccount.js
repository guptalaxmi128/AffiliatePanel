import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  account: [],
  state: "idle",
  error: null,
  success:null
};

export const userAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_ACCOUNT:
        return {
            ...state,
            account: [...state.account, action.payload],
          };
          case actionTypes.GET_USER_ACCOUNT:
            return {
              ...state,
              account: action.payload,
            };
            case actionTypes.UPDATE_USER_ACCOUNT:
              return {
                ...state,
                success: action.payload,
                error: null,
              };
        
    default:
      return state;
  }
};

export default userAccountReducer;
