import React, { useEffect, useState } from 'react';
import { Route, Routes, UNSAFE_RouteContext, useParams } from 'react-router-dom';
import SiteHeader from './components/header/SiteHeader.jsx';
import { auth } from './config/firebase-config.js';
import './main.css';
import AdvertForm from './pages/addAdvert/AdvertForm.jsx';
import AdvertView from './pages/advertView/AdvertView.jsx';
import AuthPage from './pages/authentication/AuthPage.jsx';
import { UserContext } from './pages/authentication/UserContext.jsx';
import HomePage from './pages/homePage/Home.jsx';
import Profile from './pages/profile/Profile.jsx';
import Steared from './pages/profile/Steared.jsx';

<style>
    @import
    url('https://fonts.googleapis.com/css2?family=Aclonica&family=Secular+One&display=swap');
</style>;

function App() {
    const [user, setUser] = useState({ uid: '', displayName: '' });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <>
            <UserContext.Provider value={[user, setUser]}>
                <SiteHeader />
                <Routes>
                    <Route path="/advert/:id" element={<AdvertView />}></Route>
                    <Route
                        path="/profile"
                        element={
                            !user || user.uid == '' ? <AuthPage /> : <Profile />
                        }></Route>
                    <Route
                        path="/new-advert"
                        element={
                            !user || user.uid == '' ? <AuthPage /> : <AdvertForm />
                        }></Route>
                    <Route path="/" element={<HomePage />}></Route>
                </Routes>
            </UserContext.Provider>
        </>
    );
}

export default App;
