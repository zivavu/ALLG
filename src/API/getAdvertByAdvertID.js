import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

async function getAdvertByAdvertId() {
    const docRef = doc(db, 'adverts', '5gbOI0F1rJPFtdPlA5ho');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log('No such document');
    }
}

export default getAdvertByAdvertId;
