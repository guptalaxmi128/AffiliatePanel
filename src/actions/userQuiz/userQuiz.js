import * as api from "../../api";
import { GET_RESULT, GET_USER_QUIZ,SUBMIT_QUIZ_ANSWER } from "../../constants/actionTypes";

export const getUserQuiz = (lessonId) => async (dispatch) => {
  try {
    const { data } = await api.getUserQuiz(lessonId);
    dispatch({ type: GET_USER_QUIZ, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const submitQuizAnswer = (answerInfo) => async (dispatch) => {
  try {
    const { data } = await api.submitQuizAnswer(answerInfo);
    dispatch({ type: SUBMIT_QUIZ_ANSWER, payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getResult = (lessonId) => async (dispatch) => {
  try {
    const { data } = await api.getResult(lessonId);
    dispatch({ type: GET_RESULT, payload: data });
  } catch (error) {
    console.log(error);
  }
};