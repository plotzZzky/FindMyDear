'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars, faHome, faQuestion, faUsers, faRightFromBracket, faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from './authContext'
import './navbar.css'

export default function NavBar() {
  const [getToken, setToken] = useAuth();
  const router = useRouter();
  const getPath = usePathname();

  // Função que abre o menu no modo responsivo
  function openResponsiveMenu() {
    let navbar = document.getElementsByClassName("menu")[0];
    if (navbar.className == "menu") {
      navbar.classList.add("responsive");
    } else {
      navbar.className = "menu";
    }
  };

  // Função que fecha o menu no modo responsivo
  function closeResponsiveMenu() {
    let navbar = document.getElementsByClassName("menu")[0];
    navbar.classList.remove("responsive");
  };

  // Criam os item na navbar dependendo da pagina acessada
  const ABOUT = () => {
    return getPath === '/' ? (
      <div className="menu-item" onClick={goAbout}>
        <a><FontAwesomeIcon icon={faUsers} className='icon-menu' /> Sobre </a>
      </div>
    ) : null
  };

  const FAQ = () => {
    return getPath === '/' ? (
      <div className="menu-item" onClick={goFaq}>
        <a><FontAwesomeIcon icon={faQuestion} className='icon-menu' /> Dúvidas </a>
      </div>
    ) : null
  };

  const LOGIN = () => {
    return getToken === null? (
      <div className="menu-item" onClick={goLogin}>
        <a><FontAwesomeIcon icon={faUser} className='icon-menu' /> Entrar </a>
      </div>
    ) : (
      <div className="menu-item" onClick={goLogin}>
        <a><FontAwesomeIcon icon={faRightFromBracket} className='icon-menu' /> Sair </a>
      </div>
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
      sessionStorage.removeItem("token")
      setToken(null)
      router.push('/')
    }
  }

  return (
    <nav>
      <div className='navbar-align'>
        <div className="menu" id="menu">

          <a className="menu-icon" onClick={openResponsiveMenu}>
            <FontAwesomeIcon icon={faBars} />
          </a>

          <div className="menu-item" onClick={goHome}>
            <a><FontAwesomeIcon icon={faHome} /> Inicio </a>
          </div>

          {ABOUT()}

          {FAQ()}

          <div className="menu-item" onClick={findPeople}>
            <a><FontAwesomeIcon icon={faMagnifyingGlassLocation} className='icon-menu' /> Pessoas </a>
          </div>

          <div className="menu-item" onClick={findPets}>
            <a><FontAwesomeIcon icon={faMagnifyingGlassLocation} className='icon-menu' /> Pets </a>
          </div>

          {LOGIN()}

        </div>
      </div>
    </nav>
  )
}