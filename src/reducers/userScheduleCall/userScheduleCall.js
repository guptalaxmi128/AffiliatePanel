import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  call: [],
  state: "idle",
  error: null,
};

export const userScheduleCallReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SCHEDULE_CALL:
      return {
        ...state,
        call: action.payload,
      };
      case actionTypes.ADD_USER_SCHEDULE_CALL:
        console.log(state.call);
        return {
          ...state,
          call: [...state.call.data, action.payload],
        };
    default:
      return state;
  }
};

export default userScheduleCallReducer;
