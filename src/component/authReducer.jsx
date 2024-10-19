const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                currentUser: action.payload.user, // Assuming user is part of payload
                userRole: action.payload.userRole, // Assuming userRole is part of payload
            };
        }
        case "LOGOUT": {
            return {
                currentUser: null,
                userRole: null,
            };
        }
        default:
            return state;
    }
};

export default AuthReducer;
