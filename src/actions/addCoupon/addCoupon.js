
import * as api from "../../api";
import { ADD_COUPON, ADD_COUPON_TO_COURSE, DELETE_COUPON, GET_COUPON,UPDATE_COUPON } from "../../constants/actionTypes";


export const addCoupon = (coupon) => async (dispatch) => {
    try {
        const { data } = await api.addCoupon(coupon);
        dispatch({ type: ADD_COUPON, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const getCoupon = () => async (dispatch) => {
    try {
      const { data } = await api.getCoupon();
      dispatch({ type: GET_COUPON, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const addCouponToCourse = (updatedData) => async (dispatch) => {
    try {
      const { data } = await api.addCouponToCourse(updatedData);  
      dispatch({ type: ADD_COUPON_TO_COURSE, payload: data });
      return data;
    } catch (error) {
      console.error(error);   
      throw error;
    }
  };

  export const updateCoupon = (updatedData) => async (dispatch) => {
    try {
      const { data } = await api.updateCoupon(updatedData);  
      dispatch({ type: UPDATE_COUPON, payload: data });
      return data;
    } catch (error) {
      console.error(error);  
      throw error; 
    }
  };

  export const deleteCoupon = (id) => async (dispatch) => {
    try {
      const response = await api.deleteCoupon(id);
      dispatch({ type: DELETE_COUPON, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };