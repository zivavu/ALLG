import { collection, getDoc, getDocs, getDocsFromServer } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { db, FirebaseStorage } from '../../config/firebase-config';
import AdvertElement from './AdvertElement';
import './advertsSection.css';

function AdvertsSection() {
    const [advertsData, setAdvertsData] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(collection(db, 'adverts'));
            setAdvertsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
    }, []);

    return (
        <section id="home-adverts-section">
            <div id="adverts-list-container">
                {advertsData.map((advert) => (
                    <AdvertElement key={advert.id} advert={advert} />
                ))}
            </div>
        </section>
    );
}
export default AdvertsSection;
