import * as api from "../../api";
import {ADD_TEMPLATE,GET_TEMPLATE,DELETE_TEMPLATE} from "../../constants/actionTypes";

export const addTemplate = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addTemplate(formData);
    dispatch({ type: ADD_TEMPLATE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTemplate = () => async (dispatch) => {
  try {
    const { data } = await api.getTemplate();
    dispatch({ type: GET_TEMPLATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const deleteTemplate = (id) => async (dispatch) => {
  try {
    const response = await api.deleteTemplate(id);
    dispatch({ type: DELETE_TEMPLATE, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
