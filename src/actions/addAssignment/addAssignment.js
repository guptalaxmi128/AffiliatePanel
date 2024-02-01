import * as api from "../../api";
import { ADD_ASSIGNMENT, GET_ASSIGNMENT,DELETE_ASSIGNMENT } from "../../constants/actionTypes";


export const addAssignment = (assignment) => async (dispatch) => {
    try {
        const { data } = await api.addAssignment(assignment);
        dispatch({ type: ADD_ASSIGNMENT, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAssignment = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAssignment(id);
        dispatch({ type: GET_ASSIGNMENT, payload: data });
    } catch (error) {
        console.log(error);
    }
  }

  export const deleteAssignment = (id) => async (dispatch) => {
    try {
      const response = await api.deleteAssignment(id);
      dispatch({ type: DELETE_ASSIGNMENT, payload: id });
      // console.log(response);
      // console.log("Res",response.data)
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };