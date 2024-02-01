import * as api from "../../api";
import { GET_LINK_REQUEST ,UPDATE_ACCEPT_REQUEST,UPDATE_BLOCK_REQUEST ,UPDATE_UNBLOCK_REQUEST} from "../../constants/actionTypes";

export const getLinkRequest = () => async (dispatch) => {
  try {
    const { data } = await api.getLinkRequest();
    dispatch({ type: GET_LINK_REQUEST, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const updateAcceptRequest = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateAcceptRequest(id);
    dispatch({ type: UPDATE_ACCEPT_REQUEST, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const updateBlockRequest = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateBlockRequest(id);
    dispatch({ type: UPDATE_BLOCK_REQUEST, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUnblockRequest = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateUnblockRequest(id);
    dispatch({ type: UPDATE_UNBLOCK_REQUEST, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};