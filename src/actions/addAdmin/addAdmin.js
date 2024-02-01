
import * as api from "../../api";
import { ADD_ADMIN, GET_ADMIN, LOGIN_ADMIN } from "../../constants/actionTypes";


export const addAdmin = (admin) => async (dispatch) => {
    try {
        const { data } = await api.addAdmin(admin);
        dispatch({ type: ADD_ADMIN, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const loginAdmin = (userInfo) => async (dispatch) => {
    try {
        const { data } = await api.loginAdmin(userInfo);
        dispatch({ type: LOGIN_ADMIN, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
// export const getAdmin = () => async (dispatch) => {
  
//     try {
//         const { data } = await api.getAdmin();
//         console.log(data)
//         dispatch({ type: GET_ADMIN, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// };
