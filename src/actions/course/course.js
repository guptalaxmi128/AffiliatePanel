import * as api from "../../api";
import {
  ADD_COURSE,
  ADD_COURSE_IMAGE,
  GET_COURSE,
  PUBLISH_COURSE,
  UNPUBLISH_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  GET_COURSE_BY_ID,
  DISALLOW_AFFILIATE_COURSE,
  ALLOW_AFFILIATE_COURSE,
} from "../../constants/actionTypes";

export const addCourse = (courseInfo) => async (dispatch) => {
  try {
    const { data } = await api.addCourse(courseInfo);
    dispatch({ type: ADD_COURSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCourse = () => async (dispatch) => {
  try {
    const { data } = await api.getCourse();
    dispatch({ type: GET_COURSE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const publishCourse = (id) => async (dispatch) => {
  try {
    const { data } = await api.publishCourse(id);
    dispatch({ type: PUBLISH_COURSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addCourseImage = (formData) => async (dispatch) => {
  try {
    // console.log(formData);
    const courseId = formData.get("courseId");
    const response = await api.addCourseImage(formData, courseId);
    dispatch({ type: ADD_COURSE_IMAGE, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unPublishCourse = (id) => async (dispatch) => {
  try {
    const { data } = await api.unPublishCourse(id);
    dispatch({ type: UNPUBLISH_COURSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCourse = (updatedData) => async (dispatch) => {
  try {
    const { data } = await api.updateCourse(updatedData);
    dispatch({ type: UPDATE_COURSE, payload: data });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    const response = await api.deleteCourse(id);
    dispatch({ type: DELETE_COURSE, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCourseById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getCourseById(id);
    dispatch({ type: GET_COURSE_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const allowAffiliateCourse = (id) => async (dispatch) => {
  try {
    const { data } = await api.allowAffiliateCourse(id);
    dispatch({ type: ALLOW_AFFILIATE_COURSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const disAllowAffiliate = (id) => async (dispatch) => {
  try {
    const { data } = await api.disAllowAffiliate(id);
    dispatch({ type: DISALLOW_AFFILIATE_COURSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
