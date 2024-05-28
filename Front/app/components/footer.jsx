'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {

  function goToGitHub() { router.push("https://github.com/plotzzzky") }

  return (
    <footer>
      <div className='brand'>
        <span className='brand-title'> FindMyDear </span>
        <span className='brand-name'> Plataforma para encontar pessoas e pets perdidos. </span>
      </div>


      <div className='contacts'>
        <p> Contatos </p>

        <p>
          <FontAwesomeIcon icon={faEnvelope}/>
          <a> contato@FindMyDear.com </a>
        </p>

        <p>
          <FontAwesomeIcon icon={faEnvelope}/>
          <a> equipe@FindMyDear.com </a>
        </p>
      </div>

      <div className='contacts'>
        <p> Dev </p>

        <p onClick={goToGitHub}>
          <FontAwesomeIcon icon={faGithub} />
          <a> GitHub.com/plotzZzky </a>
        </p>
      </div>
    </footer>
  )
}