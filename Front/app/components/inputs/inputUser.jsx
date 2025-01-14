import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'


export default function InputUser(props) {

  function updateTipLoginPassword() {
    const tip = document.getElementById('loginTip')
    tip.innerText = "Seu nome deve ter ao menos 3 digitos"
  }

  const validateUser = (event) => {
    const value = event.target.value;
    if (value.length > 3) {
      props.setValid(true)
      props.action? props.action(value) : null;
    } else {
      props.setValid(false)
    }
    props.username(value)
  }

  const ICON = () => {
    return props.valid ?
    <FontAwesomeIcon icon={faCheck} className='icon-input-validate' />
    : <FontAwesomeIcon icon={faX} className='icon-input' />
  }

  useEffect(() => {
    const fakeEvent = { target: { value: props.value || '' } };
    validateUser(fakeEvent)
  }, [props.value])


  return (
    <div className='div-input'>
      <input
        className='text-input' type='text' name='username' placeholder='Digite o nome do usuario' min={2}
        onChange={validateUser} onFocus={updateTipLoginPassword} value={props.value}>
      </input>

      <span className='input-div-icon'>
        {ICON()}
      </span>
    </div>
  )
}