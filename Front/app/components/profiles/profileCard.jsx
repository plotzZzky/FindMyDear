import { useRouter } from 'next/navigation';

export default function ProfileCard(props) {
  const router = useRouter();

  function showProfile() {
    // Redireciona para pagina do perfil
    router.push(`/profiles/${props.data.id}`)
  }

  return (
    <div className="card-margin">
      <div className="card" onClick={showProfile}>
        <img src={props.data.picture} alt="" className="card-pic" />
        <span className="card-name">{props.data.name}</span>
        <span className="card-sex">{props.data.man.toString()}</span>
        <span className="card-agegroup">{props.data.age_group}</span>
      </div>
    </div>
  )
}