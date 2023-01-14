import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {publicRequest, userRequest} from "../requestMethods";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "@firebase/storage";
import app from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CircularProgressbar} from "react-circular-progressbar";

function EditPosts() {

    const [imgPerc, setImgPerc] = useState(0);
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({});

    // Get the post on Load
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await publicRequest.get(`/teaching/find/${path}`);
                setPost(res.data);
            } catch (error) {
                toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
            }
           
        };
        fetchPost();
    },[path]);


    // Upload Image to firebase after image is set
    useEffect(() => {
        image && uploadFile(image)
    }, [image]);


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

    // Update Post
    const handleUpdate = async() => {
        if (title === '' || image === '' || body === '') {
            toast.error('Please fill all the fields')
        } else {
            try {
                await userRequest.put(`/teaching/${path}`, {title:title, body:body, img:imageUrl});
                toast.success('Post Updated successfully');
                setTimeout(() => {
                    navigate('/dashboard/posts/')
                }, 3000)
            } catch (error) {
                toast.error(`${error.response.data}`)
            }
        }
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
                                        <h6>Edit Post</h6>
                                    </div>

                                    <div className="eu-form">
                                        <input accept="image/*" type="file" onChange={(e) => setImage(e.target.files[0])} />
                                        {imgPerc > 0 && imgPerc < 100 ? <div style={{ mt:2, display:'flex' }}>
                                            <div style={{ width: 50, height: 50 }}>
                                                <CircularProgressbar  value={imgPerc} text={`${imgPerc}`} />
                                            </div>

                                            <p style={{ mt:2, ml:2 }}>
                                                Uploading Video. Please wait...
                                            </p>
                                        </div> : <div></div>}

                                        <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} defaultValue={post?.title || ''}/>
                                    <CKEditor
                                            editor={ ClassicEditor }
                                            className='ckeditor'
                                            style={{height:200}}
                                            data={post.body}
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                setBody(data);
                                            }}
                                        />
                                        <input className='eu-btn' type="button" value='Update' onClick={handleUpdate}/>
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

export default EditPosts;