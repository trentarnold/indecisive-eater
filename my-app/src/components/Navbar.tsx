import { Button } from '@chakra-ui/button';
import React from 'react'
import { NavLink, } from "react-router-dom";
import {Location} from '../Location'
import { Restaurant } from '../restaurantType'
type Props = {
  setLocation: React.Dispatch<React.SetStateAction<Location>>,
  favoriteRestaurants: Array<Restaurant>,
}
const Navbar: React.FC<Props> = ({setLocation, favoriteRestaurants}) => {
  return (
    <>
      <nav className='navbar'>
        <NavLink className='enlarge-on-hover' style={({ isActive }) => ({  border: isActive ? '2px solid white': '', padding:'10px', borderRadius: isActive ? '1rem': '',})} to="/welcomePage">Home</NavLink> 
        <NavLink className='enlarge-on-hover' style={({ isActive }) => ({  border: isActive ? '2px solid white': '', padding:'10px', borderRadius: isActive ? '1rem': '',})} to="/home">Decide For Me!</NavLink> 
        <NavLink className='enlarge-on-hover' style={({ isActive }) => ({ border: isActive ? '2px solid white': '', padding:'10px', borderRadius: isActive ? '1rem': '' })}  to="/localRestaurants">Local Restaurants</NavLink>
        <NavLink className='enlarge-on-hover' style={({ isActive }) => ({ border: isActive ? '2px solid white': '', padding:'10px', borderRadius: isActive ? '1rem': ''})}  to='/favoriteRestaurants'>Favorite Restaurants({favoriteRestaurants.length})</NavLink>
        <Button className='enlarge-on-hover' style={{backgroundColor:'transparent', fontStyle:'italic'}} onClick={() => setLocation({lat:'', lng:''})}>Logout</Button>
      </nav>
    </>
  )
}

export default Navbar


