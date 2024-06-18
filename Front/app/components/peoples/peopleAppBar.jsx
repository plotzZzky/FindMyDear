'use client'
import { useRouter } from "next/navigation"
import { useAuth } from "../authContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPerson, faPersonDress, faPersonCane, faBaby, faUsers, faUserPlus } from "@fortawesome/free-solid-svg-icons"

export default function PeopleAppBar() {
  const [Token, updateToken] = useAuth();
  const router = useRouter();

  function filterCards(event) {
    // Função para filtrar os cards
    const value = event.target.value.toLowerCase()
    const cards = document.querySelectorAll(".card-margin");

    cards.forEach(item => {
      const profession = item.querySelector(".card-name").innerHTML.toLowerCase();
      item.style.display = profession.includes(value)? 'block' : 'none';
    });
  }

  function baseShowCardByCategorie(select, value) {
    // Função base para selecionar quais categorias de pessoas deve ser visivel
    const cards = document.querySelectorAll('.card-margin');

    cards.forEach(item => {
      const query = item.querySelector(select).innerHTML.toLowerCase();
      item.style.display = query === value? 'block' : 'none';
    });
  }

  function showMan() {
    baseShowCardByCategorie(".card-option1", 'true')
  }

  function showWoman() {
    baseShowCardByCategorie(".card-option1", 'false')
  }

  function showChildren() {
    baseShowCardByCategorie(".card-option2", "criança")
  }

  function showElderly() {
    baseShowCardByCategorie(".card-option2", "idoso")
  }

  function showAllCards() {
    // Exibe todos os cards
    const cards = document.querySelectorAll('.card-margin');

    cards.forEach(item => {
      item.style.display = 'block'
    });
  }

  function showModalNewProfile() {
    if (Token) {
      const modal = document.getElementById("modalNew")
      modal.style.visibility = 'visible'
    } else {
      if (confirm("Para criar um perfil você deve estar logado!\n ir para login?")) {
        router.push('/login')
      }
    }
  }

  return(
    <nav className="app-bar">
      <div className="app-bar-align">
        <input type="text" className="app-filter" onChange={filterCards} placeholder="Buscar pelo nome"></input>
        <div className="align-categories">
          <span className='categories' key={0} onClick={showMan}> <FontAwesomeIcon icon={faPerson}/> Homem </span>
          <span className='categories' key={1} onClick={showWoman}> <FontAwesomeIcon icon={faPersonDress}/> Mulher </span>
          <span className='categories' key={2} onClick={showChildren}> <FontAwesomeIcon icon={faBaby}/> Criança </span>
          <span className='categories' key={3} onClick={showElderly}> <FontAwesomeIcon icon={faPersonCane}/> Idoso </span>
          
          <span className="categories" onClick={showAllCards}> <FontAwesomeIcon icon={faUsers}/> Todos </span>

          <span className="categories" onClick={showModalNewProfile}> <FontAwesomeIcon icon={faUserPlus}/> Cadastrar </span>
        </div>
      </div>
    </nav>
  )
}