'use client'
import { useRouter, usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars, faHome, faQuestion, faUsers, faRightFromBracket, faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from './authContext'
import './navbar.css'

export default function NavBar() {
  const [getToken, setToken] = useAuth();
  const router = useRouter();
  const getPath = usePathname();

  
  function openResponsiveMenu() {
    // Função que abre o menu no modo responsivo
    const navbar = document.getElementById('menu');
    if (navbar.className == "menu") {
      navbar.classList.add("responsive");
    } else {
      navbar.className = "menu";
    }
  };

  function closeResponsiveMenu() {
    // Função que fecha o menu no modo responsivo
    const navbar = document.getElementById("menu");
    navbar.classList.remove("responsive");
  };

  // Criam os item na navbar dependendo da pagina acessada
  const ABOUT = () => {
    return getPath === '/' ? (
      <span onClick={goAbout}>
        <FontAwesomeIcon icon={faUsers} className='icon-menu' /> Sobre 
      </span>
    ) : null
  };

  const FAQ = () => {
    return getPath === '/' ? (
      <span className="menu-item" onClick={goFaq}>
        <FontAwesomeIcon icon={faQuestion} className='icon-menu' /> Dúvidas 
      </span>
    ) : null
  };

  const LOGIN = () => {
    return getToken === null? (
      <span onClick={goLogin}>
        <FontAwesomeIcon icon={faUser} className='icon-menu' /> Entrar 
      </span>
    ) : (
      <span onClick={goLogin}>
        <FontAwesomeIcon icon={faRightFromBracket} className='icon-menu' /> Sair 
      </span>
    )
  };

  //Funções de navegação pelas paginas
  function goHome() {
    if (getPath === '/') {
      document.getElementById('Start').scrollIntoView();
    } else {
      router.push('/')
    }
    closeResponsiveMenu();
  };

  function goAbout() {
    document.getElementById('About').scrollIntoView();
    closeResponsiveMenu();
  }

  function goFaq() {
    document.getElementById('Faq').scrollIntoView();
    closeResponsiveMenu();
  }

  function findPeople() {
    router.push('/peoples')
  }

  function findPets() {
    router.push('/pets')
  }

  function goLogin() {
    if (getToken === null) {
      router.push("/login")
    } else {
      setToken(null)
      router.push('/')
    }
  }

  return (
    <nav>
      <div className="menu" id="menu">

        <span id='menuBtn' onClick={openResponsiveMenu}>
          <FontAwesomeIcon icon={faBars} />
        </span>

        <span onClick={goHome}>
          <FontAwesomeIcon icon={faHome} /> Inicio 
        </span>

        {ABOUT()}

        {FAQ()}

        <span onClick={findPeople}>
          <FontAwesomeIcon icon={faMagnifyingGlassLocation} className='icon-menu' /> Pessoas 
        </span>

        <span className="menu-item" onClick={findPets}>
          <FontAwesomeIcon icon={faMagnifyingGlassLocation} className='icon-menu' /> Pets 
        </span>

        {LOGIN()}

      </div>
    </nav>
  )
}