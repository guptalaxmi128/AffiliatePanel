import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  lessons: [],
  state: "idle",
  error: null,
};

export const userLessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_LESSON:
      return {
        ...state,
        lessons: action.payload,
      };
    default:
      return state;
  }
};

export default userLessonReducer;