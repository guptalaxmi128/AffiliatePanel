import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    password: [],
    state: 'idle', 
    error: null
};

export const changePasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_PASSWORD:
            return {
                ...state,
                password: action.payload.password,
            };
      
        default:
            return state;
    }
};

export default changePasswordReducer;