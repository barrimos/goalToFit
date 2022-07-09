import React from 'react';
import { Switch, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import '../src/style/dist/main.css';

import LoginPage from './Pages/LogInPage/LoginPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import RegisterFormPage from './Pages/RegisterFormPage/RegisterFormPage';
import ActivityReportPage from './Pages/ActivityReportPage/ActivityReportPage';
import ActivityCreatePage from './Pages/ActivityCreatePage/ActivityCreatePage';
import ActivityStartPage from './Pages/ActivityStartPage/ActivityStartPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import IndexPage from './Pages/IndexPage/IndexPage';
import Page404 from './Pages/Page404/Page404';
import ResetPassPage from './Pages/ResetPassPage/ResetPassPage';
import TeamPage from './Pages/TeamPage/TeamPage';

function App() {
  window.onunload = function(){
    sessionStorage.removeItem("dataUserRegister");
    sessionStorage.removeItem("dayAndTime");
    sessionStorage.removeItem("completeAllData");
    // sessionStorage.removeItem("email");
  }
  return (
    <Routes>
      <Route path='/' element={<IndexPage/>} />
      <Route path='login' element={<LoginPage/>} />
      <Route path='reset_password' element={<ResetPassPage/>} />
      <Route path='signup' element={<SignUpPage/>} />
      <Route path='register' element={<RegisterFormPage/>} />
      <Route path='report' element={<ActivityReportPage/>} />
      <Route path='create' element={<ActivityCreatePage/>} />
      <Route path='start' element={<ActivityStartPage/>} />
      <Route path='profile' element={<ProfilePage/>} />
      <Route path='team' element={<TeamPage/>}/>
      <Route path='*' element={<Page404/>} />
    </Routes>
  );
}

export default App;