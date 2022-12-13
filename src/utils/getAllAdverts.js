import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const getAllAdverts = async () => {
    const data = await getDocs(collection(db, 'adverts'));
    if (data.docs) {
        return data.docs.slice(0, 20).map((doc) => ({ ...doc.data(), id: doc.id }));
    } else {
        return [];
    }
};
export default getAllAdverts;
