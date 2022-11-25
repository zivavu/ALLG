import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useContext } from 'react';
import { db } from '../config/firebase-config';
import { UserContext } from '../pages/authentication/UserContext';

const getUserAdverts = async (setAdvertsData, user) => {
    const docRef = doc(db, 'users', user.uid);
    const usersAdvertsIds = await getDoc(docRef);
    const advertsIds = usersAdvertsIds.data().adverts;

    const q = query(
        collection(db, 'adverts'),
        where('id', '==', '86ace0fd-c98b-4fb7-b450-7b8e5676894f')
    );

    try {
        await getDocs(q).then((data) => {
            setAdvertsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    } catch {
        (error) => console.log(error);
    }
};
export default getUserAdverts;
