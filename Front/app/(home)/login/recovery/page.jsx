'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputPwd from '@comps/inputs/inputPwd';
import InputUser from '@comps/inputs/inputUser';
import InputAnswer from '@comps/inputs/inputAnswer';


export default function Login() {
  const [getVisibility, setVisibility] = useState(false)
  const router = useRouter();

  const [question, setQuestion] = useState("Digite o nome do usario para aparecer sua pergunta")
  const [getAnswer, setAnswer] = useState("");
  const [getUsername, setUsername] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getpwd, setPwd] = useState("")

  //Validate
  const [UserValid, setUserValid] = useState(false);
  const [Pwd1Valid, setPwd1Valid] = useState(false);
  const [Pwd2Valid, setPwd2Valid] = useState(false)
  const [AnswerValid, setAnswerValid] = useState(false)

  function redirectToLogin() {
    // Redireciona para a pagina de login
    router.push('/login');
  };

  function receiveQuestionTimer (value) {
    // Função para verificar se o usuario terminou de digitar o username e então buscar a question
    let timerId;  // Timer para buscar o username
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      receiveQuestion(value);
    }, 1000);
  }

  function receiveQuestion(value) {
    // Função que busca a question do usuario para recuperar a senha
    const url = 'http://127.0.0.1:8000/users/question/'

    const formData = new FormData();
    formData.append("username", value || getUsername)
    const requestData = {method: 'POST', body: formData}

    fetch(url, requestData)
    .then((res) => res.json())
    .then((data) => {
      if (data.msg) {
        const tip = document.getElementById("recoveryTip")
        tip.innerText = data.msg
      } else {
        setQuestion(data.question)
        setVisibility(true)
      }
    })
  };

  function recoveyFunc() {
    // Função de recuperação de senha
    const url = 'http://127.0.0.1:8000/users/recovery/'

    const formData = new FormData();
    formData.append("username", getUsername);
    formData.append("answer", getAnswer);
    formData.append("password", getPassword);
    formData.append("pwd", getpwd);

    const requestData = {method: 'POST', body: formData}

    fetch(url, requestData)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        const tip = document.getElementById("loginTip")
        tip.innerText = data.error
      } else {
        router.push('/login');
      }
    })
  }

  return (
    <>
      <div className='page banner'>
        <div className="login-page">
        <div className="login-alert" id='loginAlert'>
            <a> Você precisa fazer login!</a>
          </div>

          <div className='login-div' id='signupTab'>
            <h2> Recuperar senha </h2>

            <h3 style={{visibility: getVisibility? 'visible' : 'hidden'}}> Sua frase de recuperação: </h3>
            <span> {question} </span>
            <InputUser username={setUsername} valid={UserValid} setValid={setUserValid} action={receiveQuestionTimer}></InputUser>

            <div style={{visibility: getVisibility? 'visible' : 'hidden'}}>
              <InputAnswer answer={setAnswer} valid={AnswerValid} setValid={setAnswerValid}></InputAnswer>
              <InputPwd password={setPassword} valid={Pwd1Valid} setValid={setPwd1Valid} placeholder="Digite a nova senha"></InputPwd>
              <InputPwd password={setPwd} valid={Pwd2Valid} setValid={setPwd2Valid} placeholder="Comfirme a nova senha"></InputPwd>
            </div>

            <p id='loginTip'> </p>

            <button className='btn-login' onClick={recoveyFunc}> Recuperar </button>

            <p onClick={redirectToLogin}> Entrar </p>
          </div>
        </div>
      </div>
    </>
  )
}