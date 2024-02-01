import * as api from "../../api";
import {ADD_SALE_LINK} from "../../constants/actionTypes";

export const addSaleLink = (saleInfo) => async (dispatch) => {
  try {
    const { data } = await api.addSaleLink(saleInfo);
    dispatch({ type: ADD_SALE_LINK, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};