import {SetStateAction, useState} from 'react'
import InputForm from './forms/InputForm';
import LoginForm from './forms/LoginForm';
import { Location } from '../Location'
type Props = {
  setLocation: React.Dispatch<React.SetStateAction<Location>>,
}
const RegisterInput: React.FC<Props> = ({setLocation}) => {
  const [openLogin, setOpenLogin]= useState(false);

  return (
    <div>
      {openLogin ? <LoginForm openLogin = {openLogin} setLocation = {setLocation}/> 
      : <InputForm setOpenLogin = {setOpenLogin} openLogin = {openLogin} setLocation = {setLocation} />}
    </div>
  )
}

export default RegisterInput
