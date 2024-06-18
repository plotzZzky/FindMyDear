'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import InputPwd from '@comps/inputs/inputPwd';
import InputEmail from '@comps/inputs/inputEmail';
import InputUser from '@comps/inputs/inputUser';
import InputAnswer from '@comps/inputs/inputAnswer';
import InputQuestion from '@comps/inputs/inputQuestion';
import { useAuth } from '@comps/authContext'

export default function Login() {
  const [Token, updateToken] = useAuth();
  const [getLogin, setLogin] = useState(true);
  const router = useRouter();

  const [getUsername, setUsername] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getpwd, setPwd] = useState("")
  const [getQuestion, setQuestion] = useState("");
  const [getAnswer, setAnswer] = useState("");

  //Validate
  const [UserValid, setUserValid] = useState(false);
  const [EmailValid, setEmailValid] = useState(false);
  const [Pwd1Valid, setPwd1Valid] = useState(false);
  const [Pwd2Valid, setPwd2Valid] = useState(false)
  const [QuestionValid, setQuestionValid] = useState(false)
  const [AnswerValid, setAnswerValid] = useState(false)

  function checkLogin() {
    if (Token !== null && typeof Token === 'string') {
      router.push("/peoples");
    }
  }

  function showLogin() {
    // Alterna entre a pagina de login e registro
    setLogin(getLogin? false:true)
  }

  function showRecovery() {
    // Redireciona para a pagina de recuperação de senha
    router.push('/login/recovery')
  }

  function checkIfLoginIsvalid() {
    // Verifica se os campos de login estão preenchidas com informações validas
    if (Pwd1Valid && UserValid) {
      loginFunc()
    } else {
      const tip = document.getElementById("loginTip")
      tip.innerText = "Prencha os dados de login"
    }
  }

  function loginFunc() {
    // Função para fazer login
    const url = `http://127.0.0.1:8000/users/login/`

    const formData = new FormData();
    formData.append("username", getUsername)
    formData.append("password", getPassword)
    const info = {
      method: 'POST',
      body: formData
    }

    fetch(url, info)
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          updateToken(data.token)
          router.push('/peoples')
        } else {
          const tip = document.getElementById("loginTip")
          tip.innerText = data.error
        }
      })
  }

  function checkIfSignIsValid() {
    // Verifica se os campos de cadastro estão preenchidas com informções validas
    if (UserValid && EmailValid && Pwd1Valid && Pwd2Valid && Pwd1Valid === Pwd2Valid) {
      SignUpFunc()
    } else {
      const tip = document.getElementById("signTip")
      tip.innerText = "Prencha os dados corretamente para se registar"
    }
  }

  function SignUpFunc() {
    // Função para registar um novo usuario
    const url = `http://127.0.0.1:8000/users/register/`

    const formData = new FormData();
    formData.append("username", getUsername);
    formData.append("email", getEmail);
    formData.append("password", getPassword);
    formData.append("pwd", getpwd);
    formData.append("question", getQuestion)
    formData.append("answer", getAnswer)

    const requestData = {
      method: 'POST', body: formData
    }

    fetch(url, requestData)
      .then((res) =>  res.json())
      .then((data) => {
        if (data.token) {
          updateToken(data.token)
          router.push('/peoples')
        } else {
          const tip = document.getElementById("signTip")
          tip.innerText = data.msg
        }
      })
  }

  const SIGNUPBTNS = () => {
    // Alter entre os btns e inputs necessarios para o login e signup para evitar duplicar codigo
    return getLogin? (
      <>
        <p id='loginTip'> </p>

        <button className='btn-login' onClick={checkIfLoginIsvalid}> Entrar </button>

        <p onClick={showLogin}> Cadastre-se </p>
      </>
    ):(
      <>
        <InputPwd password={setPwd} valid={Pwd2Valid} setValid={setPwd2Valid} placeholder="Comfirme a senha"></InputPwd>
        <InputEmail email={setEmail} valid={EmailValid} setValid={setEmailValid}></InputEmail>
        <InputQuestion question={setQuestion} valid={QuestionValid} setValid={setQuestionValid}></InputQuestion>
        <InputAnswer answer={setAnswer} valid={AnswerValid} setValid={setAnswerValid}></InputAnswer>

        <p id='loginTip'> </p>
      
        <button className='btn-login' onClick={checkIfSignIsValid}> Cadastrar </button>

        <p onClick={showLogin}> Entrar </p>
      </>
    )
  }

  useEffect(() => {
    checkLogin();
  }, [])

  return (
    <div className='page banner'>
      <div className="login-page">
        <div className="login-alert" id='loginAlert'>
          <span> Você precisa fazer login!</span>
        </div>

        <div className='login-div'>
          <h2> {getLogin? "Bem vindo de volta!" : "Junte se a nós!" }</h2>

            <InputUser username={setUsername} valid={UserValid} setValid={setUserValid}></InputUser>
            <InputPwd password={setPassword} valid={Pwd1Valid} setValid={setPwd1Valid} placeholder="Digite a senha"></InputPwd>

            {SIGNUPBTNS()}

          <p onClick={showRecovery}> Recuperar senha </p>

        </div>
      </div>
    </div>
  )
}