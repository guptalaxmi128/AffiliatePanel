import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  section: [],
  sectionById: [],
  state: "idle",
  error: null,
  success: null,
};

export const sectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SECTION:
      return {
        ...state,
        section: action.payload.section,
      };
    // case actionTypes.GET_COURSE:
    //     return {
    //         ...state,
    //         course: action.payload,
    //     };
    case actionTypes.GET_SECTION_BY_ID:
      return {
        ...state,
        sectionById: action.payload,
      };
    case actionTypes.PUBLISH_SECTION:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case actionTypes.UNPUBLISH_SECTION:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
      case actionTypes.UPDATE_SECTION:
        return {
          ...state,
          success: action.payload,
          error: null,
        };
    case actionTypes.DELETE_SECTION:
      const sectionIdToDelete = action.payload;
      return {
        ...state,
        section: state.section.filter(
          (section) => section.id !== sectionIdToDelete
        ),
      };
    default:
      return state;
  }
};

export default sectionReducer;
