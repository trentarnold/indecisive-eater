import React from 'react';
import { useEffect, useState } from 'react';
import {Restaurant} from '../restaurantType'
import RestaurauntList from './RestaurantList';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  ModalCloseButton,
 } from '@chakra-ui/react'
 import { useDisclosure } from '@chakra-ui/hooks';
import IndividualRestaurantDetails from './IndividualRestaurantDetails';
type Props = {
  localRestaurants: Array<Restaurant>,
  handleAddOrRemoveFromFavorites: (addToFavorites:boolean, userId:number, title:string) =>void,
  userId: number
}

const FavoriteRestaurants: React.FC<Props> = ({localRestaurants, handleAddOrRemoveFromFavorites, userId }) => {
  const [randomFavorites, setRandomFavorites] = useState(localRestaurants);
  const [pickedRestaurant, setPickedRestaurant] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() =>{
    shuffle(localRestaurants)
  }, [localRestaurants])

  const handleRandomize = (restaurantArray:Array<Restaurant>) => {
    let newRestaurantArray = [...restaurantArray];
    const newRestaurant:any = newRestaurantArray.shift();
    newRestaurantArray.push(newRestaurant)
    setRandomFavorites(newRestaurantArray);
    setPickedRestaurant(newRestaurant)
    onOpen()
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
    setRandomFavorites(newRestaurantArray);
  }
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <Button 
        _focus ={{
         boxShadow:
         "0 0 1px 2px white, 0 1px 1px white",}}
       style={{backgroundColor:'transparent', marginTop:'20px'}}
       className='btn welcome-button'
       onClick = {() => handleRandomize(randomFavorites)}
        >Pick Random From Favorites</Button>
      <RestaurauntList localRestaurants = {localRestaurants}
       handleAddOrRemoveFromFavorites = {handleAddOrRemoveFromFavorites} userId = {userId}/>
       <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
          <ModalContent maxW="fit-content" style={{backgroundColor:'transparent'}}>
            <ModalBody padding='0' >
              <ModalCloseButton className='link btn'/>
              < IndividualRestaurantDetails restaurant = {pickedRestaurant} pickNextRestaurant={handleRandomize} restaurantsToPickOne = {randomFavorites} />
            </ModalBody>
          </ModalContent>
      </Modal>
    </div>
  )
}

export default FavoriteRestaurants
