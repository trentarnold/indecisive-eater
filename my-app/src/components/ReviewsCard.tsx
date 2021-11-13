import {useEffect, useState} from 'react'
import {Button, Flex} from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';
import { FaArrowRight} from 'react-icons/fa';
// import apiService from '../apiService';
type Props = {
  review: any,
  setIndex:React.Dispatch<React.SetStateAction<number>>,
  index: number
}
export const ReviewsCard :React.FC<Props> = ({review, setIndex, index}) => {
  // const [picture, setPicture] = useState('')
  // useEffect(() => {
  //   const picture = (review.profile_photo_url)
  //   setPicture(picture)
  // }, [review])
  // const getPicture = async () => {
  //   const pPicture = await 
  // }
  return (
    <div className="reviews-content-holder">
      <Flex>
          <StarRatings
                  rating={review.rating}
                  starDimension="20px"
                  starSpacing="3px"
                  starRatedColor='gold'
                />

      </Flex>
          <div className='reviews'>
            <div className='reviews-rating-profile'>
                <img src={review.profile_photo_url} alt="profile" style={{height: '15vh', width:'15vw'}}></img>
            </div>
            <div className='reviews-text-rating-holder'>
              <div className='reviews-text'>"{review.text}" - {review.author_name}  </div>
            </div>
            <Button style ={{backgroundColor:'transparent'}}> 
            <FaArrowRight size={70} style={{color:'lightgray', justifySelf:'flex-end'}}
             onClick = {() => {
               let newNumber = index + 1;
               setIndex(newNumber)}}/> </Button>
          </div>
    </div>
  )
}
