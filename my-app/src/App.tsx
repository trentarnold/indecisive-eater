
import './App.css';
import RegisterInput from './components/RegisterInput';
import Navbar from './components/Navbar'
import Home from './components/routes/Home';
import LocalRestaurants from './components/routes/LocalRestaurants';
import { Outlet } from "react-router-dom";
import { 
  Routes,
  Route } from "react-router-dom";
import {
  useState,
  useEffect
} from 'react'
import apiService from './apiService';
import {Restaurant} from './restaurantType';
import {Location} from './Location'
import Spinner from './components/Spinner';
import WelcomePage from './components/WelcomePage';
import FavoriteRestaurants from './components/FavoriteRestaurants';
const initialLocation :Location = {
  lat: '',
  lng: ''
}
const initialRestaurantState: Array<Restaurant> = [{
  business_status: '',
  geometry: 'any',
  icon: 'string',
  icon_background_color: 'string',
  icon_mask_base_uri: 'string',
  name: 'string',
  opening_hours: 'any',
  photos: 'any',
  place_id: 'a',
  plus_code: 'any',
  rating: 4, 
  reference: 'string',
  scope: 'string',
  types: ['asdf'],
  user_ratings_total: 123,
  vicinity: 'string',
  price_level: 2,
  favorited:false
}]

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState('false');
  const [location, setLocation] = useState(initialLocation);
  const [userId, setUserId] = useState(0);
  const [localRestaurants, setLocalRestaurants] = useState(initialRestaurantState);
  const [restaurantsToPickOne, setRestaurantsToPickOne] = useState(initialRestaurantState);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState(initialRestaurantState);
  const apiKey =`${process.env.REACT_APP_API_KEY}`;
  useEffect(() => {
    if(!location.lat || userId === 0 ){
      console.log('no location')
      return
    }
    getRestaurants();
    getFavoriteRestaurants();
  }, [location, userId])

  // useEffect(() => {
  //   if(userId === 0){
  //     console.log('no user')
  //     return
  //   }
  //   getFavoriteRestaurants();
  // }, [userId])

const getRestaurants = async () => {
 const restaurants = await apiService.getLocalRestaurants(location.lat, location.lng, 'food', 'any', '8046');
 //setLocalRestaurants(restaurants);
 //get titles for local rests, loop through rests and change favorited
 const favoriteRestaurantTitles = await apiService.getFavoriteRestaurantTitles(userId);
 if(!favoriteRestaurantTitles.length) {
   setLocalRestaurants(restaurants);
 }
 favoriteRestaurantTitles.forEach((favRestaurantTitle:string) => {
   let newLocalRests = [...restaurants];
   newLocalRests.map(newLocalRest => {
     if(newLocalRest.name === favRestaurantTitle){
       newLocalRest.favorited = true;
     }
     return newLocalRest
   })
   setLocalRestaurants(newLocalRests)
 })
 shuffle(restaurants);
}

const getFavoriteRestaurants = async () => {
  const favRestaurants = await apiService.getFavoriteRestaurants(userId, location.lat, location.lng);
  setFavoriteRestaurants(favRestaurants);
}

const shuffle = (restaurant:Array<Restaurant>) => {
  let newRestaurantArray = [...restaurant]
  let currentIndex = newRestaurantArray.length,  randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [newRestaurantArray[currentIndex], newRestaurantArray[randomIndex]] = [
      newRestaurantArray[randomIndex], newRestaurantArray[currentIndex]];
  }
  setRestaurantsToPickOne(newRestaurantArray);
}

const handleAddToFavorites = async(userId:number, title:string) => {
  const added = await apiService.addToFavorites(userId, title);
  if(added) {
    const result = await apiService.updateFavoriteRestaurants(location.lat, location.lng, title);
    setFavoriteRestaurants([result, ...favoriteRestaurants]);
  }
}

const handleRemoveFromFavorites = async(userId:number, title:string) => {
  const {id} = await apiService.getFavoriteRestaurantId(title);
  const removed = await apiService.removeUserFromFavorites(userId, id);
  if(removed) {
    setFavoriteRestaurants(favoriteRestaurants.filter(restaurant => restaurant.name !==title));
  }
}

const handleAddOrRemoveFromFavorites = async (addToFavorites:boolean = true, userId:number, title:string) => {
  changeFavorited(localRestaurants, title, setLocalRestaurants)
  if (!addToFavorites) {
    handleAddToFavorites(userId, title)
  }else {
    handleRemoveFromFavorites(userId, title)
  }
}

const changeFavorited = (array:Array<Restaurant>, title:string, setter:React.Dispatch<React.SetStateAction<Array<Restaurant>>>) => {
  let newArray = [...array];
  newArray.map(newLocalRest => {
    if(newLocalRest.name === title){
      newLocalRest.favorited = !newLocalRest.favorited;
    }
    return newLocalRest
  })
  setter(newArray)
}

  return (
    <div className="container-fluid">
      <div className="background">
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
        <div className="cube"></div>
      <RegisterInput location = {location} setLocation = {setLocation} setUserId = {setUserId}/>
      <Navbar setLocation = {setLocation} favoriteRestaurants = {favoriteRestaurants}/>
      <Routes>
        <Route path="home" element={<Home userId = {userId} location = {location} restaurantsToPickOne = {restaurantsToPickOne}
         setRestaurantsToPickOne={setRestaurantsToPickOne} handleAddOrRemoveFromFavorites = {handleAddOrRemoveFromFavorites} />} />
        <Route path="localRestaurants" element={<LocalRestaurants localRestaurants = {localRestaurants}
         setLocalRestaurants = {setLocalRestaurants} location = {location} handleAddOrRemoveFromFavorites = {handleAddOrRemoveFromFavorites}
         userId = {userId} />} />
         <Route path="favoriteRestaurants" element = { favoriteRestaurants.length === 0  ? <Spinner /> : <FavoriteRestaurants localRestaurants = {favoriteRestaurants}
           handleAddOrRemoveFromFavorites = {handleAddOrRemoveFromFavorites}
         userId = {userId}/>} />
         <Route path='welcomePage' element = {<WelcomePage />} />
      </Routes>
      <Outlet />
      </div>
    </div>
  );
}

export default App;
