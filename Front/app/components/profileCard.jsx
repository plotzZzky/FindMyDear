import { useRouter } from 'next/navigation';

export default function ProfileCard(props) {
  const router = useRouter();

  function showProfile() {
    // Redireciona para pagina do perfil
    const profileId = props.data.id
    const profileType = props.data.man? 'peoples':'pets'
    router.push(`/profiles/${profileType}/${profileId}`)
  }

  return (
    <div className="card-margin">
      <div className="card" onClick={showProfile}>
        <img src={props.data.picture} alt="" className="card-pic" />
        <span className="card-name">{props.data.name}</span>
        <span className="card-option1">{props.data.man?.toString() || props.data.specie}</span>
        <span className="card-option2">{props.data.age_group || props.data.breed}</span>
      </div>
    </div>
  )
}