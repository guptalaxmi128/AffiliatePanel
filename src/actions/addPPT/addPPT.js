import * as api from "../../api";
import { ADD_PPT_FILES } from "../../constants/actionTypes";

export const addPpt = (formData) => async (dispatch) => {
    try {
     console.log(formData)
     const lessonId = formData.get("lessonId");
     const response = await api.addPpt(formData, lessonId);
      dispatch({ type: ADD_PPT_FILES, payload:response.data  });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };