import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  sections: [],
  state: "idle",
  error: null,
};

export const userSectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SECTION:
      return {
        ...state,
        sections: action.payload,
      };
    default:
      return state;
  }
};

export default userSectionReducer;