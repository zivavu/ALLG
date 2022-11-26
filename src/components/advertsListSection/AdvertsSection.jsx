import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../../config/firebase-config';
import { UserContext } from '../../pages/authentication/UserContext';
import AdvertElement from './AdvertElement';
import './advertsSection.css';

function AdvertsSection({ getAdvertsHandler, header }) {
    const [advertsData, setAdvertsData] = useState([]);
    const [watchedAdverts, setWatchedAdverts] = useState([]);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        getAdvertsHandler(setAdvertsData, user);
        getWatchedAdverts();
    }, []);

    const getWatchedAdverts = async () => {
        const usersRef = doc(db, 'users', user.uid);
        try {
            const docSnap = await getDoc(usersRef);
            setWatchedAdverts(docSnap.data().watched);
        } catch {
            console.log('nie było takiego użytkownika');
        }
    };

    return (
        <section id="home-adverts-section">
            <div id="adverts-list-container">
                <div className="adverts-list-header">
                    <h3>{advertsData[0] ? header : null}</h3>
                </div>
                <div id="adverts-list">
                    {advertsData.map((advert) => (
                        <AdvertElement
                            key={advert.id}
                            advert={advert}
                            showControlPanel={advert.user.uid === user.uid}
                            user={user}
                            isWatchedInit={watchedAdverts.some(
                                (watchedID) => watchedID === advert.id
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
export default AdvertsSection;
