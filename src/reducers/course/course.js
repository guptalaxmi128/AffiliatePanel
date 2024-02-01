import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  course: [],
  courseById:[],
  state: "idle",
  error: null,
  success: null,
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COURSE:
      return {
        ...state,
        course: action.payload.course,
      };
    case actionTypes.GET_COURSE:
      return {
        ...state,
        course: action.payload,
      };
    case actionTypes.ADD_COURSE_IMAGE:
      return {
        ...state,
        course: {
          ...state.course,
          courseImage: action.payload.courseImage,
        },
      };
    case actionTypes.PUBLISH_COURSE:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case actionTypes.UNPUBLISH_COURSE:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
       case actionTypes.UPDATE_COURSE:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
      case actionTypes.ADD_AUTHOR_DETAILS:
        return {
          ...state,
          success: action.payload,
          error: null,
        };
        case actionTypes.GET_COURSE_BY_ID:
          return {
            ...state,
            courseById: action.payload,
          };
        case actionTypes.DELETE_COURSE:
          const courseIdToDelete = action.payload;
          // console.log(state.course);
          return {
            ...state,
            course: state.course.data.filter((course) => course.id !== courseIdToDelete),
          };
          case actionTypes.ALLOW_AFFILIATE_COURSE:
            return {
              ...state,
              success: action.payload,
              error: null,
            };
            case actionTypes.DISALLOW_AFFILIATE_COURSE:
            return {
              ...state,
              success: action.payload,
              error: null,
            };
    default:
      return state;
  }
};

export default courseReducer;
