import { combineReducers } from "redux";
import addAdmin from "./addAdmin/addAdmin";
import user from "./userType/userType";
import loginUser from "./loginUser/loginUser";
import course from "./course/course";
import section from "./section/section";

export const reducers = combineReducers({
    addAdmin,
    user,
    loginUser,
    course,
    section
    
});
