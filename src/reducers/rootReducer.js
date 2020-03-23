const initialState = {
  menu_on: false,
  user: null,
  user_type: null,
  search_string: null,
  search_results: null,
  selected_show: null,
  show_details: null,
  user_subscriptions: [],
  saved_shows: []
};

// const initialState = {
//   menu_on: false,
//   user: {
//     id: 8,
//     name: "toli",
//     email: "t@b"
//   },
//   user_type: "existing_user",
//   search_string: "casino",
//   search_results: [
//     {
//       imdbID: "tt0381061",
//       title: "Casino Royale",
//       show_type: "movie",
//       year: "2006",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
//       services: [
//         {
//           name: "iTunes",
//           url: "https://itunes.apple.com/za/movie/casino-royale/id561902712"
//         },
//         {
//           name: "Google Play",
//           url:
//             "https://play.google.com/store/movies/details/Casino_Royale?gl=GB&hl=en&id=deA2fR9iFZw"
//         }
//       ]
//     },
//     {
//       imdbID: "tt0112641",
//       title: "Casino",
//       show_type: "movie",
//       year: "1995",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BMTcxOWYzNDYtYmM4YS00N2NkLTk0NTAtNjg1ODgwZjAxYzI3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
//       services: [
//         {
//           name: "iTunes",
//           url: "https://itunes.apple.com/za/movie/casino-1995/id635667803"
//         }
//       ]
//     },
//     {
//       imdbID: "tt0061452",
//       title: "Casino Royale",
//       show_type: "movie",
//       year: "1967",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BZjJlYzgyZTQtNDFiMy00ZGFjLTk2N2ItN2ViNzNhNzhhNGM1XkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SX300.jpg",
//       services: [
//         {
//           name: "iTunes",
//           url:
//             "https://itunes.apple.com/za/movie/casino-royale-1968/id334737315"
//         },
//         {
//           name: "Google Play",
//           url:
//             "https://play.google.com/store/movies/details/Casino_Royale?gl=GB&hl=en&id=w3Fh-3NLkas"
//         }
//       ]
//     },
//     {
//       imdbID: "tt1194417",
//       title: "Casino Jack",
//       show_type: "movie",
//       year: "2010",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BMTM2NzQ4NDE2M15BMl5BanBnXkFtZTcwNDM0NzcwNA@@._V1_SX300.jpg",
//       services: [
//         {
//           name: "Amazon",
//           url:
//             "https://www.amazon.co.uk/gp/product/B07DNJZH8V?creativeASIN=B07DNJZH8V&ie=UTF8&linkCode=xm2&tag=utellycom00-21"
//         },
//         {
//           name: "Google Play",
//           url:
//             "https://play.google.com/store/movies/details/Casino_Jack?gl=GB&hl=en&id=pr-YvByMXqw"
//         },
//         {
//           name: "iTunes",
//           url: "https://itunes.apple.com/gb/movie/casino-jack/id986796789"
//         }
//       ]
//     },
//     {
//       imdbID: "tt1540814",
//       title: "Casino Jack and the United States of Money",
//       show_type: "movie",
//       year: "2010",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BMjA3MTc2MzM4NV5BMl5BanBnXkFtZTcwMzE5MjYxMw@@._V1_SX300.jpg",
//       services: []
//     },
//     {
//       imdbID: "tt0419909",
//       title: "The Last Casino",
//       show_type: "movie",
//       year: "2004",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BZmJkMTA5YTMtZjNkZS00ODgwLTg4MDQtMWFmMDMwYWZhNTBhXkEyXkFqcGdeQXVyNTY0OTIxNTg@._V1_SX300.jpg",
//       services: []
//     },
//     {
//       imdbID: "tt0831279",
//       title: "The Casino Job",
//       show_type: "movie",
//       year: "2009",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BMTMzNjQwNTI2N15BMl5BanBnXkFtZTcwNDE5MzAyMg@@._V1_SX300.jpg",
//       services: null
//     },
//     {
//       imdbID: "tt0072791",
//       title: "Cleopatra Jones and the Casino of Gold",
//       show_type: "movie",
//       year: "1975",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BMjUyNTUxNjEtOTMzNy00MmZiLTk2NDctOTIwZjNhZmY2YzY5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_SX300.jpg",
//       services: [
//         {
//           name: "iTunes",
//           url:
//             "https://itunes.apple.com/gb/movie/cleopatra-jones-and-the-casino-of-gold/id300731028"
//         },
//         {
//           name: "Google Play",
//           url:
//             "https://play.google.com/store/movies/details/Cleopatra_Jones_and_the_Casino_of_Gold_1975?gl=gb&hl=en&id=MSBBv5-SfCM"
//         }
//       ]
//     },
//     {
//       imdbID: "tt0039434",
//       title: "Gran Casino",
//       show_type: "movie",
//       year: "1947",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BMTc0NDExMDUzN15BMl5BanBnXkFtZTcwNDE0OTM1MQ@@._V1_SX300.jpg",
//       services: null
//     },
//     {
//       imdbID: "tt0864331",
//       title: "The Haunted Casino",
//       show_type: "movie",
//       year: "2007",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BMTk2ODk4MzUyMF5BMl5BanBnXkFtZTcwMjI3MjE2MQ@@._V1_SX300.jpg",
//       services: []
//     }
//   ],
//   selected_show: "tt0381061",
//   show_details: {
//     imdbID: "tt0381061",
//     title: "Casino Royale",
//     show_type: "movie",
//     year: "2006",
//     poster:
//       "https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
//     services: [
//       {
//         name: "iTunes",
//         url: "https://itunes.apple.com/za/movie/casino-royale/id561902712"
//       },
//       {
//         name: "Google Play",
//         url:
//           "https://play.google.com/store/movies/details/Casino_Royale?gl=GB&hl=en&id=deA2fR9iFZw"
//       }
//     ],
//     plot:
//       "After earning 00 status and a licence to kill, Secret Agent James Bond sets out on his first mission as 007. Bond must defeat a private banker funding terrorists in a high-stakes game of poker at Casino Royale, Montenegro.",
//     genre: "Action, Adventure, Thriller",
//     imdbRating: "8.0"
//   },
//   user_subscriptions: [],
//   saved_shows: [
//     {
//       id: 6,
//       user_id: 8,
//       imdbID: "tt0096061",
//       title: "Scrooged",
//       show_type: "movie",
//       year: "1988",
//       poster: "https://m.media-amazon.com/images/M/MV5BM2NlMDQzMD..."
//     },
//     {
//       id: 7,
//       user_id: 8,
//       imdbID: "tt0381061",
//       title: "Casino Royale",
//       show_type: "movie",
//       year: "2006",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
//     }
//   ]
// };

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
      case 'SET_USER_SUBSCRIPTIONS':
        return {
          ...state,
          user_subscriptions: action.payload.user_subscriptions
        }
    }
}

export default rootReducer