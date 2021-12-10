import React from 'react'
import {Button} from '@chakra-ui/react'
import {  useNavigate } from "react-router-dom";
const WelcomePage = () => {
  let navigate = useNavigate();
  return (
    <div className='welcome-container'>
        <div className='welcome-title'>Welcome!</div>
        <div className='welcome-content'>Welcome to Indecisive Eater, an app for people who like food but don't like making decisions!
        Click on Decide For Me! to get a random restaurant. Have fun never having to decide again!</div>
        <div className='welcome-button-holder'>
          <Button 
          _focus ={{
            boxShadow:
            "0 0 1px 2px white, 0 1px 1px white",}}
       style={{backgroundColor:'transparent', marginTop:'20px', fontSize:'2rem'}} 
       className='btn welcome-button' onClick={() => navigate('/home')} >Decide For Me!</Button>
          <Button 
          _focus ={{
         boxShadow:
         "0 0 1px 2px white, 0 1px 1px white",}}
       style={{backgroundColor:'transparent', marginTop:'20px', fontSize:'2rem'}}
       className='btn welcome-button' onClick={() => navigate('/favoriteRestaurants')}>My Favorites</Button>
          <Button 
          _focus ={{
            boxShadow:
            "0 0 1px 2px white, 0 1px 1px white",}}
          style={{backgroundColor:'transparent', marginTop:'20px', fontSize:'2rem'}}
           className='btn welcome-button' onClick={() => navigate('/localRestaurants')}>Restaurants Near Me!</Button>
        </div>
    </div>
  )
}

export default WelcomePage
