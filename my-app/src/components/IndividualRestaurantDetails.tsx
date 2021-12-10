import {useEffect, useState} from 'react'
import StarRatings from 'react-star-ratings'
import { FaDollarSign } from 'react-icons/fa';
import { Button } from '@chakra-ui/button';
import { Restaurant } from '../restaurantType';
import { ReviewsCard } from './ReviewsCard';
import apiService from '../apiService'
import {FaPhone, FaHome} from 'react-icons/fa';
import ImageCarousel from './ImageCarousel'
type Props = {
  restaurant:any,
  pickNextRestaurant: (restaurant:Array<Restaurant>) =>void,
  restaurantsToPickOne: Array<Restaurant>,
}

type individualRestaurantDetails = {
  types: Array<string>,
  reviews: Array<reviews>,
  website: string,
  vicinity: string,
  formatted_phone_number:string,
  photos:any,
  opening_hours:any
}

type reviews ={
  text:string
}

const initialValue:individualRestaurantDetails = {
  types: ['bar'],
  reviews: [{text:'good'}],
  website: 'website',
  vicinity: 'address',
  formatted_phone_number:'123',
  photos: 'This is a photo',
  opening_hours:'asdf'
}

const IndividualRestaurantDetails:React.FC<Props>  = ({restaurant, pickNextRestaurant, restaurantsToPickOne}) =>{
  const [individualRestaurant, setIndividualRestaurant] = useState(initialValue);
  const [index, setIndex] = useState(0);
  const [closesAt, setClosesAt] = useState('');
  const [images, setImages] = useState([]);
   const getRestaurant = async () => {
      const result = await apiService.getIndividualRestaurant(restaurant.place_id);
      getClosingTime(result.opening_hours.weekday_text)
      const imageReferences = result.photos.map((photo:any) => photo.photo_reference)
      setImages(imageReferences);
      setIndividualRestaurant(result);
   }

  useEffect(() => {
    if(restaurant.place_id) {
      console.log('rest', restaurant)
      getRestaurant()
    }
  }, [restaurant])

  useEffect(() => {
    if(index >= individualRestaurant.reviews.length -1){
      setIndex(0);
    }
  }, [index, individualRestaurant.reviews.length])

  const showPrice = ( numberOfDollarSigns:number ) => {
    var rows = [];
    for (var i = 0; i < numberOfDollarSigns; i++) {
        rows.push(<FaDollarSign key={i} />);
    }
    return <div style = {{color:'gray', display:'flex', marginLeft:'5px'}}> {rows.map((row, ind) => <div key={ind}> {row} </div>)} </div>;
  }
  const capitalizeFirstLetterAndRemoveUnderScore = (string:string):string => {
    string = string.charAt(0).toUpperCase() + string.slice(1);
    string = string.replace(/_/g, ' ');
    return string
  }

  const getClosingTime = (array:any) => {
    const today = new Date();
    let day = today.getDay();
    if (day === 0) {
      day =6
    }
    day = day - 1;
    let closingTime = array[day];
    closingTime = closingTime.split('–')[1]
    setClosesAt(closingTime);
  }

  return (
    <>
 {!individualRestaurant ? <div>'Hit the button to see rests</div> : 
  <div className='restaurant-mini-details'>
    <div> 
      <div className='title-banner'>
      <div className='restaurant-mini-details-title'> {restaurant.name} </div>
    </div>
    <ReviewsCard review = {individualRestaurant.reviews[index]} setIndex = {setIndex} index = {index}/>
      <div className='restaurant-type'> {individualRestaurant.types.map((type, index) =>{
         return <div key = {index}>{index > 4 ? '' : capitalizeFirstLetterAndRemoveUnderScore(type)  }</div>} 
      )}
    </div>
    </div>
    <div className='restaurant-details-content-holder'>
      <div className='user-ratings'>
        <div className='price-rating-restaurant'>
          <div style={
             {display:'flex',
             alignItems:'center' }}>
               Price: 
            { restaurant.price_level  ? showPrice(restaurant.price_level) : <p style ={{color: 'lightgray'}}>Not Given</p>}
          </div>
          <div className='margin-top'>Closes at {closesAt}</div>
          <div className='margin-top'> Rating: <StarRatings
        rating={restaurant.rating}
        starDimension="20px"
        starSpacing="1px"
        starRatedColor='gold' />
        </div>
      </div>
      </div>
      <div className='restaurant-advanced-details'>
        <div className='Website'>
             <a href= {individualRestaurant.website} className='restaurant-details-website'> Website</a>
        </div>
        <div className='formatted-address margin-top'>
          <div style ={{display:'flex', alignItems:'center'}}><FaHome style={{marginRight:'10px'}} />{individualRestaurant.vicinity}</div>
        </div>
        <div>
          <div className='phone-number margin-top' style ={{display:'flex', alignItems:'center'}}>
           <FaPhone style={{marginRight:'10px'}}/> {individualRestaurant.formatted_phone_number}
          </div>
        </div>
      </div>
    </div>
      <ImageCarousel images = {images}/>
      {/* <img src={imageSrc} style ={{height:'200px', width:'200px'}}alt='restaurant' /> */}
      {/* <ImageCard photos = {} /> */}
    <Button className='colored btn' onClick = {(e) =>pickNextRestaurant(restaurantsToPickOne)}> Roll Again </Button>
  </div>}
  </>
  )
}



  // const getIndividualRestaurant = (restaurantId:string) => {
  //   console.log('fetching individual restaurant')
  //   fetch(`http://localhost:3001/restaurantDetails/${restaurantId}`)
  //   .then(data => data.json())
  //   .then(data => setIndividualRestaurant(data.result))
  // }
  // const getRestaurants = async () => {
  //   let restaurants = await apiService.getLocalRestaurants(location.lat, location.lng, 'food', 'any', '8046');
  //   setLocalRestaurants(restaurants);
  //   shuffle(restaurants);
  //  }

export default IndividualRestaurantDetails
