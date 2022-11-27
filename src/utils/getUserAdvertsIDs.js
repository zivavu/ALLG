import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const getUserAdvertsIDs = async (user) => {
    const userDocRef = doc(db, 'users', user.uid);
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
export default getUserAdvertsIDs;
