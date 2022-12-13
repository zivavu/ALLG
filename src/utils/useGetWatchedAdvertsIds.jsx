import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase-config';
import { UserContext } from '../pages/authentication/UserContext';

const useGetWatchedAdvertsIds = () => {
    const { user, setUser, isUserAuthed } = useContext(UserContext);
    const [watchedAdverts, setWatchedAdverts] = useState([]);

    useEffect(() => {
        const getWatchedAdverts = async () => {
            if (!isUserAuthed) return;
            const userRef = doc(db, 'users', user.uid);
            try {
                const docSnap = await getDoc(userRef);
                if (docSnap.data().watched) {
                    setWatchedAdverts(docSnap.data().watched);
                } else {
                    setWatchedAdverts([]);
                }
            } catch {
                setWatchedAdverts([]);
            }
        };
        getWatchedAdverts();
    }, [user, setUser]);
    return { watchedAdverts };
};
export default useGetWatchedAdvertsIds;
