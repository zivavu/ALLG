import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdvertsList from '../../components/advertsList/AdvertsList';

const ProfileView = () => {
    return (
        <>
            <AdvertsList
                size="full-width"
                type="otherUserAdverts"
                header="Ogłoszenia użytkownika"
                noAdvertsMessage="Ten użytkownik nie ma aktywnych ogłoszeń"
            />
        </>
    );
};
export default ProfileView;
