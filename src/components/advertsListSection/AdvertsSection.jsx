import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import { UserContext } from '../../pages/authentication/UserContext';
import getAdvertsByIdArr from '../../utils/getAdvertsByIdArr';
import getAdvertsByUserInput from '../../utils/getAdvertsByUserInput';
import getAllAdverts from '../../utils/getAllAdverts';
import getUserAdvertsIDs from '../../utils/getUserAdvertsIDs';
import getWatchedAdvertsIds from '../../utils/getWatchedAdvertsIds';
import AdvertElement from './AdvertElement';

import './advertsSection.css';

function AdvertsSection({ type, header, size, noAdvertsMessage, userSearchInput }) {
    const [advertsData, setAdvertsData] = useState([]);
    const [watchedAdverts, setWatchedAdverts] = useState([]);

    //set to true when any advert got deleted by user
    const [dynamicHeader, setDynamicHeader] = useState(header);
    const [isDeleted, setIsDeleted] = useState(false);
    const [user, setUser] = useContext(UserContext);

    //used only when viewing other user adverts
    const { otherUserUID } = useParams(user);
    useEffect(() => {
        if (otherUserUID && advertsData[0]) {
            setDynamicHeader(`${header} ${advertsData[0].user.displayName}`);
        }
    }, [advertsData]);

    useEffect(() => {
        switch (type) {
            case 'allAdverts':
                getAllAdverts(setAdvertsData);
                break;
            case 'usersAdverts':
                getUserAdvertsIDs(user.uid).then((ids) => {
                    getAdvertsByIdArr(ids, setAdvertsData);
                });
                break;
            case 'watchedAdverts':
                getAdvertsByIdArr(watchedAdverts, setAdvertsData);
                break;
            case 'otherUserAdverts':
                getUserAdvertsIDs(otherUserUID).then((ids) => {
                    getAdvertsByIdArr(ids, setAdvertsData);
                });
                break;
            case 'advertsByUserInput':
                console.log('goin in ');
                getAdvertsByUserInput(userSearchInput, setAdvertsData);
                break;
        }
    }, [isDeleted, watchedAdverts, userSearchInput]);

    useEffect(() => {
        getWatchedAdvertsIds(setWatchedAdverts, user);
    }, [user, setUser]);

    return (
        <section id="adverts-section">
            <div id="adverts-list-container">
                <div className="adverts-list-header">
                    <h3>{advertsData[0] ? dynamicHeader : noAdvertsMessage}</h3>
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
