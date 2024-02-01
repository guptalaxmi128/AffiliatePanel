import * as api from "../../api";
import { GET_USER_SCHEDULE_CALL,ADD_USER_SCHEDULE_CALL } from "../../constants/actionTypes";

export const getUserSchdeduleCall = (adminId) => async (dispatch) => {
  try {
    const { data } = await api.getUserSchdeduleCall(adminId);
    dispatch({ type: GET_USER_SCHEDULE_CALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addUserScheduleCall = (id) => async (dispatch) => {
  try {
    const { data } = await api.addUserScheduleCall(id);
    dispatch({ type: ADD_USER_SCHEDULE_CALL, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};