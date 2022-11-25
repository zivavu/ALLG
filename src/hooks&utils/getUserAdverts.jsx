import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useContext } from 'react';
import { db } from '../config/firebase-config';
import { UserContext } from '../pages/authentication/UserContext';

const getUserAdverts = async (setAdvertsData, user) => {
    const docRef = doc(db, 'users', user.uid);
    const usersAdvertsIds = await getDoc(docRef);
    const advertsIds = usersAdvertsIds.data().adverts;
    console.log(advertsIds);

    const q = query(collection(db, 'adverts'), where('id', 'in', advertsIds));
    try {
        await getDocs(q).then((data) => {
            setAdvertsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    } catch {
        (error) => console.log(error);
    }
};
export default getUserAdverts;
