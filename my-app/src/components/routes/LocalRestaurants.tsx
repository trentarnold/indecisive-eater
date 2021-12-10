import { useState } from 'react'
import RestaurantList from '../RestaurantList'
import FilterForm from '../forms/FilterForm'
import {Restaurant} from '../../restaurantType';
import { Location } from '../../Location';
import Spinner from '../Spinner';

type Props = {
  localRestaurants: Array<Restaurant>,
  location: Location,
  setLocalRestaurants: React.Dispatch<React.SetStateAction<Array<Restaurant>>>,
  handleAddOrRemoveFromFavorites: (addToFavorites:boolean, userId:number, title:string) =>void,
  userId:number
}

const LocalRestaurants :React.FC<Props> = ({localRestaurants, location, setLocalRestaurants, handleAddOrRemoveFromFavorites, userId})=> {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading ?
       <div className='restaurant-search'>
         <Spinner/>  
          <FilterForm location = {location} setLocalRestaurants = {setLocalRestaurants} isLoading ={isLoading} setIsLoading ={setIsLoading}/>
       </div>: 
       <div className='restaurant-search'>
      <RestaurantList localRestaurants = {localRestaurants} handleAddOrRemoveFromFavorites = {handleAddOrRemoveFromFavorites}
       userId = {userId}  /> 
      <FilterForm location = {location} setLocalRestaurants = {setLocalRestaurants} isLoading ={isLoading} setIsLoading ={setIsLoading}/>
      </div>}
    </>
  )
}

export default LocalRestaurants
