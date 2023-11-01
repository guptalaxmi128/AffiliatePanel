import * as actionTypes from '../../constants/actionTypes';


const initialState = {
    currentUserType: localStorage.getItem('currentUserType') || '',
  };
  

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER_TYPE:
        return {
          ...state,
          currentUserType: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  