import * as api from "../../api";
import { ADD_SEND_OTP, GENERATE_PASSWORD, VERIFY_OTP } from "../../constants/actionTypes";


export const addSendOtp = (otp) => async (dispatch) => {
    try {
        const { data } = await api.addSendOtp(otp);
        dispatch({ type: ADD_SEND_OTP, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const verifyOtp = (otp) => async (dispatch) => {
    try {
        const { data } = await api.verifyOtp(otp);
        dispatch({ type: VERIFY_OTP, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const generatePassword = (passwordInfo) => async (dispatch) => {
    try {
        const { data } = await api.generatePassword(passwordInfo);
        dispatch({ type: GENERATE_PASSWORD, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
