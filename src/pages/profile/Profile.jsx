import AdvertsSection from '../../components/advertsListSection/AdvertsSection';
import getAllAdverts from '../../hooks&utils/getAllAdverts';
import AuthPage from '../authentication/AuthPage';
function Profile() {
    return (
        <div id="profile-page">
            <AdvertsSection getAdvertsHandler={getAllAdverts} />
        </div>
    );
}
export default Profile;
