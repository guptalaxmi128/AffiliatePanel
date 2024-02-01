import * as api from "../../api";
import { GET_PUBLIC_COURSE} from "../../constants/actionTypes";

export const getPublicCourse = () => async (dispatch) => {
    try {
      const { data } = await api.getPublicCourse ();
      dispatch({ type: GET_PUBLIC_COURSE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };