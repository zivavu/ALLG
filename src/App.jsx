import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import SiteHeader from './components/header/SiteHeader.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { auth } from './config/firebase-config.js';
import './main.css';
import { UserContext } from './pages/authentication/UserContext.jsx';
import ErrorPage from './pages/errorPage/ErrorPage.jsx';
import HomePage from './pages/homePage/Home.jsx';

<style>
    @import url('https://fonts.googleapis.com/css2?family=Aclonica&family=Secular+One&display=swap');
</style>;

const Profile = lazy(() => import('./pages/myProfile/ProfileContainer.jsx'));
const ProfileView = lazy(() => import('./pages/viewProfile/ProfileView.jsx'));
const AdvertView = lazy(() => import('./pages/advertView/AdvertView.jsx'));
const EditAdvertForm = lazy(() => import('./pages/manageAdvert/EditAdvertForm.jsx'));
const NewAdvertForm = lazy(() => import('./pages/manageAdvert/NewAdvertForm.jsx'));
const AuthPage = lazy(() => import('./pages/authentication/AuthPage.jsx'));

function App() {
    const [user, setUser] = useState({ uid: '', displayName: '' });
    const [isUserAuthed, setIsUserAuthed] = useState(false);

    //handle user auth persistance
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((providedUser) => {
            if (providedUser) {
                setUser(providedUser);
                setIsUserAuthed(true);
            } else {
                setUser({ uid: '', displayName: '' });
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!user.uid || user.uid === '') {
            setIsUserAuthed(false);
        } else {
            setIsUserAuthed(true);
        }
    }, [user, setUser]);

    return (
        <>
            <UserContext.Provider value={{ user, setUser, isUserAuthed, setIsUserAuthed }}>
                <SiteHeader />
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/advert/:id" element={<AdvertView />}></Route>
                        <Route path="/re-authenticate" element={<AuthPage type="reAuth" />}></Route>
                        {/* route to view other users profiles */}
                        <Route path="/profile/:otherUserUID" element={<ProfileView />}></Route>

                        {/* route only for users that are logged in  */}
                        <Route element={<ProtectedRoute isUserAuthed={isUserAuthed} />}>
                            <Route path="/new-advert" element={<NewAdvertForm />}></Route>
                            <Route path="/edit-advert/:id" element={<EditAdvertForm />}></Route>
                            {/* route to view active user profile */}
                            <Route path="/my-profile" element={<Profile />}></Route>
                        </Route>

                        <Route path="/error/:error" element={<ErrorPage />}></Route>
                        <Route path="*" element={<ErrorPage />}></Route>
                    </Routes>
                </Suspense>
            </UserContext.Provider>
        </>
    );
}

export default App;
