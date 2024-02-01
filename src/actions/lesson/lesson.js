import * as api from "../../api";
import { ADD_LESSON,GET_LESSON_BY_ID, PUBLISH_LESSON,UNPUBLISH_LESSON, UPDATE_LESSON,DELETE_LESSON } from "../../constants/actionTypes";

export const addLessons  = (lessonInfo) => async (dispatch) => {
  try {
    const { data } = await api.addLessons(lessonInfo);
    dispatch({ type: ADD_LESSON, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const getLessonById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getLessonById(id);
        dispatch({ type: GET_LESSON_BY_ID, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const publishLesson= (id) => async (dispatch) => {
  try {
    const { data } = await api.publishLesson(id);
    dispatch({ type: PUBLISH_LESSON, payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const unPublishLesson= (id) => async (dispatch) => {
  try {
    const { data } = await api.unPublishLesson(id);
    dispatch({ type: UNPUBLISH_LESSON, payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateLesson = (updatedData) => async (dispatch) => {
  try {
    const { data } = await api.updateLesson(updatedData);  
    dispatch({ type: UPDATE_LESSON, payload: data });
    return data;
  } catch (error) {
    console.error(error);
    throw error;  
  }
};

 
export const deleteLesson = (id) => async (dispatch) => {
  try {
    const response = await api.deleteLesson(id);
    dispatch({ type: DELETE_LESSON, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};