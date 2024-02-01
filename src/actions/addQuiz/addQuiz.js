import * as api from "../../api";
import { ADD_QUIZ ,DELETE_QUIZ,GET_QUIZ,UPDATE_QUIZ} from "../../constants/actionTypes";

export const addQuiz = (quiz) => async (dispatch) => {
    try {
        const { data } = await api.addQuiz(quiz);
        dispatch({ type: ADD_QUIZ, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const getQuiz = (lessonId) => async (dispatch) => {
  try {
    const { data } = await api.getQuiz(lessonId);
    dispatch({ type: GET_QUIZ, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuiz = (id) => async (dispatch) => {
      try {
        const response = await api.deleteQuiz(id);
        dispatch({ type: DELETE_QUIZ, payload: id });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    export const updateQuiz = (quizInfo) => async (dispatch) => {
      try {
        const { data } = await api.updateQuiz(quizInfo);  
        dispatch({ type: UPDATE_QUIZ, payload: data });
        return data;
      } catch (error) {
        console.error(error);  
        throw error; 
      }
    };