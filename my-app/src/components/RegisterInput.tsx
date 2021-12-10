import { useState, useEffect} from 'react'
import InputForm from './forms/InputForm';
import LoginForm from './forms/LoginForm';
import { Location } from '../Location';
import {  useNavigate } from "react-router-dom";
type Props = {
  setLocation: React.Dispatch<React.SetStateAction<Location>>,
  setUserId: React.Dispatch<React.SetStateAction<number>>,
  location: Location,
}
const RegisterInput: React.FC<Props> = ({setLocation, setUserId, location}) => {
  const [openLogin, setOpenLogin]= useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    if(!location.lat) {
      setOpenLogin(false)
      navigate('/welcomePage')
    }
  }, [location])
  return (
    <div>
      {openLogin ? <LoginForm openLogin = {openLogin} setLocation = {setLocation}  setUserId = {setUserId}/> 
      : <InputForm  location = {location} setOpenLogin = {setOpenLogin} openLogin = {openLogin} setLocation = {setLocation} setUserId = {setUserId} />}
    </div>
  )
}

export default RegisterInput
