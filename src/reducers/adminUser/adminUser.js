import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  users: [],
  blockUsers:[],
  bulkUsers:[],
  state: "idle",
  error: null,
  success: null,
};

export const adminUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ADMIN_USER:
      return {
        ...state,
        users: action.payload,
      };
    case actionTypes.ADD_NEW_USER:
      return {
        ...state,
        users: action.payload.users,
      };
    case actionTypes.UPDATE_BLOCK_USER:
      return {
        ...state,
        state: "idle",
        success: action.payload,
      };
    case actionTypes.UPDATE_UNBLOCK_USER:
      return {
        ...state,
        state: "idle",
        success: action.payload,
      };
      case actionTypes.GET_ADMIN_BLOCK_USER:
        return {
          ...state,
          blockUsers: action.payload,
        };
        case actionTypes.ADD_BULK_USER_TO_COURSE:
          return {
            ...state,
            bulkUsers: action.payload.bulkUsers,
          };

    default:
      return state;
  }
};

export default adminUserReducer;
