import * as api from "../../api";
import { ADD_USER_AFFILIATE_LINK ,GET_AFFILIATE_USER_ID} from "../../constants/actionTypes";

export const addUserAffiliateLink = (assignmentId) => async (dispatch) => {
  try {
    const { data } = await api.addUserAffiliateLink(assignmentId);
    dispatch({ type: ADD_USER_AFFILIATE_LINK, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAffiliateUserId = (courseId) => async (dispatch) => {
  try {
    const { data } = await api.getAffiliateUserId(courseId);
    dispatch({ type: GET_AFFILIATE_USER_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};