import { useContext } from 'react';
import AdvertsList from '../../components/advertsList/AdvertsList';
import getAdvertsByIdArr from '../../utils/getAdvertsByIdArr';
import getUsersAdvertsIDs from '../../utils/getUsersAdvertsIDs';
import { UserContext } from '../authentication/UserContext';
import './Profile.css';
import ProfileControlPanel from './ProfileControlPanel';

function Profile() {
    const { user } = useContext(UserContext);

    const handleGetUsersAdverts = async () => {
        const IDs = await getUsersAdvertsIDs(user.uid);
        return await getAdvertsByIdArr(IDs);
    };

    return (
        <div id="profile-page-container">
            <ProfileControlPanel />
            <AdvertsList
                getAdvertsHandler={handleGetUsersAdverts}
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
