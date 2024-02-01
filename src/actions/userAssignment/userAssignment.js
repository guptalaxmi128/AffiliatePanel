import * as api from "../../api";
import { GET_USER_ASSIGNMENT,ADD_USER_ASSIGNMENT } from "../../constants/actionTypes";


export const addUserAssignment = (assignment) => async (dispatch) => {
    try {
        const { data } = await api.addUserAssignment(assignment);
        dispatch({ type: ADD_USER_ASSIGNMENT, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUserAssignment = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUserAssignment(id);
        dispatch({ type: GET_USER_ASSIGNMENT, payload: data });
    } catch (error) {
        console.log(error);
    }
  }