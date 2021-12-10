import ButtonHolder from './ButtonHolder';
import StarRatings from 'react-star-ratings';
import {FaDollarSign} from 'react-icons/fa';
import {Restaurant} from '../restaurantType'
import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  ModalCloseButton
 } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks';
import IndividualRestaurantModal from './IndividualRestaurantModal';
import { on } from 'cluster';
type Props = {
  restaurant: Restaurant,
  handleAddOrRemoveFromFavorites: (addToFavorites:boolean, userId:number, title:string) =>void,
  userId: number
}

const Restauraunts: React.FC<Props>  = ({restaurant, handleAddOrRemoveFromFavorites, userId}) => {
  const [imageSrc, setImageSrc] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if(!restaurant) return
    const apiKey =`${process.env.REACT_APP_API_KEY}`;
    const imageReference = restaurant.photos[0].photo_reference;
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=200&photo_reference=${imageReference}&key=${apiKey}`;
    setImageSrc(url);
  }, [restaurant])

  const showPrice = ( numberOfDollarSigns:number ) => {
    var rows = [];
    for (var i = 0; i < numberOfDollarSigns; i++) {
        rows.push(<FaDollarSign key={i} />);
    }
    return <div style = {{color:'gray', display:'flex', marginLeft:'5px'}}> {rows.map((row, ind) => <div key={ind}> {row} </div>)} </div>;
  }

  return (
    <div className='restaurant-mini-details'>
      <div> 
        <div className='title-banner'>
        <div className='restaurant-mini-details-title'>{restaurant.name} </div>
      </div>
      </div>
      <div className='content-holder'>
          <img src={imageSrc} className='restaurant-list-image' alt='restauraunt front' style ={{height:'200px', width:'200px'}}></img>
          <div className='restaurant-location'>
             <p className='restaurant-vicinity'>{restaurant.vicinity} </p>
          </div>
          <div className='price-rating-restaurant'>
          <div style={ {display:'flex',
                        alignItems:'center'} }> Price: { restaurant.price_level  ? 
                        showPrice(restaurant.price_level) : <p style ={{color:'lightgray'}}> Not Defined</p>}</div>
          <div>Rating: <StarRatings
                       rating={restaurant.rating}
                       starDimension="25px"
                       starSpacing="3px"
                       starRatedColor='gold'
      />  ({restaurant.user_ratings_total})</div>
        </div>
      </div>
      <ButtonHolder onOpen = {onOpen} handleAddOrRemoveFromFavorites = {handleAddOrRemoveFromFavorites}
       title = {restaurant.name} userId = {userId} favorited = {restaurant.favorited} />
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
          <ModalContent maxW="fit-content" style={{backgroundColor:'transparent'}}>
            <ModalBody padding='0' >
              <ModalCloseButton className='link btn'/>
              < IndividualRestaurantModal restaurant = {restaurant} />
              {/* <Button onClick={() => onClose}>Close</Button> */}
            </ModalBody>
          </ModalContent>
      </Modal>
    </div>
  )
}
  //   <img src={restauraunt.icon} style = {{
  // backgroundColor:`transparent`,
  // color:'black',
  // height:'30px'
  // }} alt="icon"></img>
  //   const [image, setImage] = useState('');
  // const [text, setText] = useState('');
  // const imageRef = useRef(null);




  // useEffect(() => {
  // fetch('http://localhost:3001/image')
  //   .then(data => data.blob())
  //   .then(myBlob => {
  //     const objectURL = URL.createObjectURL(myBlob);
  //     console.log(objectURL)
  //     setImage(objectURL);
  //     imageRef.current.src = objectURL;
  //     setText('ready');
  //   })
//}, [])

export default Restauraunts
