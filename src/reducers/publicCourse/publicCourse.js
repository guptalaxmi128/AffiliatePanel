import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  course: [],
  state: "idle",
  error: null,
  success: null,
};

export const publicCourseReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case actionTypes.GET_PUBLIC_COURSE:
        return {
            ...state,
            course: action.payload,
        };
  
   
    default:
      return state;
  }
};

export default publicCourseReducer;
