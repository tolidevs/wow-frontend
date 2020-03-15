const initialState = {
    menu_on: false,
    user: null,
    user_type: null,
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
        case 'SET_MENU':
            return {
                ...state,
                menu_on: action.payload.menu_on
            }
        case 'SET_SEARCH_STRING':
            return {
                ...state,
                search_string: action.payload.search_string
            }
    }
}

export default rootReducer