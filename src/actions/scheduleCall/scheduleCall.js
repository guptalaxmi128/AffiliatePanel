import * as api from "../../api";
import { ADD_SCHEDULE_CALL,GET_MY_BOOKING,GET_SCHEDULE_BOOKING } from "../../constants/actionTypes";


export const addScheduleCall = (callInfo) => async (dispatch) => {
    try {
        const { data } = await api.addScheduleCall(callInfo);
        dispatch({ type: ADD_SCHEDULE_CALL, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getMyBooking = (date) => async (dispatch) => {
    try {
      const { data } = await api.getMyBooking(date);
      dispatch({ type: GET_MY_BOOKING, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const getScheduleBooking = (date) => async (dispatch) => {
    try {
      const { data } = await api.getScheduleBooking(date);
      dispatch({ type: GET_SCHEDULE_BOOKING, payload: data });
    } catch (error) {
      console.log(error);
    }
  };