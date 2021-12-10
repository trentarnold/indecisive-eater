import React from 'react'
type Props = {
  images:Array<any>
}
const ImageCarousel:React.FC<Props> = ({images}) => {
  return (
    <div className="image-container">
      {images.map((image, index) => {
        const apiKey =`${process.env.REACT_APP_API_KEY}`;
        const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${image}&key=${apiKey}`;
     return <img className='individual-image' key={index} src={url} alt='restaurant' /> 
      })}
    </div>
  )
}

export default ImageCarousel
