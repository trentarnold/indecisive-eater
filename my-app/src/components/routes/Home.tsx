import {useState, useEffect} from 'react'
import IndividualRestaurantDetails from '../IndividualRestaurantDetails'
import {Button} from '@chakra-ui/react'
import {Restaurant} from '../../restaurantType'

type Location = {
  lat:String,
  lng:String
}
type Props = {
  location: Location,
  restaurantsToPickOne:Array<Restaurant>,
  setRestaurantsToPickOne:React.Dispatch<React.SetStateAction<Array<Restaurant>>>
}

const Home:React.FC<Props> = ({location, restaurantsToPickOne, setRestaurantsToPickOne}) => {
  // const [randomizedRestaurants, setRandomizedRestaurants] = useState([]);
     const [pickedRestaurant, setPickedRestaurant] = useState({})
  console.log(pickedRestaurant);
   const pickNextRestaurant = (restaurantArray:Array<Restaurant>):void => {
      let newRestaurantArray = [...restaurantArray];
      const newRestaurant:any = newRestaurantArray.pop();
      setRestaurantsToPickOne(newRestaurantArray);
      setPickedRestaurant(newRestaurant)
   }
  return (
    <div className='restaurant-search'>
    <IndividualRestaurantDetails  restaurant = {pickedRestaurant} pickNextRestaurant = {pickNextRestaurant}
     restaurantsToPickOne ={restaurantsToPickOne}/>
    {/* <FilterForm home={true} getIndividualRestaurant = {getIndividualRestaurant} restaurant = {individualRestaurant}/> */}
  </div>
  )
}

//    <div>
      
{/* <Button onClick = {() => pickNextRestaurant(restaurantsToPickOne)}>
Click me
</Button>
</div> */}
export default Home
