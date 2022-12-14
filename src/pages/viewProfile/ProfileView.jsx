import { useParams } from 'react-router-dom';
import AdvertsList from '../../components/advertsList/AdvertsList';
import getAdvertsByIdArr from '../../utils/getAdvertsByIdArr';
import getUsersAdvertsIDs from '../../utils/getUsersAdvertsIDs';

//Conponent for viewing other users profiles
const ProfileView = () => {
    const { otherUserUID } = useParams();
    const handleViewUsersAdverts = async () => {
        const IDs = await getUsersAdvertsIDs(otherUserUID);
        return await getAdvertsByIdArr(IDs);
    };

    return (
        <>
            <AdvertsList
                getAdvertsHandler={handleViewUsersAdverts}
                size="full-width"
                type="otherUserAdverts"
                header="Ogłoszenia użytkownika"
                noAdvertsMessage="Ten użytkownik nie ma aktywnych ogłoszeń"
            />
        </>
    );
};
export default ProfileView;
