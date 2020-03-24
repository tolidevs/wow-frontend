// Define the URLs for our different routes
const baseURL = "http://localhost:3000"
const logInURL = `${baseURL}/login`
const validateURL = `${baseURL}/profile`
const signUpURL = `${baseURL}/signup`
const findShowsURL = `${baseURL}/search`
const getDetailsURL = `${baseURL}/show`
const savedShowURL = `${baseURL}/saved_shows`
const getSavedShowsURL = `${baseURL}/user/saved_shows`
const getServicesURL = `${baseURL}/get_services`
const getSubscriptionsURL = `${baseURL}/user/subscriptions`
const allServicesURL = `${baseURL}/services`
const subscriptionsURL = `${baseURL}/subscriptions`

// Make a post request to a given URL with a given data object as the body and return the Promise
const post = (url, data) => {
  const configurationObject = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
  return fetch(url, configurationObject)
}

// Make a get request to a given URL and return the Promise. If a token has been provided, include it as a header called Authorization
const get = (url, token) => {
  return token ? fetch(url, { headers: { Authorization: token } }) : fetch(url)
}

// make a delete request to a given URL
const deleteItem = (url, id) => {
  const configurationObject = {
    method: "DELETE",
  }
  return fetch(`${url}/${id}`, configurationObject)
}

// Use the get function to make a request to the profile route and parse the response into JSON
const validateProfile = token => {
  return get(validateURL, token).then(resp => resp.json())
}

// Use the post function to make a request to the login route and parse the response into JSON
const logIn = data => {
  return post(logInURL, data).then(resp => resp.json())
}

// Use the post function to make a request to the sign up route and parse the response into JSON
const signUp = data => {
  return post(signUpURL, data).then(resp => resp.json())
}

// Use the post function to make a request to the find shows route with the search string and parse the response into JSON
const findShows = search_string => {
  return post(findShowsURL, {search_string}).then(resp => resp.json())
}

// Use the post function to make a request to the get show details route with the imdbID and parse the response into JSON
const getShowDetails = imdbID => {
  return post(getDetailsURL, {imdbID}).then(resp => resp.json())
}

const saveShow = (user, imdbID, title, show_type, year, poster) => {
  return post(savedShowURL, {
    user,
    imdbID,
    title,
    show_type,
    year,
    poster
  })
  .then(resp => resp.json())
}

const getSavedShows = user_id => {
  return post(getSavedShowsURL, {user_id}).then(resp => resp.json())
}

const deleteSavedShow = id => {
  return deleteItem(savedShowURL, id).then(resp => resp.json())
}

const getServices = array => {
  return post(getServicesURL, {array}).then(resp => resp.json())
}

const getSubscriptions = user_id => {
  return post(getSubscriptionsURL, { user_id }).then(resp => resp.json())
}

const getAllServices = () => {
  return get(allServicesURL).then(resp => resp.json())
}

const saveSubscription = (service_id, user_id) => {
  return post(subscriptionsURL, {service_id, user_id}).then(resp => resp.json())
}


// Export the necessary functions as part of one object which we will import elsewhere
export default {
  logIn,
  validateProfile,
  signUp,
  findShows,
  getShowDetails,
  saveShow,
  getSavedShows,
  deleteSavedShow,
  getServices,
  getSubscriptions,
  getAllServices,
  saveSubscription
}