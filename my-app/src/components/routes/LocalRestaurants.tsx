import {useState, useEffect} from 'react'
import Restaurants from '../Restaurants'
import RestaurantList from '../RestaurantList'
import FilterForm from '../forms/FilterForm'
import {Restaurant} from '../../restaurantType';
import { Location } from '../../Location';

type Props = {
  localRestaurants: Array<Restaurant>,
  location: Location,
  setLocalRestaurants: React.Dispatch<React.SetStateAction<Array<Restaurant>>>
}

const LocalRestaurants :React.FC<Props> = ({localRestaurants, location, setLocalRestaurants})=> {
  return (
    <div className='restaurant-search'>
      <RestaurantList localRestaurants = {localRestaurants}/>
      <FilterForm location = {location} setLocalRestaurants = {setLocalRestaurants}/>
    </div>
  )
}

export default LocalRestaurants
