import * as api from "../../api";
import { GET_USER_COURSE } from "../../constants/actionTypes";



export const getUserCourse = () => async (dispatch) => {
  try {
    const { data } = await api.getUserCourse();
    dispatch({ type: GET_USER_COURSE, payload: data });
  } catch (error) {
    console.log(error);
  }
};