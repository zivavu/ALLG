import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../pages/authentication/UserContext';
import getAdvertsByIdArr from '../../utils/getAdvertsByIdArr';
import getAdvertsByUserInput from '../../utils/getAdvertsByUserInput';
import getAllAdverts from '../../utils/getAllAdverts';
import getUsersAdvertsIDs from '../../utils/getUsersAdvertsIDs';
import useGetWatchedAdvertsIds from '../../utils/useGetWatchedAdvertsIds';
import AdvertElement from './AdvertElement';

import './advertsSection.css';

function AdvertsList({ type, header, noAdvertsMessage, size, userSearchInput }) {
    const [advertsData, setAdvertsData] = useState([]);
    const [dynamicHeader, setDynamicHeader] = useState(header);
    const { user } = useContext(UserContext);

    //is set to true when any advert got deleted by user
    const [isDeleted, setIsDeleted] = useState(false);

    //used only when viewing other user adverts
    const { otherUserUID } = useParams(user);
    useEffect(() => {
        if (otherUserUID && advertsData[0]) {
            setDynamicHeader(`${header} ${advertsData[0].user.displayName}`);
        }
    }, [advertsData]);

    const { watchedAdverts } = useGetWatchedAdvertsIds();

    //used when user is viewing watched adverts on his profile
    useEffect(() => {
        (async () => {
            if (type === 'watchedAdverts') {
                const data = await getAdvertsByIdArr(watchedAdverts);
                setAdvertsData(data);
            }
        })();
    }, [watchedAdverts]);

    //used for every different type of list
    useEffect(() => {
        let IDs;
        (async () => {
            switch (type) {
                case 'allAdverts':
                    setAdvertsData(await getAllAdverts());
                    break;

                case 'usersAdverts':
                    IDs = await getUsersAdvertsIDs(user.uid);
                    setAdvertsData(await getAdvertsByIdArr(IDs));
                    break;

                case 'otherUserAdverts':
                    IDs = await getUsersAdvertsIDs(otherUserUID);
                    setAdvertsData(await getAdvertsByIdArr(IDs));
                    break;

                case 'advertsByUserInput':
                    setAdvertsData(await getAdvertsByUserInput(userSearchInput));
                    break;
            }

            setIsDeleted(false);
        })();
    }, [isDeleted, userSearchInput]);

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
