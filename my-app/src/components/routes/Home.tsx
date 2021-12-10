import {useState, useEffect} from 'react'
import IndividualRestaurantDetails from '../IndividualRestaurantDetails'
import {Restaurant} from '../../restaurantType'
import WelcomePage from '../WelcomePage'
import FilterForm from '../forms/FilterForm'
import RestaurauntList from '../RestaurantList'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  ModalCloseButton
 } from '@chakra-ui/react'
 import { useDisclosure } from '@chakra-ui/hooks';
type Location = {
  lat:String,
  lng:String
}
type Props = {
  location: Location,
  restaurantsToPickOne:Array<Restaurant>,
  setRestaurantsToPickOne:React.Dispatch<React.SetStateAction<Array<Restaurant>>>,
  handleAddOrRemoveFromFavorites: (addToFavorites:boolean, userId:number, title:string) =>void,
  userId: number,
}

const Home:React.FC<Props> = ({location, restaurantsToPickOne, setRestaurantsToPickOne, handleAddOrRemoveFromFavorites, userId}) => {
   const [pickedRestaurant, setPickedRestaurant] = useState({})
   const [isLoading, setIsLoading] = useState(false);
   const { isOpen, onOpen, onClose } = useDisclosure()
   useEffect(() => {
     if(!pickedRestaurant.hasOwnProperty("place_id") && restaurantsToPickOne.length > 1){
      pickNextRestaurant(restaurantsToPickOne)
     }
   },[pickedRestaurant, restaurantsToPickOne])

   const pickNextRestaurant = (restaurantArray:Array<Restaurant>):void => {
      let newRestaurantArray = [...restaurantArray];
      const newRestaurant:any = newRestaurantArray.shift();
      newRestaurantArray.push(newRestaurant)
      setRestaurantsToPickOne(newRestaurantArray);
      setPickedRestaurant(newRestaurant)
   }

  return (
    <div className='restaurant-search'>
      {pickedRestaurant ? 
       <IndividualRestaurantDetails 
          restaurant = {pickedRestaurant} pickNextRestaurant = {pickNextRestaurant}
          restaurantsToPickOne ={restaurantsToPickOne} /> 
        :<div> There are no restaurants  within those filters</div>
        }
        <div style={{display:'flex', flexDirection:'column', height:'15vh'}}>
       <FilterForm location = {location} setLocalRestaurants = {setRestaurantsToPickOne} isLoading = {isLoading} setIsLoading = {setIsLoading} home ={true}/>
       <Button style={{marginTop:'10px', color:'white', backgroundColor:'transparent'}} onClick= {() => onOpen()}>View Available Restaurants</Button>
       </div>
       <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
          <ModalContent maxW="fit-content" style={{backgroundColor:'transparent'}}>
            <ModalBody padding='0' >
              <ModalCloseButton />
              < RestaurauntList localRestaurants = {restaurantsToPickOne}
               userId={userId} handleAddOrRemoveFromFavorites={handleAddOrRemoveFromFavorites}/>
              {/* <Button onClick={() => onClose}>Close</Button> */}
            </ModalBody>
          </ModalContent>
      </Modal>
  </div>
  )
}

export default Home
