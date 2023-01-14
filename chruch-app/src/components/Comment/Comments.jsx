import React, {useEffect, useState} from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { publicRequest, userRequest } from '../../requestMethods';
import { getComments } from '../../redux/videoSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Comments({videoId}) {
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState([]);
  const [replyResponse, setReplyResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState({});
  const dispatch = useDispatch();
  const [commentCount, setCommentCount] = useState([]);

  // Fetch Comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get(`/comment/${videoId}`); 
        setComments(res.data);
        dispatch(getComments(res.data))
        setLoading(false);
      } catch (error) {
        toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
      }
    }

    fetchComments()
  }, [videoId, refresh, dispatch]);



  // Fetch Comment Count
  useEffect(() => {
    const fetchCommentCount = async() => {
      try {
        const res = await publicRequest.get(`/comment/all/comments/${videoId}`);
        setCommentCount(res.data)
      } catch (error) {
        toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
      }
      
    }

    fetchCommentCount()
  }, [videoId])


  // Add Reply
  const addReply =  async(text, replyId) => {
    try {
      // console.log('Calling add reply')
      const res = await userRequest.post(`/comment/reply/${replyId}`, {desc:text})
      setReplyResponse(res.data)
    } catch (error) {
      toast.error(error.response.data)
    }
    
  }

  // Add Root Comment
    const addRootComment =  async(input) => {
      try {
        // console.log('Root Comment fun =>' , input)
        const res = await userRequest.post(`/comment/add/${videoId}`, {desc:input})
        setComments([...comments, res.data])
        setRefresh(res.data)
      } catch (error) {
        toast.error(error.response.data)
      }
    
  }

  // Add Comment
  const addComment = async(input, replyId) => {
    // Input coming from comment form and replyId comming from reply comment

    if (replyId && input) {
      setActiveComment(null)
      addReply(input, replyId)

    } else if (input) {
        setActiveComment(null)
        addRootComment(input)   
    }
  }

  // Update Comment
  const updateComment = async (text, commentId) => {
    try {
      // console.log('Update function =>', text, commentId)
      setActiveComment(null)
      const res = await userRequest.put(`/comment/${commentId}`, {desc:text})
      setRefresh([res.data])
      setActiveComment(null)
    } catch (error) {
      toast.error(error.response.data)
    }
    
  }

  // Delete Comment
  const handleDelete = async (commentId) => {
    try {
      // console.log('Deleting =>', commentId)
      await userRequest.delete(`/comment/${commentId}`);
      setComments((comments) => comments.filter((comment) => comment._id !== commentId))
      setReplyResponse('deleted')
      setRefresh('deleted')
    } catch (error) {
      toast.error(error.response.data)
    }
  }



  return (
    <>
      <ToastContainer autoClose={2000}/>
      <div className='comment-container'>
          <p>{commentCount.length} Comments</p>

          <CommentForm submitLabel='Comment' handleSubmit={addComment} handleCancel={null}/>

          {loading ? <div className="loader">Loading...</div> : 
          <div>
            {comments.map((comment) => (
              <Comment 
                comment={comment} 
                commentId={comment._id} 
                key={comment._id} 
                handleDelete={handleDelete} 
                replyResponse={replyResponse} 
                activeComment={activeComment} 
                setActiveComment={setActiveComment}
                addComment={addComment}
                updateComment={updateComment}
              />
            ))}
            
          </div>}
          
          
      </div>
    </>
  )
}

export default Comments
