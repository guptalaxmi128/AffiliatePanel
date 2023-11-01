import * as api from "../../api";
import { ADD_COURSE,GET_COURSE } from "../../constants/actionTypes";

export const addCourse = (courseInfo) => async (dispatch) => {
  try {
    const { data } = await api.addCourse(courseInfo);
    dispatch({ type: ADD_COURSE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCourse = () => async (dispatch) => {
  try {
    const { data } = await api.getCourse();
    dispatch({ type: GET_COURSE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
