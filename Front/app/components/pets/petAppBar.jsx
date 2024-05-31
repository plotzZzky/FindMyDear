'use client'
import { useRouter } from "next/navigation"
import { useAuth } from "../authContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faUserPlus, faDog, faCat } from "@fortawesome/free-solid-svg-icons"

export default function PetAppBar() {
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
      item.style.display = query === value? 'flex' : 'none';
    });
  }

  function showDog() {
    baseShowCardByCategorie(".card-option1", 'cachorro')
  }

  function showCat() {
    baseShowCardByCategorie(".card-option1", 'gato')
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
          <span className='categories' key={0} onClick={showDog}> <FontAwesomeIcon icon={faDog}/> Cachorro </span>
          <span className='categories' key={1} onClick={showCat}> <FontAwesomeIcon icon={faCat}/> Gato </span>
          
          <span className="categories" onClick={showAllCards}> <FontAwesomeIcon icon={faUsers}/> Todos </span>

          <span className="categories" onClick={showModalNewProfile}> <FontAwesomeIcon icon={faUserPlus}/> Cadastrar </span>
        </div>
      </div>
    </nav>
  )
}