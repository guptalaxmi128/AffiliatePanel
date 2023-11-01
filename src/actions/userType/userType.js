import { SET_CURRENT_USER_TYPE } from "../../constants/actionTypes";


export const setCurrentUserType = (userType) => {
  localStorage.setItem('currentUserType', userType);
    return {
      type: SET_CURRENT_USER_TYPE,
      payload: userType,
    };
  };