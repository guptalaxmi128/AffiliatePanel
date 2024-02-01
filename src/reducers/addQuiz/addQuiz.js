import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  quiz: [],
  state: "idle",
  error: null,
  success:null
};

export const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_QUIZ:
      return {
        ...state,
        quiz: action.payload.quiz,
      };
    case actionTypes.GET_QUIZ:
      return {
        ...state,
        quiz: action.payload,
      };
      case actionTypes.DELETE_QUIZ:
        console.log(state.quiz)
        const quizIdToDelete= action.payload;
        const updatedQuiz = Array.isArray(state.quiz)
        ? state.quiz.filter((quiz) => quiz.id !== quizIdToDelete)
        : [];
        return {
          ...state,
          quiz: updatedQuiz,
      };
      case actionTypes.UPDATE_QUIZ:
        return {
          ...state,
          success: action.payload,
          error: null,
        };

    default:
      return state;
  }
};

export default quizReducer;
