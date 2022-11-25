import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseStorage } from '../../config/firebase-config';

const AdvertElement = ({ advert }) => {
    const [imageURL, setImageURL] = useState('');
    const [imageLoading, setImageLoading] = useState(true);

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

    return (
        <Link className="advert-element-container" to={`/advert/${advert.id}`}>
            {imageLoading ? (
                <div className="lds-hourglass"></div>
            ) : (
                <img src={imageURL} alt="Przedmiot ogłoszenia" />
            )}
            <div className="home-advert-info">
                <div className="home-advert-title">{advert.title}</div>
                <div className="home-advert-details">
                    <div className="advert-price">{advert.price}zł</div>
                    <div className="advert-location">{advert.city.name}</div>
                    <div className="advert-condition">{advert.condition}</div>
                </div>
            </div>
        </Link>
    );
};

export default AdvertElement;
