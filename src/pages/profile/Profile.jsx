import AdvertsSection from '../../components/advertsListSection/AdvertsSection';
import getUserAdverts from '../../utils/getUserAdverts';
import AuthPage from '../authentication/AuthPage';
function Profile() {
    return (
        <div id="profile-page">
            <AdvertsSection
                type="full-length"
                header="Twoje ogłoszenia"
                getAdvertsHandler={getUserAdverts}
            />
        </div>
    );
}
export default Profile;
