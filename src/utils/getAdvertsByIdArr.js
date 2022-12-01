import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const getAdvertsByIdArr = async (idArr, setAdvertsData) => {
    if (!idArr[0]) {
        setAdvertsData([]);
        return;
    }
    //Max number of adverts requests capped to 10 coz of firebase query 'in' limitations
    if (idArr.length >= 10) idArr = idArr.slice(0, 10);
    const q = query(collection(db, 'adverts'), where('id', 'in', idArr));
    try {
        await getDocs(q).then((data) => {
            if (data.docs) {
                setAdvertsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } else {
                return;
            }
        });
    } catch {
        setAdvertsData([]);
    }
};
export default getAdvertsByIdArr;
