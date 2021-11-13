import React from 'react'
import Restauraunts from './Restaurants'
import {Restaurant} from '../restaurantType'
type Props = {
  localRestaurants: Array<Restaurant>
}
const RestaurauntList: React.FC<Props> = ({localRestaurants}) => {
  return (
    <div className='restauraunt-list'>
      {localRestaurants.map((restaurant:any) => <Restauraunts key = {restaurant.place_id} restaurant = {restaurant}/>) }
    </div>
  )
}

export default RestaurauntList