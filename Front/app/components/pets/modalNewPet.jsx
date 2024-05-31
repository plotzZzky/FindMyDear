import { useEffect, useState } from "react";
import { useAuth } from '@comps/authContext'

export default function ModalNewPet(props) {
  let clear = false;  // Atualiza os campos apos fechar o modal
  const [token, updateToken] = useAuth();

  const [getName, setName] = useState("");
  const [getBreed, setBreed] = useState("");
  const [getSpecie, setSpecie] = useState("");
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
    if (getImageUser, getFileUser, getName, getBreed, getSpecie, getDesc, getLocation) {
      createProfile()
    } else {
      alert("Preencha o formulario corretamente!")
    }
  }

  function createProfile() {
    const url = 'http://127.0.0.1:8000/pets/';
    const form = new FormData();

    form.set('enctype', 'multipart/form-data');
    form.append("name", getName);
    form.append("breed", getBreed);
    form.append("specie", getSpecie);
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

  function updateBreed(event) {
    const value = event.target.value
    setBreed(value)
  }

  function updateSpecie(event) {
    const value = event.target.value
    setSpecie(value)
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

          <input type="text" className="text-input" placeholder="Raça" value={getBreed} onChange={updateBreed}/>
          <input type="text" className="text-input" placeholder="Nome do pet" value={getName} onChange={updateName}/>

          <select onChange={e => updateSpecie(e)}>
            <option disabled selected={true}> Selecione a especie do pet</option>
            <option value="Cachorro"> Cachorro </option>
            <option value="Gato"> Gato </option>
            <option value="Outro"> Outro </option>
          </select>

          <input type="text" className="text-input" placeholder="Seu Telefone para contato" value={getTelephone} onChange={updateTelephone}/>

          <textarea placeholder="Descreva o pet fisicamente, porte, cor etc." style={{background: 'snow'}} value={getDesc} onChange={updateDesc}></textarea>
          <textarea placeholder="Descreva a ultima localização conhecida do pet." style={{background: 'snow'}} value={getLocation} onChange={updateLocation}></textarea>

          <button className="save-btn" onClick={validateForm}> Salvar </button>
        </div>
      </div>
    </div>
  )
}