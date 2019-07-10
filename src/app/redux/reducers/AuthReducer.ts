const initialState =  {
    isAuthenticated: false,
    username: '',
    image: '',
    isAdmin: false
};

export const authReducer  = (state = initialState, action) => {
    switch (action.type) {
        case 'Auth-Success':
          const { payload: {username, isAdmin, image } } = action;
          return {
            ...state,
            isAuthenticated: true,
            username,
            isAdmin,
            image
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
