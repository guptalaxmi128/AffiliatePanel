import * as api from "../../api";
import { GET_USER_COUPON,UPDATE_USER_COUPON } from "../../constants/actionTypes";

export const getUserCoupon = () => async (dispatch) => {
    try {
      const { data } = await api.getUserCoupon();
      dispatch({ type: GET_USER_COUPON, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const updateUserCoupon = (updatedData) => async (dispatch) => {
    try {
      const { data } = await api.updateUserCoupon(updatedData);  
      dispatch({ type: UPDATE_USER_COUPON, payload: data });
      return data;
    } catch (error) {
      console.error(error);  
    }
  };