const initialState =  {
    isAuthenticated: false,
    username: '',
    image: '',
    isAdmin: false
};

export const authReducer  = (state = initialState, action) => {
    switch (action.type) {
        case 'Auth-Success':
        return {
            ...state,
            isAuthenticated: true,
            username: action.payload.username,
            isAdmin: action.payload.isAdmin,
            image: action.payload.image
        };
        case 'Auth-Failure':
        return {
            ...state,
            isAuthenticated: false
        };
        default:
        return state;
    }

};
