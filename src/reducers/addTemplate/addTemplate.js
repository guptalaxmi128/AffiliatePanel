import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  template: [],
  state: "idle",
  error: null,
};

export const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TEMPLATE:
        return {
            ...state,
            template:action.payload.template,
          };
          case actionTypes.GET_TEMPLATE:
            return {
              ...state,
              template: action.payload,
            };
          case actionTypes.DELETE_TEMPLATE:
            const templateIdToDelete = action.payload;
            return {
              ...state,
              template: state.template.data.filter((template) => template.id !== templateIdToDelete),
            };
       
    default:
      return state;
  }
};

export default templateReducer;
