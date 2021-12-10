import { useState, useEffect } from 'react'
import apiService from '../../apiService';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormLabel,
  FormControl,
  Avatar,
  InputLeftElement,
  InputGroup,
  Flex,
  Input } from '@chakra-ui/react'
import { useDisclosure, useUpdateEffect } from '@chakra-ui/hooks';
import {FaRoad, FaHome, FaMap, FaLock, FaUserAlt} from 'react-icons/fa';
import { Location } from '../../Location'
import {  useNavigate } from "react-router-dom";


type Props = {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setLocation: React.Dispatch<React.SetStateAction<Location>>,
  openLogin: boolean,
  setUserId: React.Dispatch<React.SetStateAction<number>>,
  location: Location
}


const InputForm: React.FC<Props> = ({setOpenLogin, openLogin, setLocation, setUserId, location}) => {
  let navigate = useNavigate();
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [openOtherModule, setOpenOtherModule] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(location, 'location2')
  console.log('hello')
  useEffect(() => {
    onOpen()
  }, []);


  useEffect(() => {
    if(location.lat === '' && location.lng=== ''){
      console.log('no location!');
      setOpenLogin(false);
      onOpen()
    }
  }, [location, onOpen])


  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //returns lat and lng
    const location:any = await apiService.getLocation(street, city, state);
    console.log(location);
    //saves user to database with lat and lng
   const res = await apiService.postUser({lat:location.lat, lng:location.lng, email, password});
   if (res.error) {
    alert(`${res.message}`);
  } else {
    const { accessToken, lat, lng, id } = res;
    console.log(lat, lng)
    setLocation({lat, lng});
    setUserId(id)
    localStorage.setItem('accessToken', accessToken);
    onClose();
    navigate('/welcomePage')
    //props.setIsAuthenticated(true);
    // auth.login(() => props.history.push('/profile'));
  }
    setState('');
    setCity('');
    setStreet('');
    setEmail('');
    setPassword('');
  }
  return (
    <Modal closeOnOverlayClick={false} closeOnEsc={false} isOpen={isOpen} onClose={onClose} isCentered >
       <ModalOverlay />
       <Flex flexDirection='column' justifyContent='center' alignItems='center'>
         <ModalContent >
           <ModalHeader className='modal-header'>
              <Avatar bg='red.1000'/>
              <div> Create your account </div>
          </ModalHeader >
          <form onSubmit = {(e) => handleSubmit(e)}> 
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel forhtml='email-address'>Email Address  </FormLabel>
                <InputGroup>
                  <InputLeftElement
                      pointerEvents="none"
                      children={<FaUserAlt color="gray.300" />}
                    />
                  <Input 
                    autoFocus
                    _focus={{
                    boxShadow: "0 0 1px 2px maroon, 0 1px 1px maroon", }} 
                    errorBorderColor="red.300"  
                    name='email-address' 
                    placeholder='Enter your email address' 
                    value = {email} 
                    onChange = {(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}>
                  </Input>
                </InputGroup> 
              </FormControl>
              <FormControl isRequired>
                <FormLabel forhtml='password'>Password </FormLabel>
                <InputGroup>
                  <InputLeftElement
                      pointerEvents="none"
                      children={<FaLock color="gray.300" />}
                    />
                  <Input 
                    autoFocus
                    _focus={{
                    boxShadow: "0 0 1px 2px maroon, 0 1px 1px maroon", }} 
                    errorBorderColor="red.300"  
                    name='password' 
                    placeholder='Enter your password' 
                    value = {password} 
                    onChange = {(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}>
                  </Input>
                </InputGroup> 
              </FormControl>
              <FormControl isRequired>
                <FormLabel forhtml='address'>Street Address  </FormLabel>
                <InputGroup>
                  <InputLeftElement
                      pointerEvents="none"
                      children={<FaRoad color="gray.300" />}
                    />
                  <Input 
                    autoFocus
                    _focus={{
                    boxShadow: "0 0 1px 2px maroon, 0 1px 1px maroon", }} 
                    errorBorderColor="red.300"  
                    name='address' 
                    placeholder='Enter a street' 
                    value = {street} 
                    onChange = {(e:React.ChangeEvent<HTMLInputElement>) => setStreet(e.target.value)}>
                  </Input>
                </InputGroup> 
              </FormControl>
              <FormControl isRequired> 
                <FormLabel forhtml='city'>City</FormLabel>
                <InputGroup>
                  <InputLeftElement
                     pointerEvents="none"
                     children={<FaHome color="gray.300" />}
                  />
                  <Input
                    _focus={{
                    boxShadow: "0 0 1px 2px maroon, 0 1px 1px maroon", }} 
                    name='city' 
                    placeholder='Enter a city' 
                    value={city} 
                    onChange = {(e:React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}>
                  </Input>
                </InputGroup>
               </FormControl>
               <FormControl isRequired> 
                <FormLabel forhtml='State'>State</FormLabel>
                <InputGroup>
                  <InputLeftElement
                      pointerEvents="none"
                      children={<FaMap color="gray.300" />}
                    />
                  <Input
                    _focus={{
                    boxShadow: "0 0 1px 2px maroon, 0 1px 1px maroon", }} 
                    name='State' 
                    placeholder='Enter state initials' 
                    value={state} 
                    onChange = {(e:React.ChangeEvent<HTMLInputElement>) => setState(e.target.value)}>
                  </Input>
                </InputGroup>
               </FormControl>
            </ModalBody>
            <ModalFooter>
                <div className='modal-footer'>
                  <div className='modal-member'> 
                    <div> Already a member ? </div>
                    <Button className='btn link' onClick={() =>{
                      setOpenLogin(!openLogin)
                      onClose()
                      }}>log in </Button>
                  </div>
                 <Button className='btn colored' mr={3} type='submit' onClick={() => {

                  }} >
                   Save
                 </Button>
                </div>
            </ModalFooter>
          </form>
        </ModalContent>
      </Flex>
    </Modal>
  )
}
export default InputForm