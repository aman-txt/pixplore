import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom';
import Nav from './navbar/nav.tsx'

import { Login } from './components/Login';
import ViewPost from './viewPost/view.js';
import Feed from './Feed/feed.js';
import PostFeed from './FeedPosts/PostFeed.js';
import CreatePost from "./Posts/createPost";
import UserProfile from "./userprofile/userProfile";
import { useAuthenticator } from '@aws-amplify/ui-react';
import Interests from './Interests/interest';
import Saved from './userprofile/saved';

const SidebarLayout = () => (
  <>
    <Nav />
    <Outlet />
  </>
);

function MyRoutes() {
  const { route } = useAuthenticator(context => [context.route]);
  const {user, signOut} = useAuthenticator((context) => [context.user]);  
  
  return (
    <BrowserRouter>

      {/* <Router> */}
      {/* {route === 'authenticated'? <h1>{user.username}</h1>: "No"} */}
        <div className='container'>
          <Routes>
            <Route element={<SidebarLayout />}>                
              <Route path="/user/feed" element={<Feed /> } />
              <Route path="/view/post" element={<ViewPost />} />
              <Route path="/create/post" element={<CreatePost />} />
              <Route path="/feed/posts" element={<PostFeed />} />
              <Route path="/user/createpost" element={<CreatePost />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/interest" element={<Interests />} />
              <Route path="/user/saved" element={<Saved />} />
              
            </Route>
            <Route path="/" element={<Login />} />
            {/* <Route path="/" element={<Layout />} /> */}
{/* 

            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} /> */}
            
          </Routes>
        </div>
      {/* </Router> */}
    </BrowserRouter>
  );
}

function App() {
return (
  <Authenticator.Provider>
    <MyRoutes />
  </Authenticator.Provider>
);
}

export default App;