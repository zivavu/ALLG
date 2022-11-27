import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdvertsSection from '../../components/advertsListSection/AdvertsSection';

const ProfileView = () => {
    const { otherUserUID } = useParams();
    const [profileData, setProfileData] = useState({});

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
