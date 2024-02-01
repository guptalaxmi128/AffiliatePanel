import * as api from "../../api";
import {ADD_ADMIN_SALE_LINK} from "../../constants/actionTypes";

export const addAdminSaleLink = (saleInfo) => async (dispatch) => {
  try {
    const { data } = await api.addAdminSaleLink(saleInfo);
    dispatch({ type: ADD_ADMIN_SALE_LINK, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};