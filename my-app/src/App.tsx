
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


const initialLocation :Location = {
  lat: '',
  lng: ''
}
const initialRestaurantState: Array<Restaurant> = [{
  business_status: 'string',
  geometry: 'any',
  icon: 'string',
  icon_background_color: 'string',
  icon_mask_base_uri: 'string',
  name: 'string',
  opening_hours: 'any',
  photos: 'any',
  place_id: 'string',
  plus_code: 'any',
  rating: 4, 
  reference: 'string',
  scope: 'string',
  types: ['asdf'],
  user_ratings_total: 123,
  vicinity: 'string',
  price_level: 2
}]
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState('false');
  const [location, setLocation] = useState(initialLocation);
  const [localRestaurants, setLocalRestaurants] = useState(initialRestaurantState);
  const [restaurantsToPickOne, setRestaurantsToPickOne] = useState(initialRestaurantState)
  useEffect(() => {
    if(!location.lat){
      console.log('no location')
      return
    }
    getRestaurants();
  }, [location])

const getRestaurants = async () => {
 let restaurants = await apiService.getLocalRestaurants(location.lat, location.lng, 'food', 'any', '8046');
 setLocalRestaurants(restaurants);
 shuffle(restaurants);
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
  return (
    <div >
      <RegisterInput setLocation = {setLocation} />
      <Navbar />
      <Routes>
        <Route path="home" element={<Home location = {location} restaurantsToPickOne = {restaurantsToPickOne} setRestaurantsToPickOne={setRestaurantsToPickOne}/>} />
        <Route path="localRestaurants" element={<LocalRestaurants localRestaurants = {localRestaurants} setLocalRestaurants = {setLocalRestaurants} location = {location}/>} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default App;
