import AdvertsSection from '../../components/advertsListSection/AdvertsSection';
import AuthPage from '../authentication/AuthPage';
import getUserAdverts from '../../hooks&utils/getUserAdverts';
function Profile() {
    return (
        <div id="profile-page">
            <AdvertsSection getAdvertsHandler={getUserAdverts} />
        </div>
    );
}
export default Profile;
