
import * as api from "../../api";
import { ADD_UPSELL, DELETE_UPSELL } from "../../constants/actionTypes";


export const addUpsell = (upsell) => async (dispatch) => {
    try {
        const { data } = await api.addUpsell(upsell);
        dispatch({ type: ADD_UPSELL, payload: data });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteUpsell = (id) => async (dispatch) => {
    try {
      const response = await api.deleteUpsell(id);
      dispatch({ type: DELETE_UPSELL, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };