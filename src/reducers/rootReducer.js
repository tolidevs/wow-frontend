const initialState = {
    user: null,
    user_logged_in_type: null,
    search_string: null,
    results: null,
    selected_show: null,
    show_details: null,
    user_subscriptions: null
}

const rootReducer = ( state = initialState, action ) => {
    switch(action.type){
        default:
            return state;
        case 'SET_USER':
            return {
                ...state,
                user: action.payload.user
            }
        case 'SET_USER_TYPE':
            return {
                ...state,
                user_type: action.payload.user_type
            }

    }
}

export default rootReducer