import {useState} from 'react'
import { Button, Select, FormLabel, FormControl } from "@chakra-ui/react"
import apiService from '../../apiService'
// import Title from '../Title';
import { Restaurant } from '../../restaurantType'
type Props = {
  location: Location,
  home?:boolean,
  setLocalRestaurants: React.Dispatch<React.SetStateAction<Array<Restaurant>>>,
  isLoading:boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
}
type Location = {
  lat:String,
  lng:String
}

const FilterForm: React.FC<Props> = ({location,  home, setLocalRestaurants, isLoading, setIsLoading }) => {
const [dining, setDining] = useState('food');
const [price, setPrice] = useState('any');
const [distance, setDistance] = useState('8046');

const handleGroupSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true)
  const restaurants = await apiService.getLocalRestaurants(location.lat, location.lng, dining, price, distance);
  setLocalRestaurants(restaurants);
  setIsLoading(false)
}


// const handleIndividualSubmit = (e:React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   // getIndividualRestaurant();
// }
  return (
    <div className = {home ? 'form-holder small': 'form-holder'}>
      {/* <Title />  */}
    <form className='filter-form' onSubmit={(e:React.FormEvent<HTMLFormElement>) => { handleGroupSubmit(e) }}>
      <FormControl textAlign='center'>
        <FormLabel textAlign='center' fontSize='1.5rem'> Dining Location: </FormLabel>
        <Select 
          _hover= {{
           boxShadow:
           "0 0 1px 2px maroon, 0 1px 1px maroon"
          }} 
          _focus={{
            boxShadow:
            "0 0 1px 2px maroon, 0 1px 1px maroon", }}
          textAlign='center' 
          fontSize='1.2rem' 
          className='selector' 
          value={dining} 
          onChange={(e) => setDining(e.target.value)}> 
        <option className ='option' value='restaurant'> Dine in</option>
        <option className ='option' value='meal_takeaway'> Take out</option>
        <option className ='option' value='meal_delivery'> Delivery</option>
        <option className ='option' value='food'>Any</option>
      </Select>
      </FormControl>
      <FormControl >
      <FormLabel textAlign='center' fontSize='1.5rem'> Price per person :</FormLabel>
      <Select
        _hover= {{
          boxShadow:
          "0 0 1px 2px maroon, 0 1px 1px maroon"
          }} 
        _focus={{
          boxShadow:
          "0 0 1px 2px maroon, 0 1px 1px maroon", }}
         textAlign='center'
         fontSize='1.2rem'
         className = 'selector'
         value={price}
         onChange={(e) => setPrice(e.target.value)}> 
        <option className ='option' value='low'> $1 - $10</option>
        <option className ='option' value='low-medium'> $11 - 20</option>
        <option className ='option' value='medium'> $21 - $30</option>
        <option className ='option' value='high'> $31 - $40</option>
        <option className ='option' value='any'>Any</option>
      </Select>
      <FormLabel textAlign='center' fontSize='1.5rem'> Distance: </FormLabel>
      <Select
       _hover= {{
          boxShadow:
          "0 0 1px 2px maroon, 0 1px 1px maroon"
          }} 
       _focus={{
          boxShadow:
          "0 0 1px 2px maroon, 0 1px 1px maroon", }}
       textAlign='center'
       fontSize='1.2rem'
       className = 'selector' 
       value={distance} 
       onChange={(e) => setDistance(e.target.value)}> 
        <option className ='option' value='8046'> 5 miles</option>
        <option className ='option' value='16093'> 10 miles</option>
        <option className ='option' value='32186'> 20 miles</option>
      </Select>
      </FormControl>
      <Button textAlign='center' fontSize='1.2rem' className='btn colored' type='submit'>{home ? 'Apply filters' : 'Find local restaurants'}</Button>
    </form>
    </div>
  )
}

export default FilterForm
