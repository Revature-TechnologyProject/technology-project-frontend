import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { User, UserContext } from './context/userContext';
import CreatePost from './pages/Post';
import Search from './pages/Search';
import PostDetails from './components/PostDetails/PostDetails';
import Reply from './pages/Reply';
import PostUpdate from './pages/PostUpdate';
import Home from './pages/Home';

function App() {
  const [user, setUser] = useState<User>();

  return (
    <>
      <UserContext.Provider value={user}>
        <Header/>
        <Routes>
          <Route path="/search" element={<Search/>}/>
          <Route path="/login" element={<Login setUser={setUser}/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/register" element={<Register setUser={setUser}/>}/>
          <Route path="/post" element={<CreatePost/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts/:id" element={<PostDetails/>}/>
          <Route path="/posts/:id/update" element={<PostUpdate/>}/>
          <Route path="/posts/:id/reply" element={<Reply/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
