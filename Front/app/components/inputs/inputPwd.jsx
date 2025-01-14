import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCheck, faEye, faEyeSlash, faEyeDropper, faEyeLowVision } from '@fortawesome/free-solid-svg-icons'


export default function InputPwd(props) {
  const [pwdVisible, setPwdVisible] = useState(false)

  function updateTipLoginPassword() {
    const tip = document.getElementById('loginTip')
    tip.innerText = "A senha precisa de letras, numeros e ao menos 8 digitos"
  }

  function changePwdVisibility() {
    setPwdVisible(pwdVisible? false : true)
  }

  const validatePwd = (event) => {
    const value = event.target.value;
    if (validatePassword(value)) {
      props.setValid(true)
    } else {
      props.setValid(false)
    }
    props.password(value)
  }

  // Checka se senha e valida
  function validatePassword(password) {
    return password.length >= 8 && findChar(password);
  }
  
  // Verifica se na senha tem ao menos uma letra ou numero
  function findChar(text) {
    const char = [...text].some((char) => /[a-zA-Z]/.test(char));
    const digit = [...text].some((char) => /\d/.test(char));
    return char && digit;
  }

  const EYESICON = () => {
    return pwdVisible? 
    <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
    : <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
  }

  const ICON = () => {
    return props.valid ?
    <FontAwesomeIcon icon={faCheck} className='icon-input-validate' />
    : <FontAwesomeIcon icon={faX} className='icon-input' />
  }

  return (
    <div className='div-input'>
      <input
        className='text-input' type={pwdVisible? 'text': 'password'} name='password' 
        placeholder={props.placeholder} min={8} onChange={validatePwd} onFocus={updateTipLoginPassword} >
      </input>

      <div className='pwd-visible' onClick={changePwdVisibility}>
        {EYESICON()}
      </div>

      <div className='input-div-icon'>
        {ICON()}
      </div>
    </div>
  )
}