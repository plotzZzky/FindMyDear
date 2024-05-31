'use client'
import { useRouter } from 'next/navigation';
import { useAuth } from '@comps/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassLocation, faSuitcase } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [getToken, setToken] = useAuth();
  const router = useRouter();

  const ABOUT = `FindMyDear é uma plataforma para encontrar entes queridos ou seus pets perdidos em tragédias ou catastrofes.
    Criado em meios as enches do Rio Grande do Sul de 2024, como uma forma de ajudar as pessoas afetadas pela tragedia a reencontrar entes queridos 
    ou pets perdidos em meio a enchente.`

  const FAQ = [
    {
      question: "Quem pode utilizar este serviço?",
      answer: `Para usar a FindMyDear para localizar pessoas e animais perdidos nas enchentes do Rio Grande do Sul, você pode preencher o formulário de registro disponível em nosso site. 
      Por favor, forneça o máximo de informações possível sobre a pessoa ou animal desaparecido, incluindo detalhes como nome, idade, descrição física, local e data do desaparecimento.`
    },
    {
      question: "Este serviço tem algum custo?",
      answer: "Não. Nosso serviço é totalmente gratuito e sem fins lucrativos. Nosso objetivo é ajudar a reunir pessoas e animais perdidos com suas famílias, sem qualquer custo para os usuários."
    },
    {
      question: "Como posso usar este serviço para encontrar uma pessoa ou animal perdido?",
      answer: `Para usar nosso serviço de localização de pessoas e animais perdidos nas enchentes do Rio Grande do Sul, você pode preencher o formulário de registro disponível em nosso site. 
      Por favor, forneça o máximo de informações possível sobre a pessoa ou animal desaparecido, incluindo detalhes como nome, idade, descrição física, local e data do desaparecimento.`
    },
    {
      question: "Como faço para relatar uma pessoa ou animal encontrado?",
      answer: "Crie um perfil com fotos e dados do animal, incluindo onde foi encontrado e seu contato para o dono poder te contatar."
    },
    {
      question: "Quem está por trás deste serviço?",
      answer: `Este serviço foi desenvolvido por uma equipe de voluntários dedicados, em colaboração com organizações locais e comunitárias, para ajudar a reunir pessoas e animais perdidos com suas famílias durante as enchentes do Rio Grande do Sul.
       Não temos ligações governamentais ou fins lucrativos.`
    },
    {
      question: "Como posso ajudar este serviço?",
      answer: `Você pode ajudar este serviço de diversas maneiras, como compartilhando informações sobre pessoas e animais desaparecidos em suas redes sociais, oferecendo abrigo temporário para animais perdidos ou fazendo doações para ajudar a manter nossas operações.
       Entre em contato conosco para obter mais informações sobre como ajudar.`
    },
  ];


  const faqItems = () => {
    // Cria os items do faq
    return FAQ.map((data, index) => (
      <details key={index}>
        <summary> {data.question} </summary>
        <a className='details-text'> {data.answer} </a>
      </details>
    ))
  }

  function goToLogin() {
    // Redireciona para a pagina do app ou login
    if (getToken !== null && typeof getToken === 'string') {
      router.push("/find");
    } else {
      router.push("/login");
    }
  }

  return (
    <div>
      <div className='page-home' id='Start'>
        <h1 className='big-title'> FindMyDear <FontAwesomeIcon icon={faMagnifyingGlassLocation} className='market-icon' /> </h1>
        <h2 className='subtitle'> Plataforma para encontar pessoas e pets perdidos. </h2>

        <div className='home-align-btns'>
          <button onClick={goToLogin}> Buscar entes queridos </button>
        </div>
      </div>

      <div className='page-home' id='About'>
        <h1> Sobre nós... </h1>
        <h2> {ABOUT} </h2>
        <h2> Assim como amanhecer após a noite mais escura, a plataforma FindMyDear tambem ajuda a encotrar novos amigos de 4 patas que precisam de abrigo. </h2>
      </div>

      <div className='page-home' id='Faq'>
        <h1> Duvias frequentes: </h1>
        {faqItems()}
      </div>
    </div>
  )
}