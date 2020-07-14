import {isUserAuthenticated} from "../component/UserUtils";
import {ACTIONS} from "./actions";

let initialState = {
    isUserAuthenticated: isUserAuthenticated()
}

// return the new states according to the previous state given in the first paramer
export function rootReducer(state = initialState, action) {

    switch (action.type) {
        case ACTIONS.USER_LOGIN:
            return {isUserAuthenticated: true}
        case ACTIONS.USER_LOGOUT:
            return {isUserAuthenticated: false}
        default:
            return state;
    }
}
