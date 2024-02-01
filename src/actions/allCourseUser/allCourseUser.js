import * as api from "../../api";
import { GET_ALL_COURSE_USER,GET_COURSE_BY_TITLE } from "../../constants/actionTypes";



export const getAllCourseUser = () => async (dispatch) => {
  try {
    const { data } = await api.getAllCourseUser();
    dispatch({ type: GET_ALL_COURSE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCourseByTitle = (id) => async (dispatch) => {
  try {
      const { data } = await api.getCourseByTitle(id);
      dispatch({ type: GET_COURSE_BY_TITLE, payload: data });
  } catch (error) {
      console.log(error);
  }
}