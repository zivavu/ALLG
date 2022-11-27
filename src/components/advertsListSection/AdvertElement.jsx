import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, storage } from '../../config/firebase-config';
import AdvertControlPanel from './AdvertControlPanel';
import WatchAdvertButton from './WatchAdvertButton';

const AdvertElement = ({
    advert,
    showControlPanel,
    user,
    isWatchedServerResponse,
    size,
    setIsDeleted,
}) => {
    const [imageURL, setImageURL] = useState('');
    const [imageLoading, setImageLoading] = useState(true);
    const [isWatched, setIsWatched] = useState(false);

    useEffect(() => {
        setIsWatched(isWatchedServerResponse);
    }, [isWatchedServerResponse]);

    const downloadImage = () => {
        setImageLoading(true);
        const imagePathRef = ref(storage, `${advert.imagePath}`);
        getDownloadURL(imagePathRef)
            .then((url) => {
                setImageURL(url);
                setImageLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        downloadImage();
    }, []);

    const addToUsersWatchedAdverts = async () => {
        const watchedAdvertsRef = doc(db, 'users', user.uid);
        try {
            await updateDoc(watchedAdvertsRef, {
                watched: arrayUnion(advert.id),
            });
        } catch {
            console.log('stared not addded');
        }
    };
    const rmFromUsersWatchedAdverts = async () => {
        const watchedAdvertsRef = doc(db, 'users', user.uid);
        try {
            await updateDoc(watchedAdvertsRef, {
                watched: arrayRemove(advert.id),
            });
        } catch {
            console.log('stared not addded');
        }
    };

    return (
        <Link className="advert-li-container" to={`/advert/${advert.id}`}>
            {imageLoading ? (
                <div className="lds-hourglass"></div>
            ) : (
                <img src={imageURL} alt="Przedmiot ogłoszenia" />
            )}
            <div className="advert-li-info">
                <div className="advert-li-main-info">
                    <span className="advert-li-category">
                        <span>{advert.category ? advert.category.category : null}</span>
                        <span> &#8250; </span>
                        <span>
                            {advert.category ? advert.category.subCategory : null}
                        </span>
                    </span>
                    <div className="advert-li-title">{advert.title}</div>
                    <div className="advert-li-views">Wyświetlono {advert.views} razy</div>
                </div>
                {showControlPanel && size != 'half-width' ? (
                    <AdvertControlPanel
                        advert={advert}
                        setIsDeleted={setIsDeleted}
                        user={user}
                    />
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
