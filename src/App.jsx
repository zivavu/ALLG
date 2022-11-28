import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteHeader from './components/header/SiteHeader.jsx';
import { auth } from './config/firebase-config.js';
import './main.css';
import AdvertForm from './pages/addAdvert/AdvertForm.jsx';
import AdvertView from './pages/advertView/AdvertView.jsx';
import AuthPage from './pages/authentication/AuthPage.jsx';
import { UserContext } from './pages/authentication/UserContext.jsx';
import HomePage from './pages/homePage/Home.jsx';
import Profile from './pages/myProfile/Profile.jsx';
import ProfileView from './pages/viewProfile/ProfileView.jsx';

<style>
    @import
    url('https://fonts.googleapis.com/css2?family=Aclonica&family=Secular+One&display=swap');
</style>;

function App() {
    const [user, setUser] = useState({ uid: '', displayName: '' });

    //handle user auth persistance
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((providedUser) => {
            if (providedUser) {
                setUser(providedUser);
            } else setUser({ uid: '', displayName: '' });
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
                        path="/new-advert"
                        element={
                            !user || user.uid == '' ? (
                                <AuthPage type="auth" />
                            ) : (
                                <AdvertForm />
                            )
                        }></Route>

                    {/* route to view other users profiles */}
                    <Route
                        path="/profile/:otherUserUID"
                        element={<ProfileView />}></Route>

                    {/* route to view active user profile */}
                    <Route
                        path="/my-profile"
                        element={
                            !user || user.uid == '' ? (
                                <AuthPage type="auth" />
                            ) : (
                                <Profile />
                            )
                        }></Route>
                    <Route
                        path="/re-authenticate"
                        element={<AuthPage type="reAuth" />}></Route>
                    <Route path="/" element={<HomePage />}></Route>
                </Routes>
            </UserContext.Provider>
        </>
    );
}

export default App;
