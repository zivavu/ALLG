import { getDownloadURL, ref } from 'firebase/storage';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FirebaseStorage } from '../../config/firebase-config';

const AdvertElement = ({ advert }) => {
    const [imageURL, setImageURL] = useState('');
    const downloadImage = () => {
        const imagePathRef = ref(FirebaseStorage, `${advert.imagePath}`);
        getDownloadURL(imagePathRef)
            .then((url) => {
                setImageURL(url);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    downloadImage();
    return (
        <Link className="advert-element-container" to={`/advert/${advert.id}`}>
            <img src={imageURL} alt="Przedmiot ogłoszenia" />
            <div className="home-advert-info">
                <div className="home-advert-title">{advert.title}</div>
                <div className="home-advert-details">
                    <div className="advert-price">{advert.price}zł</div>
                    <div className="advert-location">{advert.city}</div>
                    <div className="advert-condition">{advert.condition}</div>
                </div>
            </div>
        </Link>
    );
};

export default AdvertElement;
