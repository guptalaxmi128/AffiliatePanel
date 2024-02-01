import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    admins: [],
    adminlogin: null, 
    isAuthenticated: false,
    state: 'idle', 
    error: null
};

// Retrieve the admin profile from localStorage
const storedProfile = localStorage.getItem('profile');
const initialProfile = storedProfile ? JSON.parse(storedProfile) : null;

const addAdminReducer = (state = { ...initialState, adminlogin: initialProfile }, action) => {
    switch (action.type) {
        case actionTypes.ADD_ADMIN:
            // Update the stored profile in localStorage when admin is added
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return {
                ...state,
                admins: action.payload.admins
            };
        case actionTypes.LOGIN_ADMIN:
            // Update the stored profile in localStorage when admin logs in
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return {
                ...state,
                adminlogin: action.payload,
                isAuthenticated: true,
            };
            case actionTypes.LOGOUT_ADMIN:
                localStorage.removeItem('profile');
                return {
                    ...state,
                    adminlogin: null,
                    isAuthenticated: false,
                };
        default:
            return state;
    }
};

export default addAdminReducer;
