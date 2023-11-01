import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  users: [],
  userlogin: null,
  isAuthenticated: false,
  state: "idle",
  error: null,
};

// Retrieve the admin profile from localStorage
const storedProfile = localStorage.getItem('profile');
const initialProfile = storedProfile ? JSON.parse(storedProfile) : null;


  const loginUserReducer  = (state = { ...initialState, userlogin: initialProfile }, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER:
       // Update the stored profile in localStorage when admin is added
       localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        users: action.payload.users,
      };
    case actionTypes.LOGIN_USER:
         // Update the stored profile in localStorage when admin logs in
         localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

      return {
        ...state,
        userlogin: action.payload,
        isAuthenticated: true,
      };
    //   case LOGOUT:
    //     return {
    //       ...state,
    //       user: null,
    //       isAuthenticated: false,
    //     };
    case actionTypes.GET_USER:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default loginUserReducer;
