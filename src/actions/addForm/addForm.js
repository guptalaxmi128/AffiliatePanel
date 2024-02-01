import * as api from "../../api";
import { ADD_FORM, GET_FORM } from "../../constants/actionTypes";


export const addForm = (formInfo) => async (dispatch) => {
    try {
        const { data } = await api.addForm(formInfo);
        dispatch({ type: ADD_FORM, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getForm = () => async (dispatch) => {
    try {
      const { data } = await api.getForm();
      dispatch({ type: GET_FORM, payload: data });
    } catch (error) {
      console.log(error);
    }
  };