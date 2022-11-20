import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import NewCities from './API/NewCities.jsx';
import SiteHeader from './components/header/SiteHeader.jsx';
import './main.css';
import AdvertForm from './pages/addAdvert/AdvertForm.jsx';
import AdvertView from './pages/advertView/AdvertView.jsx';
import HomePage from './pages/homePage/Home.jsx';
import Profile from './pages/profile/Profile.jsx';
import Steared from './pages/profile/Steared.jsx';

<style>
    @import
    url('https://fonts.googleapis.com/css2?family=Aclonica&family=Secular+One&display=swap');
</style>;

function App() {
    return (
        <>
            <SiteHeader />
            <Routes>
                <Route path="/advert/:id" element={<AdvertView />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/new-advert" element={<AdvertForm />}></Route>
                <Route path="/" element={<HomePage />}></Route>
            </Routes>
        </>
    );
}

export default App;
