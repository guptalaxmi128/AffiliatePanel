import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  assignment: [],
  state: "idle",
  error: null,
  success: null,
};

export const assignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ASSIGNMENT:
      return {
        ...state,
        assignment: action.payload.assignment,
      };
    case actionTypes.GET_ASSIGNMENT:
      return {
        ...state,
        assignment: action.payload,
      };
    case actionTypes.DELETE_ASSIGNMENT:
      const assignmentIdToDelete = action.payload;
      const updatedAssignment = Array.isArray(state.assignment)
      ? state.assignment.filter((assignment) => assignment.id !== assignmentIdToDelete)
      : [];
      return {
        ...state,
        assignment: updatedAssignment,
    };

    default:
      return state;
  }
};

export default assignmentReducer;
