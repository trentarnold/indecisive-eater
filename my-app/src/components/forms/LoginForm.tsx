import {useState, useEffect} from 'react';
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
import { useDisclosure } from '@chakra-ui/hooks';
import { FaLock, FaUserAlt} from 'react-icons/fa';
import { Location } from '../../Location';


type Props = {
  openLogin: Boolean,
  setLocation: React.Dispatch<React.SetStateAction<Location>>
}

 const LoginForm: React.FC<Props> = ({openLogin, setLocation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if(openLogin){
      onOpen()}
  }, [openLogin]);
  
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { email, password };
    const res = await apiService.login(user);
    if (res.err) {
      alert(`${res.message}`);
      setEmail('');
      setPassword('');
    } else {
      const { accessToken, lat, lng } = res;
      setLocation({lat, lng});
      localStorage.setItem('accessToken', accessToken);
      onClose()
      // props.setIsAuthenticated(true);
    }

  }
  return (
    <Modal closeOnOverlayClick={false} closeOnEsc={false} isOpen={isOpen} onClose = {onClose} >
      <ModalOverlay />
      <ModalContent>
      <form onSubmit = {(e:React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
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
                    placeholder='Enter your email' 
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
            </ ModalBody>
            <ModalFooter>
              <Button className='btn colored' mr={3} type='submit' onClick={() => {
                  }}> Log in!</Button>
            </ModalFooter>
          </form>
        </ModalContent>
    </Modal>
  )
}

export default LoginForm
