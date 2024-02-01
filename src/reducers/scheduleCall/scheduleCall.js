import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  scheduleCall: [],
  state: "idle",
  error: null,
};

export const scheduleCallReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SCHEDULE_CALL:
      console.log(state.scheduleCall)
      return {
        ...state,
        scheduleCall: [...state.scheduleCall, action.payload],
      };
    case actionTypes.GET_MY_BOOKING:
      return {
        ...state,
        scheduleCall: action.payload,
      };
    case actionTypes.GET_SCHEDULE_BOOKING:
      return {
        ...state,
        scheduleCall: action.payload,
      };
    // case actionTypes.DELETE_QUIZ:
    //   const quizIdToDelete = action.payload;
    //   return {
    //     ...state,
    //     quiz: state.quiz.filter((quiz) => quiz.id !== quizIdToDelete),
    //   };

    default:
      return state;
  }
};

export default scheduleCallReducer;
