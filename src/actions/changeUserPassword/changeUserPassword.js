import * as api from "../../api";
import { CHANGE_PASSWORD } from "../../constants/actionTypes";


export const changePassword = (password) => async (dispatch) => {
    try {
        const { data } = await api.changePassword(password);
        dispatch({ type: CHANGE_PASSWORD, payload: data });
        return data;
    } catch (error) {
        console.log(error);
    }
};