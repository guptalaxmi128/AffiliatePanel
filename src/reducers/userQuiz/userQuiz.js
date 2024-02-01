import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  quizs: [],
  quizResults: [],
  state: "idle",
  error: null,
};

export const userQuizReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_QUIZ:
      return {
        ...state,
        quizs: action.payload,
      };
    case actionTypes.SUBMIT_QUIZ_ANSWER:
      console.log(state.quizs);
      return {
        ...state,
        quizs: [...state.quizs.data, action.payload],
      };
    case actionTypes.GET_RESULT:
      return {
        ...state,
        quizResults: action.payload,
      };
    default:
      return state;
  }
};

export default userQuizReducer;
