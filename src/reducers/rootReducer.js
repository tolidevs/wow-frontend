const initialState = {
  menu_on: false,
  user: null,
  user_type: null,
  search_string: null,
  search_results: null,
  selected_show: null,
  show_details: null,
  user_subscriptions: null,
  saved_shows: []
};

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
        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                search_results: action.payload.search_results
            }
        case 'SET_SELECTED_SHOW':
            return {
                ...state,
                selected_show: action.payload.selected_show
            }
      case 'SET_SHOW_DETAILS':
        return {
          ...state,
          show_details: action.payload.show
        }
      case 'SET_SAVED_SHOWS':
        return {
          ...state,
          saved_shows: action.payload.saved_shows
        }
    }
}

export default rootReducer