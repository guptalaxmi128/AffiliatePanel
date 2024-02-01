
import * as api from "../../api";
import { GET_USER, LOGIN_USER, REGISTER_USER,UPDATE_USER } from "../../constants/actionTypes";




export const loginUser = (userInfo) => async (dispatch) => {
    try {
        const { data } = await api.loginUser(userInfo);
        dispatch({ type: LOGIN_USER, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const registerUser = (userInfo) => async (dispatch) => {
    try {
        const { data } = await api.registerUser(userInfo);
        dispatch({ type: REGISTER_USER, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUser = () => async (dispatch) => {
  
    try {
        const { data } = await api.getUser();
        dispatch({ type: GET_USER, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = (updatedData) => async (dispatch) => {
    try {
      const { data } = await api.updateUser(updatedData);  
      dispatch({ type: UPDATE_USER, payload: data });
      return data;
    } catch (error) {
      console.error(error);  
      throw error;
    }
  };