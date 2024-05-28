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
      question: "A HarmonyTask Network é totalmente gratuita?",
      answer: "Sim, a HarmonyTask Network é uma plataforma totalmente gratuita. Todos os recursos essenciais estão disponíveis para os usuários sem custos associados."
    },
    {
      question: "Quais são os serviços oferecidos pela HarmonyTask Network?",
      answer: "A HarmonyTask Network inclui acesso a uma ampla variedade de profissionais e prestadores de serviços. Você pode explorar, contratar e aproveitar os recursos essenciais sem nenhum custo."
    },
    {
      question: "Como faço para obter suporte técnico na HarmonyTask Network?",
      answer: "Para obter suporte técnico na HarmonyTask Network, visite nossa seção de Suporte em nosso site. Nossa equipe está pronta para ajudar a resolver qualquer dúvida ou problema que você possa ter."
    },
    {
      question: "Posso oferecer meus serviços na HarmonyTask Network de forma gratuita?",
      answer: "Sim, profissionais e prestadores de serviços podem se cadastrar e oferecer seus serviços gratuitamente na HarmonyTask Network. A plataforma é uma comunidade colaborativa onde todos têm a oportunidade de participar."
    },
    {
      question: "Como a HarmonyTask Network garante a qualidade dos profissionais cadastrados?",
      answer: "A HarmonyTask Network realiza verificações detalhadas para garantir a qualidade e confiabilidade dos profissionais cadastrados. Nossa prioridade é fornecer aos usuários acesso a serviços de alta qualidade."
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