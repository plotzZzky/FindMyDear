import { useEffect, useState } from "react";
import { useAuth } from '@comps/authContext'

export default function ModalNewProfile(props) {
  let clear = false;  // Atualiza os campos apos fechar o modal
  const [token, updateToken] = useAuth();

  const [getName, setName] = useState("");
  const [getSex, setSex] = useState(true);
  const [getAge, setAge] = useState("");
  const [getAgeGroup, setAgeGroup] = useState(""); // Faixa etaria da pessoa
  const [getTelephone, setTelephone] = useState("");
  const [getDesc, setDesc] = useState("");
  const [getLocation, setLocation] = useState("");

  const [getImageUser, setImageUser] = useState();
  const [getFileUser, setFileUser] = useState();

  function closeModal() {
    const modal = document.getElementById('modalNew')
    modal.style.visibility = 'hidden'
  }

  function clickInput() {
    const input = document.getElementById('selectImgUser')
    input.click()
  }

  function changeImage(event) {
    const file = event.target.files[0];
    setImageUser(file)
    const reader = new FileReader();

    reader.onload = function (event) {
      setFileUser(event.target.result)
    };
    reader.readAsDataURL(file);
  }

  function validateForm() {
    // Valida o formulario para atualizar o perfil
    if (getImageUser, getFileUser, getName, getAgeGroup, getSex, getAge, getAgeGroup, getDesc, getLocation) {
      createProfile()
    } else {
      alert("Preencha o formulario corretamente!")
    }
  }

  function createProfile() {
    const url = 'http://127.0.0.1:8000/profiles/';
    const form = new FormData();

    form.set('enctype', 'multipart/form-data');
    form.append("name", getName);
    form.append("sex", getSex);
    form.append("age", getAge);
    form.append("ageGroup", getAgeGroup);
    form.append("telephone", getTelephone);
    form.append("desc", getDesc);
    form.append("location", getLocation);
    if (getImageUser) {
      form.append('picture', getImageUser, getImageUser.name);
    }

    const formData = {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + token,
      },
      body: form,
    };
  
    fetch(url, formData)
      .then((res) => res.json())
      .then(() => {
        props.update()
        clear = true
      });
    closeModal();
  }

  function updateName(event) {
    const value = event.target.value;
    setName(value)
  }

  function updateSex(event) {
    const value = event.target.value;
    setSex(value)
  }

  function updateAge(event) {
    const value = event.target.value
    setAge(value)
  }

  function updateAgeGroup(event) {
    const value = event.target.value
    setAgeGroup(value)
  }

  function updateTelephone(event) {
    const value = event.target.value;
    setTelephone(value)
  }

  function updateDesc(event) {
    const value = event.target.value;
    setDesc(value)
  }

  function updateLocation(event) {
    const value = event.target.value;
    setLocation(value)
  }

  useEffect(() => {
  }, [clear])

  return (
    <div className="modal-background" id="modalNew" onClick={closeModal}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2> Cadastro de desaparecido </h2>

        <div className="align-inputs">
          <div className="align-imgs">
            <img className='preview-img' onClick={clickInput} src={getFileUser}></img>
            <input type="file" className="select-image" id='selectImgUser' onChange={changeImage}></input>
          </div>

          <input type="text" className="text-input" placeholder="Nome compleo" value={getName} onChange={updateName}/>
          <input type="date" className="text-input" placeholder="Data de nascimento" value={getAge} onChange={updateAge}/>

          <select onChange={e => updateSex(e)}>
            <option disabled selected={true}> Selecione o sexo biologico</option>
            <option value={true}> Homem </option>
            <option value={false}> Mulher </option>
          </select>

          <select onChange={e => updateAgeGroup(e)}>
            <option disabled selected={true}> Selecione faixa etária </option>
            <option value='Criança'> Criança  </option>
            <option value='Adulto'> Adulto </option>
            <option value='Idoso'> Idoso </option>
          </select>

          <input type="text" className="text-input" placeholder="Seu Telefone para contato" value={getTelephone} onChange={updateTelephone}/>

          <textarea placeholder="Descreva a pessoa fisicamente, cor dos olhos, cabelos, altura e o que mais você lembrar." style={{background: 'snow'}} value={getDesc} onChange={updateDesc}></textarea>
          <textarea placeholder="Descreva a ultima localização conhecida da pessoa" style={{background: 'snow'}} value={getLocation} onChange={updateLocation}></textarea>

          <button className="save-btn" onClick={validateForm}> Salvar </button>
        </div>
      </div>
    </div>
  )
}