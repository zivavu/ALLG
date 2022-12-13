import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdvertsSection from '../../components/advertsList/AdvertsSection';

const ProfileView = () => {
    return (
        <>
            <AdvertsSection
                size="full-width"
                type="otherUserAdverts"
                header="Ogłoszenia użytkownika"
                noAdvertsMessage="Ten użytkownik nie ma aktywnych ogłoszeń"
            />
        </>
    );
};
export default ProfileView;
