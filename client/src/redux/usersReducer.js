import { GET_USER_BY_ID, SET_VERIFIED, USER_CREATED, USER_LOGGED_IN, POST_LOGIN, AUTH_FAILED, USER_LOGGED_OUT } from './constants'
var initialState = {
    idUser: 3,
    name: 'Guest',
    email: 'no-email',
    level: 'GUEST',
    verified: false
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_BY_ID:
            return {
                ...state,
                name: action.payload.name,
                level: action.payload.level,
                idUser: action.payload.idUser
            }
        case USER_CREATED:
            return state;
        case USER_LOGGED_IN:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                level: action.payload.level,
                idUser: action.payload.idUser,
                verified: action.payload.verified
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                level: action.payload.level,
                idUser: action.payload.idUser
            };
        case POST_LOGIN:
            return state;
        case AUTH_FAILED:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                level: action.payload.level,
                idUser: action.payload.idUser,
                verified: action.payload.verified
            };
        case SET_VERIFIED:
            return {
                ...state,
                verified: action.payload
            }

        default:
            return state;
    }
}
export default usersReducer;