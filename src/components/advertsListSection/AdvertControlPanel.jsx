import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../../config/firebase-config';

function AdvertControlPanel({ advert, setIsDeleted, user }) {
    const handleAdvertDelete = async (e) => {
        e.preventDefault();
        const imageToDeleteRef = ref(storage, advert.imagePath);
        const userDocRef = doc(db, 'users', user.uid);
        try {
            console.log('0');
            await deleteDoc(doc(db, 'adverts', advert.id));
            console.log('1');
            await deleteObject(imageToDeleteRef);
            console.log('2');
            await updateDoc(userDocRef, {
                adverts: arrayRemove(advert.id),
            });
            console.log('3');
            setIsDeleted(true);
            console.log('4');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="advert-owner-control-container">
            <button onClick={handleAdvertDelete}>Usuń</button>
        </div>
    );
}
export default AdvertControlPanel;
