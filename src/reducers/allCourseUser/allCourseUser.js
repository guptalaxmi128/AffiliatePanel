import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  courses: [],
  courseByTitle:[],
  state: "idle",
  error: null,
};

export const allCourseUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_COURSE_USER:
      return {
        ...state,
        courses: action.payload,
      };
      case actionTypes.GET_COURSE_BY_TITLE:
        return {
          ...state,
          courseByTitle: action.payload,
        };
    default:
      return state;
  }
};

export default allCourseUserReducer;
