import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import { publicRequest } from '../requestMethods';

function NinethSection() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSendMessage = async (event) => {
        try {
            event.preventDefault();
        if (name === '' || email === '' || message === '' ) {
            toast.error('Please fill the form correctly')
        } else if (!validator.isEmail(email)) {
            toast.error('Please ensure the email address is valid')
        } else {
            await publicRequest.post('/teaching/message', {name:name, email:email, message:message})
            toast.success('Message sent successfully')
            setName('')
            setEmail('')
            setMessage('')
        }
        } catch (error) {
            toast.error(error.response.data)
        }
        
    }

    return (
        <>
            <ToastContainer autoClose={2000}/>
            <div style={{height:'auto'}}>
                <div className="container">
                    <div className="n-section">
                        <div className="content">
                            <div className="title">
                                <p>Leave a message</p>
                            </div>
                            <div className="subtitle">
                                <p>Kindly reach out to us</p>
                            </div>
                        </div>

                        <div className="name">
                            <p>Name:</p>
                            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="name">
                            <p>Email:</p>
                            <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className="name">
                            <p className='message'>Message:</p>
                            <textarea name='message' value={message} rows={3} cols={30} onChange={(e) => setMessage(e.target.value)}/>
                        </div>

                        <div className="button">
                            <button onClick={handleSendMessage}>SEND MESSAGE</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default NinethSection;