import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../../config/firebase-config';

function AdvertControlPanel({ advert, setIsDeleted, user }) {
    const handleAdvertDelete = async (e) => {
        e.preventDefault();
        e.target.disabled = true;
        const imageToDeleteRef = ref(storage, advert.imagePath);
        const userDocRef = doc(db, 'users', user.uid);
        try {
            await deleteDoc(doc(db, 'adverts', advert.id));
            await deleteObject(imageToDeleteRef);
            await updateDoc(userDocRef, {
                adverts: arrayRemove(advert.id),
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsDeleted(true);
        }
    };
    return (
        <div className="advert-owner-control-container">
            <button onClick={handleAdvertDelete}>Usuń</button>
        </div>
    );
}
export default AdvertControlPanel;
