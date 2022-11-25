import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const getAllAdverts = async (setAdvertsData) => {
    const data = await getDocs(collection(db, 'adverts'));
    setAdvertsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};
export default getAllAdverts;
