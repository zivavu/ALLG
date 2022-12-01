import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const getWatchedAdvertsIds = async (setWatchedAdverts, user) => {
    if (!user || user.uid === '') return;
    const userRef = doc(db, 'users', user.uid);
    try {
        await getDoc(userRef).then((doc) => {
            if (doc.data().watched) setWatchedAdverts(doc.data().watched);
            else {
                setWatchedAdverts([]);
                return;
            }
        });
    } catch {
        setWatchedAdverts([]);
    }
};
export default getWatchedAdvertsIds;
