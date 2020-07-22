import {isUserAuthenticated} from "../component/UserUtils";
import {ActionInterface, ACTIONS} from "./actions";

let initialState = {
    isUserAuthenticated: isUserAuthenticated()
}

// return the new states according to the previous state given in the first parameter
export function rootReducer(state = initialState, action: ActionInterface) {

    switch (action.type) {
        case ACTIONS.USER_LOGIN:
            return {isUserAuthenticated: true}
        case ACTIONS.USER_LOGOUT:
            return {isUserAuthenticated: false}
        default:
            return state;
    }
}
