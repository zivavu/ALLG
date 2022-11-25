import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const getUserAdverts = async (setAdvertsData, user) => {
    const docRef = doc(db, 'users', user.uid);
    const usersAdvertsIds = await getDoc(docRef);
    const advertsIds = usersAdvertsIds.data().adverts;

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
