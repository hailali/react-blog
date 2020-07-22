export function isUserAuthenticated() {
    return sessionStorage.getItem('exp') !== null &&
    sessionStorage.getItem('token') !== null &&
    parseInt(sessionStorage.getItem('exp') as string) > Math.floor(Date.now() / 1000)
}

/**
 * Logout action
 * Clear all the data stored in the session storage object
 */
export function userLogOut() {
    sessionStorage.clear()
}


export function getUserToken() {
    if (!isUserAuthenticated()) {
        throw Error('Unable to retrieve the token because the user is not authenticated !')
    }

    let token = sessionStorage.getItem('token')
    if (null !== token) {
        return token
    }

    return "";
}
