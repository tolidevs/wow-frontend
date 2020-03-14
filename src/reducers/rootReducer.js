const initialState = {
    user: null,
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

    }
}

export default rootReducer