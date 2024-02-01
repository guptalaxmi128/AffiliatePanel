import * as api from "../../api";
import {
  GET_ADMIN_USER,
  ADD_NEW_USER,
  UPDATE_BLOCK_USER,
  UPDATE_UNBLOCK_USER,
  GET_ADMIN_BLOCK_USER,
  ADD_BULK_USER_TO_COURSE,
} from "../../constants/actionTypes";

export const getAdminUser = (params) => async (dispatch) => {
  try {
    const { data } = await api.getAdminUser(params);
    dispatch({ type: GET_ADMIN_USER, payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewUser = (coupon) => async (dispatch) => {
  try {
    const { data } = await api.addNewUser(coupon);
    dispatch({ type: ADD_NEW_USER, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBlockUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateBlockUser(id);
    dispatch({ type: UPDATE_BLOCK_USER, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUnblockUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateUnblockUser(id);
    dispatch({ type: UPDATE_UNBLOCK_USER, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAdminBlockUser = (params) => async (dispatch) => {
  try {
    const { data } = await api.getAdminBlockUser(params);
    dispatch({ type: GET_ADMIN_BLOCK_USER, payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addBulkUserToCourse = (userInfo) => async (dispatch) => {
  try {
    const { data } = await api.addBulkUserToCourse(userInfo);
    dispatch({ type: ADD_BULK_USER_TO_COURSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
