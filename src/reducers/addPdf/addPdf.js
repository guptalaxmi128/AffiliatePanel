import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  pdf: [],
  state: "idle",
  error: null,
};

export const pdfReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PDF:
        return {
            ...state,
            pdf: [...state.pdf, action.payload],
          };
          case actionTypes.DELETE_PDF:
            const pdfIdToDelete = action.payload;
            return {
              ...state,
              pdf: state.pdf.filter((pdf) => pdf.id !== pdfIdToDelete),
            };
    default:
      return state;
  }
};

export default pdfReducer;
