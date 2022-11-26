import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, FirebaseStorage } from '../../config/firebase-config';
import AdvertControlPanel from './AdvertControlPanel';
import WatchAdvertButton from './WatchAdvertButton';

const AdvertElement = ({ advert, showControlPanel, user, isWatchedInit }) => {
    const [imageURL, setImageURL] = useState('');
    const [imageLoading, setImageLoading] = useState(true);
    const [isWatched, setIsWatched] = useState(isWatchedInit);

    const downloadImage = () => {
        setImageLoading(true);
        const imagePathRef = ref(FirebaseStorage, `${advert.imagePath}`);
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
                <div className="advert-li-title">{advert.title}</div>
                <div className="advert-li-details">
                    <div className="advert-price">{advert.price}zł</div>
                    <div className="advert-location">{advert.city.name}</div>
                    <div className="advert-condition">{advert.condition}</div>
                    <WatchAdvertButton
                        isWatched={isWatched}
                        setIsWatched={setIsWatched}
                        addToUsersWatchedAdverts={addToUsersWatchedAdverts}
                        rmFromUsersWatchedAdverts={rmFromUsersWatchedAdverts}
                    />
                </div>
            </div>
            {showControlPanel ? <AdvertControlPanel /> : null}
        </Link>
    );
};

export default AdvertElement;
