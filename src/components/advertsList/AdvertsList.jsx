import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../pages/authentication/UserContext';
import getAdvertsByIdArr from '../../utils/getAdvertsByIdArr';
import AdvertElement from './AdvertElement';

import './advertsSection.css';

function AdvertsList({
    getAdvertsHandler,
    header,
    noAdvertsMessage,
    size,
    watchedAdverts,
    type,
    userSearchInput,
}) {
    const [advertsData, setAdvertsData] = useState([]);
    const [dynamicHeader, setDynamicHeader] = useState(header);
    const { user } = useContext(UserContext);
    //is set to true when any advert got deleted by user
    const [isDeleted, setIsDeleted] = useState(false);

    //used for getting users watched adverts list
    useEffect(() => {
        (async () => {
            if (type === 'watchedAdverts' && watchedAdverts[0]) {
                const data = await getAdvertsByIdArr(watchedAdverts);
                setAdvertsData(data);
            }
        })();
    }, [watchedAdverts]);

    //used for every different type of list
    useEffect(() => {
        if (type === 'watchedAdverts') return;
        (async () => {
            setAdvertsData(await getAdvertsHandler());
            setIsDeleted(false);
        })();
    }, [isDeleted, userSearchInput]);

    //used for displaying name of user that is being viewed
    const { otherUserUID } = useParams();
    useEffect(() => {
        if (otherUserUID && advertsData[0]) {
            setDynamicHeader(`${header} ${advertsData[0].user.displayName}`);
        }
    }, [advertsData]);

    return (
        <section id="adverts-section">
            <div id="adverts-list-container">
                <div className="adverts-list-header">
                    <h3>{advertsData[0] ? dynamicHeader : noAdvertsMessage}</h3>
                </div>
                <div className={size}>
                    {advertsData[0]
                        ? advertsData.map((advert) => (
                              <AdvertElement
                                  size={size}
                                  key={advert.id}
                                  setIsDeleted={setIsDeleted}
                                  advert={advert}
                                  //true if user that is author of the advert is the same user that is logged in
                                  showControlPanel={advert.user.uid === user.uid}
                                  user={user}
                                  //true if advert id was found in firebase user watched adverts doc
                                  isWatchedServerResponse={watchedAdverts.some(
                                      (watchedID) => watchedID === advert.id
                                  )}
                              />
                          ))
                        : null}
                </div>
            </div>
        </section>
    );
}
export default AdvertsList;
