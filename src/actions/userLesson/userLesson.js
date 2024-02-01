import * as api from "../../api";
import { GET_USER_LESSON } from "../../constants/actionTypes";

export const getUserLesson = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserLesson(id);
    dispatch({ type: GET_USER_LESSON, payload: data });
  } catch (error) {
    console.log(error);
  }
};