import * as api from "../../api";
import { ADD_SECTION, GET_SECTION_BY_ID } from "../../constants/actionTypes";

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