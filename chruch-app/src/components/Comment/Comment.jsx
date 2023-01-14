import React, {useState, useEffect} from 'react';
import moment from 'moment';
import { publicRequest } from '../../requestMethods';
import CommentForm from './CommentForm';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Comment({comment, commentId, handleDelete, replyResponse, activeComment, setActiveComment, addComment, updateComment}) {
  const [replies, setReplies] = useState([]);
  const user = useSelector((state) => state.user.currentUser.user);
  const [canModify, setCanModify] = useState(false);
  const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment._id;
  const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment._id;
  const replyId = comment.parentId ? comment.parentId : comment._id;


  // Fetch Replies when component is mounted
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await publicRequest.get(`/comment/reply/${commentId}`)
        setReplies(res.data);
      } catch (error) {
        toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
      }
        
    }

    fetchReplies()
}, [commentId, replyResponse])


// If comment id is equal to user id the we can edit comment
useEffect(() => {
  if (user && user._id === comment.userId) {
      setCanModify(true)
  }
}, [comment.userId, user])


  return (
    <>
      <ToastContainer autoClose={2000}/>
      <div>
        <div className="cm">
          <div className="cm-avatar">
            <img src={`https://ui-avatars.com/api/?name=${comment.username}`} alt=''/>
          </div>
          <div className="cm-content">
              <div className="cm-first">
                  <p>{comment.username}</p>
                  <p>{moment(comment.createdAt).fromNow()}</p>
              </div>

              
              {isEditing ? 
              <div style={{ marginTop: '20px' }}>
                <CommentForm  
                  submitLabel='Edit' 
                  initialText={comment.desc} 
                  handleSubmit={(text) => updateComment(text, comment._id)} 
                  handleCancel={() => setActiveComment(null)} 
                />
              </div> : 
              <><div className="cm-second-content">
                  <p> {comment.parentId === null ? '' : <span>@{comment.commentUser}</span>} {comment.desc}</p>
              </div>
              <div className="comment-btn">
                <div className='c-buttons'>
                  <div style={{ backgroundColor: '#f2f2f2' }} onClick={() => setActiveComment({id: comment._id, type: 'replying'})}>
                    <p>Reply</p>
                  </div>
                  {canModify && <div style={{ backgroundColor: '#f2f2f2' }} onClick={() => setActiveComment({id: comment._id, type: 'editing'})}>
                    <p>Edit</p>
                  </div>}
                  {comment.userId === user._id ? <div style={{ backgroundColor: '#f2f2f2' }} onClick={() => user && user._id === comment.userId ? handleDelete(comment._id) : ''}>
                    <p>Delete</p>
                  </div> : <div style={{ backgroundColor: '#fff' }}></div>}
                </div>
              </div></>}
              {isReplying && (
              <div style={{ marginTop: '10px', width:'100%' }}>
                  <CommentForm  submitLabel='Reply' handleSubmit={(text) => addComment(text, replyId)} handleCancel={() => setActiveComment(null)}/>
              </div>)}
          </div>
        </div>

        <div style={{ marginTop: '10px' }}>
          {replies && replies.length > 0 && (
            <div style={{ marginLeft: '50px' }}>
              {replies.map((reply) => (
                <Comment 
                  comment={reply} 
                  commentId={reply._id}  
                  key={reply._id} 
                  handleDelete={handleDelete} 
                  addComment={addComment} 
                  activeComment={activeComment} 
                  setActiveComment={setActiveComment} 
                  updateComment={updateComment} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Comment
