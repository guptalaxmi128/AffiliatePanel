import * as api from "../../api";
import { ADD_TEXT,DELETE_TEXT,UPDATE_TEXT } from "../../constants/actionTypes";

export const addText  = (textInfo) => async (dispatch) => {
  try {
    const { data } = await api.addText(textInfo);
    dispatch({ type: ADD_TEXT, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const deleteText = (id) => async (dispatch) => {
  try {
    const response = await api.deleteText(id);
    dispatch({ type: DELETE_TEXT, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateText = (textInfo) => async (dispatch) => {
  try {
    const { data } = await api.updateText(textInfo);  
    dispatch({ type: UPDATE_TEXT, payload: data });
    return data;
  } catch (error) {
    console.error(error);  
    throw error; 
  }
};