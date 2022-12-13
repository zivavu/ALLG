import AdvertsList from '../../components/advertsList/AdvertsList';
import './Profile.css';
import ProfileControlPanel from './ProfileControlPanel';
function Profile() {
    return (
        <div id="profile-page-container">
            <ProfileControlPanel />
            <AdvertsList
                size="full-width"
                type="usersAdverts"
                header="Twoje ogłoszenia"
                noAdvertsMessage="Nie dodałeś jeszcze żadnych ogłoszeń"
            />
            <AdvertsList
                size="full-width"
                type="watchedAdverts"
                header="Obserowane ogłoszenia"
                noAdvertsMessage="Nie obserwujesz jeszcze żadnych ogłoszeń"
            />
        </div>
    );
}
export default Profile;
