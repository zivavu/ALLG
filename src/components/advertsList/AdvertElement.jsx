import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import useDownloadImage from '../../utils/useDownloadImage';
import AdvertControlPanel from './AdvertControlPanel';
import WatchAdvertButton from './WatchAdvertButton';

const AdvertElement = ({ advert, showControlPanel, user, isWatchedServerResponse, size, setIsDeleted }) => {
    const [isWatched, setIsWatched] = useState(false);
    const [mainError, setMainError] = useState();

    const { imageURL, isImageLoading } = useDownloadImage(advert.imagePath);

    useEffect(() => {
        setIsWatched(isWatchedServerResponse);
    }, [isWatchedServerResponse]);

    //hides error 2secs after it appears
    useEffect(() => {
        setTimeout(() => {
            setMainError();
        }, 2000);
    }, [mainError]);

    const addToUsersWatchedAdverts = async () => {
        const watchedAdvertsRef = doc(db, 'users', user.uid);
        try {
            await updateDoc(watchedAdvertsRef, {
                watched: arrayUnion(advert.id),
            });
        } catch {
            setMainError('Nie udało się zaobserwować');
        }
    };
    const rmFromUsersWatchedAdverts = async () => {
        const watchedAdvertsRef = doc(db, 'users', user.uid);
        try {
            await updateDoc(watchedAdvertsRef, {
                watched: arrayRemove(advert.id),
            });
        } catch {
            setMainError('Nie udało się usunąć z obserwowanych');
        }
    };

    return (
        <Link className="advert-li-container" to={`/advert/${advert.id}`}>
            {isImageLoading ? (
                <div className="lds-hourglass"></div>
            ) : (
                <div className="image-container">
                    <LazyLoadImage src={imageURL} alt="Przedmiot ogłoszenia" />
                </div>
            )}
            <div className="advert-li-info">
                <div className="advert-li-main-info">
                    <div className="advert-li-category">
                        <span>{advert.category ? advert.category.category : null}</span>
                        <span> &#8250; </span>
                        <span>{advert.category ? advert.category.subCategory : null}</span>
                    </div>
                    <div className="advert-li-title">{advert.title}</div>
                    <div className="advert-li-views">Wyświetlono {advert.views} razy</div>
                    <div className="advert-element-error-display">{mainError ? mainError : null}</div>
                </div>
                {showControlPanel && size !== 'half-width' ? (
                    <AdvertControlPanel advert={advert} setIsDeleted={setIsDeleted} user={user} />
                ) : null}
                <div className="advert-li-details">
                    <span className="advert-price">{advert.price}zł</span>
                    <span className="advert-location">{advert.city.name}</span>
                    <span className="advert-condition">{advert.condition}</span>

                    <WatchAdvertButton
                        advert={advert}
                        user={user}
                        isWatched={isWatched}
                        setIsWatched={setIsWatched}
                        addToUsersWatchedAdverts={addToUsersWatchedAdverts}
                        rmFromUsersWatchedAdverts={rmFromUsersWatchedAdverts}
                    />
                </div>
            </div>
        </Link>
    );
};

export default AdvertElement;
