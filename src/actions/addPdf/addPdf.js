import * as api from "../../api";
import { ADD_PDF,DELETE_PDF } from "../../constants/actionTypes";

export const addPdf = (formData) => async (dispatch) => {
    try {
     console.log(formData)
     const lessonId = formData.get("lessonId");
     const response = await api.addPdf(formData, lessonId);
      dispatch({ type: ADD_PDF, payload:response.data  });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  
  export const deletePdf = (id) => async (dispatch) => {
    try {
      const response = await api.deletePdf(id);
      dispatch({ type: DELETE_PDF, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };