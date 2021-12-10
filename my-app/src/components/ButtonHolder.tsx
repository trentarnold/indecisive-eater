import {Button} from '@chakra-ui/react'
type Props ={
  onOpen: any,
  handleAddOrRemoveFromFavorites: (addToFavorites:boolean, userId:number, title:string) =>void,
  title: string,
  userId: number,
  favorited:boolean
}
const ButtonHolder: React.FC<Props>  = ( {onOpen, handleAddOrRemoveFromFavorites, userId, title, favorited}) => {
  return (
  <div className='button-holder'>
    <Button className='btn link' onClick={() => onOpen()}> More Details </Button>
    <Button className='btn colored' onClick ={() => handleAddOrRemoveFromFavorites(favorited, userId, title)}>
      {favorited ? "Unfavorite" : "Favorite"}</Button>
  </div>
  )
}

export default ButtonHolder
