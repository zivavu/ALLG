import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../config/firebase-config';

function AdvertControlPanel({ advert, setIsDeleted }) {
    const handleAdvertDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteDoc(doc(db, 'adverts', advert.id));
            setIsDeleted(true);
        } catch {
            console.log('nie udało się usunąć ogłoszenia ');
        }
    };
    return (
        <div className="advert-owner-control-container">
            <button onClick={handleAdvertDelete}>Usuń</button>
        </div>
    );
}
export default AdvertControlPanel;
