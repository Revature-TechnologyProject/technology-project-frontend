import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';
import { User, UserContext } from './context/userContext';
import CreatePost from './pages/Post';


function App() {
  const [user, setUser] = useState<User>();
  
  return (
    <>
      <UserContext.Provider value={user}>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser}/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/register" element={<Register setUser={setUser}/>}/>
          <Route path="/post" element={<CreatePost/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/profile/update" element={<ProfileUpdate setUser={setUser}/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
