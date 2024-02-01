import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  assignment: [],
  state: "idle",
  error: null,
};

export const userAssignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_ASSIGNMENT:
      return {
        ...state,
        assignment: action.payload.assignment,
      };
    case actionTypes.GET_USER_ASSIGNMENT:
      return {
        ...state,
        assignment: action.payload,
      };
    default:
      return state;
  }
};

export default userAssignmentReducer;