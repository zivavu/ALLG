import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const getUsersAdvertsIDs = async (uid) => {
    const userDocRef = doc(db, 'users', uid);
    const usersAdvertsIds = await getDoc(userDocRef);
    if (!usersAdvertsIds.data()) {
        return [];
    }
    const advertsIds = usersAdvertsIds.data().adverts;
    if (!advertsIds[0]) {
        return [];
    }

    return advertsIds;
};
export default getUsersAdvertsIDs;
