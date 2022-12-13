import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const getAdvertsByIdArr = async (idArr) => {
    if (!idArr[0]) {
        return [];
    }
    //Max number of adverts requests capped to 10 coz of firebase where('in')query  limitations
    if (idArr.length >= 10) idArr = idArr.slice(0, 10);
    const q = query(collection(db, 'adverts'), where('id', 'in', idArr));
    try {
        const data = await getDocs(q);
        if (data.docs) {
            const adverts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            return adverts;
        }
    } catch {
        return [];
    }
};
export default getAdvertsByIdArr;
