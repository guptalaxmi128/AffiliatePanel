import * as api from "../../api";
import {ADD_RATIO ,GET_RATIO ,DELETE_RATIO,UPDATE_RATIO} from "../../constants/actionTypes";

export const addRatio = (ratioInfo) => async (dispatch) => {
  try {
    const { data } = await api.addRatio(ratioInfo);
    dispatch({ type: ADD_RATIO, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRatio = () => async (dispatch) => {
  try {
    const { data } = await api.getRatio();
    dispatch({ type: GET_RATIO, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRatio = (id) => async (dispatch) => {
  try {
    const response = await api.deleteRatio(id);
    dispatch({ type: DELETE_RATIO, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateRatio = (ratioInfo) => async (dispatch) => {
  try {
    const { data } = await api.updateRatio(ratioInfo);  
    dispatch({ type: UPDATE_RATIO, payload: data });
    return data;
  } catch (error) {
    console.error(error);  
    throw error; 
  }
};