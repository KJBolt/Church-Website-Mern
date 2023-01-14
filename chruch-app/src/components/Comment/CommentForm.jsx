import React, {useState} from 'react';

function CommentForm({initialText='', submitLabel, handleSubmit, handleCancel}) {
  const [input, setInput] = useState(initialText);
  
   // Submit Inputs
   const onSubmit = () => {
    handleSubmit(input)
    setInput('')
  }

  return (
    <div style={{ marginButtom: '20px' }}>
      <div className="comment-input">
           <div className="avatar">
            <img src={require('../../assets/bible.jpeg')} alt="" />
           </div>
           <div className="input">
            <input type="text" placeholder='Add a comment...'  value={input} onChange={(e) => setInput(e.target.value)} />
           </div>
      </div>

      <div className="comment-buttons">
        <div>
          {handleCancel !== null && <button className='cancel-btn' onClick={handleCancel}>Cancel</button>}
          <button className='submitLabel' onClick={() => onSubmit()}>{submitLabel}</button>
        </div>
      </div>
    </div>
  )
}

export default CommentForm
