import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const getAllAdverts = async (setAdvertsData) => {
    const data = await getDocs(collection(db, 'adverts'));
    if (data.docs) {
        setAdvertsData(
            data.docs.slice(0, 20).map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    } else {
        setAdvertsData([]);
    }
};
export default getAllAdverts;
