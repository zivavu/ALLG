import { collection, getDoc, getDocs, getDocsFromServer } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import { db, FirebaseStorage } from '../../config/firebase-config';
import getAllAdverts from '../../hooks/useGetAdverts';
import AdvertElement from './AdvertElement';
import './advertsSection.css';

function AdvertsSection() {
    const [advertsData, setAdvertsData] = useState([]);

    useEffect(() => {
        getAllAdverts(setAdvertsData);
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
