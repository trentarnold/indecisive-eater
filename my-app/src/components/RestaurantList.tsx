import React from 'react'
import Restauraunts from './Restaurants'
import {Restaurant} from '../restaurantType'
type Props = {
  localRestaurants: Array<Restaurant>,
  handleAddOrRemoveFromFavorites: (addToFavorites:boolean, userId:number, title:string) =>void,
  userId: number
}
const RestaurauntList: React.FC<Props> = ({localRestaurants, handleAddOrRemoveFromFavorites, userId }) => {
  return (
    <div className='restauraunt-list'>
      {localRestaurants.map((restaurant:any) => 
      <Restauraunts key = {restaurant.place_id}
       restaurant = {restaurant}
       handleAddOrRemoveFromFavorites = {handleAddOrRemoveFromFavorites}
       userId = {userId} />) }
    </div>
  )
}

export default RestaurauntList