import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useState } from 'react';
import { db, storage } from '../../config/firebase-config';

function AdvertControlPanel({ advert, setIsDeleted, user }) {
    const [showDeleteConfrim, setShowDeleteConfirm] = useState(false);

    const handleAdvertDelete = async (e) => {
        e.preventDefault();
        e.target.disabled = true;
        const imageToDeleteRef = ref(storage, advert.imagePath);
        const userDocRef = doc(db, 'users', user.uid);
        try {
            await Promise.all([
                deleteDoc(doc(db, 'adverts', advert.id)),
                deleteObject(imageToDeleteRef),
                updateDoc(userDocRef, {
                    adverts: arrayRemove(advert.id),
                }),
            ]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsDeleted(true);
        }
    };
    return (
        <div className="advert-owner-control-container">
            {showDeleteConfrim ? (
                <button
                    className="advert-delete-btn confrim"
                    onClick={handleAdvertDelete}>
                    Na pewno?
                </button>
            ) : (
                <button
                    className="advert-delete-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowDeleteConfirm(true);
                    }}>
                    Usuń
                </button>
            )}
        </div>
    );
}
export default AdvertControlPanel;
