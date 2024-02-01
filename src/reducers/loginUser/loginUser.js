import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  users: [],
  userlogin: null,
  isAuthenticated: false,
  state: "idle",
  error: null,
};


const storedProfile = localStorage.getItem('profile');
const initialProfile = storedProfile ? JSON.parse(storedProfile) : null;


  const loginUserReducer  = (state = { ...initialState, userlogin: initialProfile }, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER:
       localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        users: action.payload.users,
      };
    case actionTypes.LOGIN_USER:
         localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

      return {
        ...state,
        userlogin: action.payload,
        isAuthenticated: true,
      };
    case actionTypes.UPDATE_USER:
      const updatedUser = action.payload;
      const updatedUsers = {
        ...state.users,
        [updatedUser.id]: updatedUser,
      };
      return {
        ...state,
        users: updatedUsers,
      };
    case actionTypes.GET_USER:
      return {
        ...state,
        users: action.payload,
      };
      case actionTypes.LOGOUT_USER:
        localStorage.removeItem('profile');
        return {
            ...state,
            userlogin: null,
            isAuthenticated: false,
        };
    default:
      return state;
  }
};

export default loginUserReducer;
