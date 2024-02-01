import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  lessonText: [],
  state: "idle",
  error: null,
  success:null,
};

export const lessonTextReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TEXT:
      return {
        ...state,
        lessonText: [...state.lessonText, action.payload],
      };
    // case actionTypes.GET_QUIZ:
    //   return {
    //     ...state,
    //     quiz: action.payload,
    //   };
    case actionTypes.DELETE_TEXT:
      const textIdToDelete = action.payload;
      return {
        ...state,
        lessonText: state.lessonText.filter((text) => text.id !== textIdToDelete),
      };
      case actionTypes.UPDATE_TEXT:
        return {
          ...state,
          success: action.payload,
          error: null,
        };

    default:
      return state;
  }
};

export default lessonTextReducer;
