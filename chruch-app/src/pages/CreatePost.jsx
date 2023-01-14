import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import  app  from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {userRequest} from "../requestMethods";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePost() {
    const [imgPerc, setImgPerc] = useState(0);
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    // When image is not null call upload function
    useEffect(() => {
       image && uploadFile(image)
    },[image]);


    const handleSubmit = async() => {
        try {
            await userRequest.post('teaching/create', {title:title, img:imageUrl, body:body});
            toast.success('Post created successfully');

            setTimeout(() => {
                navigate('/teachings');
            }, 3000)


        } catch (error) {
            toast.error(error.response.data)
        }


    };


    // Upload Image logic
    const uploadFile = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                 setImgPerc(Math.ceil(progress));
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {},
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL)
                });
            }
        );
    };



    return (
        <div>
            <Navbar/>
            <ToastContainer autoClose={2000}/>

            <div className="dashboard-container">
                <div className="dashboard-wrapper">
                    <div className="row">
                        <div className="left col-md-3 col-sm-12 col-12">
                            <Sidebar/>
                        </div>
                        <div className="right col-md-9 col-sm-12 col-12">
                            <div className="eu-container">
                                <div className='eu-wrapper'>
                                    <div className="eu-title">
                                        <h6>Create Post</h6>
                                    </div>

                                    <div className="eu-form">
                                        <input accept="image/*" type="file" onChange={(e) => setImage(e.target.files[0])}/>
                                        {imgPerc > 0 && imgPerc < 100 ? <div style={{ mt:2, display:'flex' }}>
                                            <div style={{ width: 50, height: 50 }}>
                                                <CircularProgressbar  value={imgPerc} text={`${imgPerc}`} />
                                            </div>

                                            <p style={{ mt:5, ml:2 }}>
                                                Uploading Image. Please wait...
                                            </p>
                                        </div> : <div></div>}

                                        <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            className='ckeditor'
                                            style={{height:200}}
                                            data={body}
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                setBody(data);
                                            }}
                                        />
                                        {title === '' || body === '' || imgPerc !== 100 ? <input disabled className='eu-btn' style={{ backgroundColor: 'grey '}} type="button" value='Submit'/> :
                                        <input className='eu-btn' style={{ backgroundColor: '#d45140' }} type="button" value='Submit' onClick={handleSubmit}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;