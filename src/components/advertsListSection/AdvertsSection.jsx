import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../../config/firebase-config';
import { UserContext } from '../../pages/authentication/UserContext';
import getAdvertsByIdArr from '../../utils/getAdvertsByIdArr';
import getAllAdverts from '../../utils/getAllAdverts';
import getUserAdvertsIDs from '../../utils/getUserAdvertsIDs';
import getWatchedAdvertsIds from '../../utils/getWatchedAdvertsIds';
import AdvertElement from './AdvertElement';

import './advertsSection.css';

function AdvertsSection({ type, header, size, noAdvertsMessage }) {
    const [advertsData, setAdvertsData] = useState([]);
    const [watchedAdverts, setWatchedAdverts] = useState([]);

    //set to true when any advert got deleted by user
    const [isDeleted, setIsDeleted] = useState(false);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        switch (type) {
            case 'allAdverts':
                getAllAdverts(user, setAdvertsData);
                break;
            case 'usersAdverts':
                setTimeout(() => {
                    getUserAdvertsIDs(user).then((ids) => {
                        getAdvertsByIdArr(ids, setAdvertsData);
                    });
                }, 150);
                break;
            case 'watchedAdverts':
                getAdvertsByIdArr(watchedAdverts, setAdvertsData);
                break;
        }
    }, [isDeleted, watchedAdverts]);

    useEffect(() => {
        getWatchedAdvertsIds(setWatchedAdverts, user);
    }, [user, setUser]);

    return (
        <section id="adverts-section">
            <div id="adverts-list-container">
                <div className="adverts-list-header">
                    <h3>{advertsData[0] ? header : noAdvertsMessage}</h3>
                </div>
                <div className={size}>
                    {advertsData.map((advert) => (
                        <AdvertElement
                            size={size}
                            key={advert.id}
                            setIsDeleted={setIsDeleted}
                            advert={advert}
                            showControlPanel={advert.user.uid === user.uid}
                            user={user}
                            //true if advert id was found in firebase user watched adverts doc
                            isWatchedServerResponse={watchedAdverts.some(
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
