import * as api from "../../api";
import { ADD_SECTION, GET_SECTION_BY_ID, PUBLISH_SECTION,UNPUBLISH_SECTION,DELETE_SECTION, UPDATE_SECTION } from "../../constants/actionTypes";

export const addSection = (sectionInfo) => async (dispatch) => {
  try {
    const { data } = await api.addSection(sectionInfo);
    dispatch({ type: ADD_SECTION, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const getSectionById = (courseId) => async (dispatch) => {
    try {
        const { data } = await api.getSectionById(courseId);
        dispatch({ type: GET_SECTION_BY_ID, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const publishSection = (id) => async (dispatch) => {
  try {
    const { data } = await api.publishSection(id);
    dispatch({ type: PUBLISH_SECTION, payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const unPublishSection = (id) => async (dispatch) => {
  try {
    const { data } = await api.unPublishSection(id);
    dispatch({ type: UNPUBLISH_SECTION, payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSection = (id) => async (dispatch) => {
  try {
    const response = await api.deleteSection(id);
    dispatch({ type: DELETE_SECTION, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSection = (updatedData) => async (dispatch) => {
  try {
    const { data } = await api.updateSection(updatedData);  
    dispatch({ type: UPDATE_SECTION, payload: data });
    return data;
  } catch (error) {
    console.error(error);  
  }
};