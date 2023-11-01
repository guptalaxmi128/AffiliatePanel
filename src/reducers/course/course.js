import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    course: [],
    state: 'idle', 
    error: null
};

export const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COURSE:
            return {
                ...state,
                course: action.payload.course,
            };
        case actionTypes.GET_COURSE:
            return {
                ...state,
                course: action.payload,
            };
        default:
            return state;
    }
};

export default courseReducer;