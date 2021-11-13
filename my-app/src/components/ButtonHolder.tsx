import {Button} from '@chakra-ui/react'
type Props ={
  onOpen: any;
}
const ButtonHolder: React.FC<Props>  = ( {onOpen}) => {
  return (
  <div className='button-holder'>
    <Button colorScheme="red" className='btn colored'>Blacklist</Button>
    <Button className='btn link' onClick={() => onOpen()}> More Details </Button>
    <Button className='btn colored'>Favorite</Button>
  </div>
  )
}

export default ButtonHolder
