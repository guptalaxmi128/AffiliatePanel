import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  usercourses: [],
  state: "idle",
  error: null,
};

export const userCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_COURSE:
      return {
        ...state,
        usercourses: action.payload,
      };
    default:
      return state;
  }
};

export default userCourseReducer;