
import ReactDOM from 'react-dom/client';


import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import RegisterEm from './pages/RegisterEmails';

import App from './App';
import Ayhagah from './pages/volunteer-posts';
import About from './pages/about';
import NavMenu from './components/navbar/NavMenu';
import Login from './pages/login';
import VolunteerPost from './pages/volunteer-posts';
import Register from './pages/register';
import VolunteeringRegister from './pages/volunteering-register';
import Footer from './components/Footer';
import PostDetails from './components/PostDetails';
import Dashboard from './pages/dashboard';
import { AuthProvider } from './components/navbar/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <BrowserRouter>
            <NavMenu />
            <Routes>

                <Route path='/' element={<App />} />
                <Route path='/about' element={<RegisterEm fname="ali" />} />
                <Route path='/ayhagah' element={<Ayhagah />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/volunteering-register' element={<VolunteeringRegister />} />
                <Route path='/volunteer-posts' element={<VolunteerPost />} />
                <Route path="/volunteer-posts/:postId" element={<PostDetails />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </AuthProvider>
);

