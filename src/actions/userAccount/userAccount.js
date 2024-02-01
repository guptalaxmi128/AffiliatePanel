import * as api from "../../api";
import { ADD_USER_ACCOUNT,GET_USER_ACCOUNT,UPDATE_USER_ACCOUNT } from "../../constants/actionTypes";


export const addUserAccount = (accountInfo) => async (dispatch) => {
    try {
        const { data } = await api.addUserAccount(accountInfo);
        dispatch({ type: ADD_USER_ACCOUNT, payload: data });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getUserAccount = () => async (dispatch) => {
    try {
      const { data } = await api.getUserAccount();
      dispatch({ type: GET_USER_ACCOUNT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const updateUserAccount = (updatedData) => async (dispatch) => {
    try {
      const { data } = await api.updateUserAccount(updatedData);  
      dispatch({ type: UPDATE_USER_ACCOUNT, payload: data });
      return data;
    } catch (error) {
      console.error(error);  
      throw error;
    }
  };