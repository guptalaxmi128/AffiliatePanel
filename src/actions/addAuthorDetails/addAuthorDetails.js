import * as api from "../../api";
import { ADD_AUTHOR_DETAILS } from "../../constants/actionTypes";

export const addAuthorDetails = (formData) => async (dispatch) => {
    try {
     console.log(formData)
     const id = formData.get("id");
     const response = await api.addAuthorDetails(formData, id);
      dispatch({ type: ADD_AUTHOR_DETAILS, payload:response.data  });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };