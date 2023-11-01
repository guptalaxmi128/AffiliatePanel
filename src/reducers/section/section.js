import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    section: [],
    sectionById:[],
    state: 'idle', 
    error: null
};

export const sectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_SECTION:
            return {
                ...state,
                section: action.payload.section,
            };
        // case actionTypes.GET_COURSE:
        //     return {
        //         ...state,
        //         course: action.payload,
        //     };
        case actionTypes.GET_SECTION_BY_ID:
            return {
                ...state,
                sectionById: action.payload,
            };
        default:
            return state;
    }
};

export default sectionReducer;