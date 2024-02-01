import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  lesson: [],
  lessonById: [],
  state: "idle",
  error: null,
  success: null,
};

export const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_LESSON:
      return {
        ...state,
        lesson: action.payload.lesson,
      };

    case actionTypes.GET_LESSON_BY_ID:
      return {
        ...state,
        lessonById: action.payload,
      };
    case actionTypes.PUBLISH_LESSON:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case actionTypes.UNPUBLISH_LESSON:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
      case actionTypes.UPDATE_LESSON:
        return {
          ...state,
          success: action.payload,
          error: null,
        };
        case actionTypes.DELETE_LESSON:
          const lessonIdToDelete = action.payload;
          return {
            ...state,
            lesson: state.lesson.filter((lesson) => lesson.id !== lessonIdToDelete),
          };
    default:
      return state;
  }
};

export default lessonReducer;
