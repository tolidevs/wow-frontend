const initialState = {
  menu_on: false,
  user: null,
  user_type: null,
  search_string: "scrooged",
  search_results: [
    {
      imdbID: "tt0096061",
      title: "Scrooged",
      type: "movie",
      year: "1988",
      poster:
        "https://m.media-amazon.com/images/M/MV5BM2NlMDQzMDktNTMyZS00MjBjLWI0MmEtMzgzZDM2ZTVkNzE1XkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_SX300.jpg",
      services: [
        {
          name: "iTunes",
          url: "https://itunes.apple.com/gb/movie/scrooged/id305271659"
        },
        {
          name: "Google Play",
          url:
            "https://play.google.com/store/movies/details/Scrooged?gl=gb&hl=en&id=Il6M3Wvc71A"
        },
        {
          name: "Amazon Prime Video",
          url:
            "https://www.amazon.co.uk/gp/product/B07ZX4F3DB?cre…07ZX4F3DB&ie=UTF8&linkCode=xm2&tag=utellycom00-21"
        },
        { name: "IVA", url: null }
      ]
    }
  ],
  selected_show: "tt0096061",
  show_details: null,
  user_subscriptions: null
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
    }
}

export default rootReducer