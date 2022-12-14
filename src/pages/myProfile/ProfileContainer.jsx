import { useContext, useEffect, useState } from 'react';
import AdvertsList from '../../components/advertsList/AdvertsList';
import getAdvertsByIdArr from '../../utils/getAdvertsByIdArr';
import getUsersAdvertsIDs from '../../utils/getUsersAdvertsIDs';
import useGetWatchedAdvertsIds from '../../utils/useGetWatchedAdvertsIds';
import { UserContext } from '../authentication/UserContext';
import './Profile.css';
import ProfileControlPanel from './ProfileControlPanel';

function Profile() {
    const { user } = useContext(UserContext);
    const { watchedAdverts } = useGetWatchedAdvertsIds();

    const handleGetUsersAdverts = async () => {
        const IDs = await getUsersAdvertsIDs(user.uid);
        return await getAdvertsByIdArr(IDs);
    };

    const handleGetWatchedAdverts = async () => {
        return await getAdvertsByIdArr(watchedAdverts);
    };

    return (
        <div id="profile-page-container">
            <ProfileControlPanel />
            <AdvertsList
                getAdvertsHandler={handleGetUsersAdverts}
                size="full-width"
                header="Twoje ogłoszenia"
                noAdvertsMessage="Nie dodałeś jeszcze żadnych ogłoszeń"
                watchedAdverts={watchedAdverts}
            />
            <AdvertsList
                getAdvertsHandler={handleGetWatchedAdverts}
                size="full-width"
                header="Obserowane ogłoszenia"
                noAdvertsMessage="Nie obserwujesz jeszcze żadnych ogłoszeń"
                watchedAdverts={watchedAdverts}
                type="watchedAdverts"
            />
        </div>
    );
}
export default Profile;
