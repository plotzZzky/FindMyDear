'use client'
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from '@comps/authContext'
import CommentCard from "@comps/commentCard";

export default function Profile() {
  const urlParams = useParams();
  const router = useRouter();

  const [Token, updateToken] = useAuth();
  const [profileData, setProfileData] = useState();
  const [getCards, setCards] = useState(); // Cards dos comentarios 
  const [getComment, setComment] = useState();

  function recieveUserProfile() {
    // Recebe dados do backend
    const profileId = urlParams.id; // recebe o id do perfil dos parametros da url
    const url = `http://127.0.0.1:8000/profiles/${profileId}/`;

    const data = {
      method: 'GET'
    };

    fetch(url, data)
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data);
        showComments(data.comments);
      });
  }

  function showComments(value) {
    // Cria os cards dos comenantarios da tarefa atual
    setCards(
      value.map((data, index) => (
        <CommentCard key={index} data={data} update={showComments}></CommentCard>
      ))
    );
  }

  const submitNewComment = (event) => {
    if (event.key === 'Enter') {  // verifica se o botão apertado for o enter
      if (Token) {
        createNewComment()
      } else {
        if (confirm("Para adicionar um comentario você deve estar logado!\n ir para login?")) {
          router.push('/login')
        }
      }
    }
  }

  function changeCommentValue(event) {
    setComment(event.target.value)
  }

  function createNewComment() {
    // Cria um novo comentario
    const url = 'http://127.0.0.1:8000/comments/'

    const form = new FormData()
    form.append("comment", getComment)
    form.append("profileId", urlParams.id)

    const header = {
      method: 'POST',
      body: form,
      headers: { Authorization: 'Token ' + Token },
    }

    fetch(url, header)
      .then((res) => res.json())
      .then((data) => {
        setComment('')
        showComments(data)
      })
  }

  useEffect(() => {
    recieveUserProfile()
  }, [])

  return (
    <>
      <div className='page profile-page'>
        <div className='page-side'>
            <img src={`http://localhost:8000/${profileData?.picture}`} alt="" className="profile-pic" />
            <div className="align-profile">
              <span className="profile-name"> {profileData?.name} </span>
              <span className="profile-age"> {profileData?.age} </span>
              <span className="profile-location"> Localização: {profileData?.location} </span>
              <span className="profile-desc"> {profileData?.desc} </span>
            </div>
        </div>

        <div className='page-side' style={{flex: '0 1 60%'}}>
          <div className="comments">
            <input type="text" className="comment-input"
              placeholder="Possui alguma informação sobre a localização dessa pessoa?" 
              onKeyDown={submitNewComment} value={getComment} onChange={changeCommentValue}>
            </input>
            {getCards}
          </div>
        </div>
      </div>
    </>
  )
}