import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  ppt: [],
  state: "idle",
  error: null,
};

export const pptReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PPT_FILES:
        return {
            ...state,
            ppt: [...state.ppt, action.payload],
          };
        //   case actionTypes.DELETE_PDF:
        //     const pdfIdToDelete = action.payload;
        //     return {
        //       ...state,
        //       pdf: state.pdf.filter((pdf) => pdf.id !== pdfIdToDelete),
        //     };
    default:
      return state;
  }
};

export default pptReducer;
