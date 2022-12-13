import { deleteObject, ref } from 'firebase/storage';
import { lazy, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../config/firebase-config';

const { arrayRemove, deleteDoc, doc, updateDoc } = lazy(() => import('firebase/firestore'));

function AdvertControlPanel({ advert, setIsDeleted, user }) {
    const navigate = useNavigate();
    const [showDeleteConfrim, setShowDeleteConfirm] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleAdvertDelete = async (e) => {
        setIsDisabled(true);
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
        } catch {
            navigate(`/error/Wystąpił-błąd-przy-usuwaniu-ogłoszenia`);
        } finally {
            setIsDisabled(false);
            //handles component rerender on delete
            setIsDeleted(true);
        }
    };
    const handleAdvertEdit = async (e) => {
        e.preventDefault();
        navigate(`/edit-advert/${advert.id}`);
    };

    return (
        <div className="advert-owner-control-container">
            {showDeleteConfrim ? (
                <button className="advert-control-btn confrim" onClick={handleAdvertDelete}>
                    Na pewno?
                </button>
            ) : (
                <button
                    className="advert-control-btn"
                    disabled={isDisabled}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowDeleteConfirm(true);
                    }}>
                    Usuń
                </button>
            )}
            <button className="advert-control-btn" onClick={handleAdvertEdit}>
                Edytuj
            </button>
        </div>
    );
}
export default AdvertControlPanel;
