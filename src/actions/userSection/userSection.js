import * as api from "../../api";
import { GET_USER_SECTION } from "../../constants/actionTypes";

export const getUserSection = (courseId) => async (dispatch) => {
  try {
    const { data } = await api.getUserSection(courseId);
    dispatch({ type: GET_USER_SECTION, payload: data });
  } catch (error) {
    console.log(error);
  }
};