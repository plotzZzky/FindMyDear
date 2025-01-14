import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@comps/authContext'
import { useEffect } from 'react';


export default function CommentCard(props) {
  const [token, updateToken] = useAuth();

  function deleteTask(event) {
    // Apaga a tarefa
    event.stopPropagation()

    const url = `http://127.0.0.1:8000/comments/${props.data.id}/`
    const header = {
      method: 'DELETE',
      headers: { Authorization: 'Token ' + token },
    }

    fetch(url, header)
      .then(res => res.json())
      .then(data => {
        props.update(data)
      })
  }

  return (
    <div className='comment-card'>
      <div className="comment-row">
        <span> {props.data.desc} </span>
      </div>

      <div className="comment-row">
        <FontAwesomeIcon icon={faTrash} onClick={e => deleteTask(e)} className='task-btn'/>
        <span> {props.data.date} </span>
      </div>
    </div>
  )
}