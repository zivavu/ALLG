import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const getAdvertsByIdArr = async (idArr, setAdvertsData) => {
    if (!idArr[0]) {
        setAdvertsData([]);
        return;
    }
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
        (error) => console.log(error);
    }
};
export default getAdvertsByIdArr;
