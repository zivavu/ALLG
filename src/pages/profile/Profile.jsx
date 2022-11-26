import { useContext } from 'react';
import AdvertsSection from '../../components/advertsListSection/AdvertsSection';
import getUserAdverts from '../../utils/getUserAdverts';
import AuthPage from '../authentication/AuthPage';
import { UserContext } from '../authentication/UserContext';

function Profile() {
    return (
        <div id="profile-page">
            <AdvertsSection
                type="full-length"
                header="Twoje ogłoszenia"
                noAdvertsMessage="Nie dodałeś jeszcze żadnych ogłoszeń"
                getAdvertsHandler={getUserAdverts}
            />
        </div>
    );
}
export default Profile;
