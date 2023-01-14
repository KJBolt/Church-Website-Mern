import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Teachings from './pages/Teachings';
import SinglePost from './pages/SinglePost';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import ProductDashboard from "./pages/ProductDashboard";
import EditUser from "./pages/EditUser";
import EditPosts from "./pages/EditPosts";
import EventDashboard from "./pages/EventDashboard";
import EditEvent from "./pages/EditEvent";
import {useSelector} from "react-redux";
import CreatePost from "./pages/CreatePost";
import CreateEvent from "./pages/CreateEvent";
import EmailVerified from './pages/EmailVerified';
import VerifyEmail from './pages/VerifyEmail';
import CreateVideo from './pages/CreateVideo';
import VideoDashboard from './pages/VideoDashboard';
import WatchVideo from './pages/WatchVideo';
import AudioDashboard from './pages/AudioDashboard';
import CreateAudio from './pages/CreateAudio';



function App() {
  const user = useSelector((state) => state.user.currentUser.user);
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Home/> : <Login />}  />
          <Route path='/home' element={user ? <Home /> : <Login/>}  />
          <Route path='/login' element={<Login />}  />
          <Route path='/dashboard/' element={user ? <Dashboard /> : <Login/>}  />
          <Route path='/dashboard/users' element={user ? <UserDashboard /> : <Login />}  />
          <Route path='/users/:id' element={user ? <EditUser /> : <Login />}  />
          <Route path='/posts/:id' element={<EditPosts />}  />
          <Route path='/events/:id' element={<EditEvent />}  />
          <Route path='/dashboard/posts' element={user ? <ProductDashboard /> : <Login/>}  />
          <Route path='/dashboard/videos' element={user ? <VideoDashboard /> : <Login/>}  />
          <Route path='/dashboard/audios' element={user ? <AudioDashboard /> : <Login/>}  />
          <Route path='/teachings/videos/:id' element={user ? <WatchVideo /> : <Login/>}  />
          <Route path='/dashboard/events' element={user ? <EventDashboard /> : <Login/>}  />
          <Route path='/dashboard/create-post' element={user ? <CreatePost /> : <Login />}  />
          <Route path='/dashboard/create-event' element={user ? <CreateEvent /> : <Login />}  />
          <Route path='/dashboard/create-video' element={user ? <CreateVideo /> : <Login />}  />
          <Route path='/dashboard/create-audio' element={user ? <CreateAudio /> : <Login />}  />
          <Route path='/register' element={<Register />}  />
          <Route path='/teachings' element={user ? <Teachings /> : <Login/>}  />
          <Route path='/post/:id' element={user ? <SinglePost /> : <Login/>}  />
          <Route path='/gallery' element={user ? <Gallery /> : <Login/>}  />
          <Route path='/about' element={user ? <About /> : <Login/>}  />
          <Route path='/verify-email' element={<VerifyEmail/>} />
          <Route path='/verify/:token' element={<EmailVerified/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
