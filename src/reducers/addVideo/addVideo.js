import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  video: [],
  state: "idle",
  error: null,
};

export const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_VIDEO:
        return {
            ...state,
            video: [...state.video, action.payload],
          };
          case actionTypes.DELETE_VIDEO:
            const videoIdToDelete = action.payload;
            return {
              ...state,
              video: state.video.filter((video) => video.id !== videoIdToDelete),
            };
          case actionTypes.ADD_VIDEO_THUMBNAIL: //check this for video
            return {
                ...state,
                course: {
                    ...state.course,
                    thumbnail: action.payload.thumbnail,
                },
            };
            case actionTypes.ADD_EMBED_VIDEO:
              return {
                ...state,
                video: [...state.video, action.payload],
              };
            // case actionTypes.GET_VIDEO_PROCESSING:
            //   return {
            //     ...state,
            //     video: action.payload,
            //   };
    default:
      return state;
  }
};

export default videoReducer;
