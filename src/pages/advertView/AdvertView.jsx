import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchSection from '../../components/advertSearch/SearchSection';
import { db, FirebaseStorage } from '../../config/firebase-config';
import './advertView.css';

function AdvertView() {
    const { id } = useParams();
    const [advertData, setAdvertData] = useState({});
    const [imageURL, setImageURL] = useState('');
    const docRef = doc(db, 'adverts', id);

    useEffect(() => {
        getDoc(docRef)
            .then((doc) => {
                if (doc.exists) {
                    setAdvertData(doc.data());
                    downloadImage(doc.data().imagePath);
                } else console.log('This document doesnt exist');
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const downloadImage = (imagePath) => {
        const imagePathRef = ref(FirebaseStorage, `${imagePath}`);
        getDownloadURL(imagePathRef)
            .then((url) => {
                setImageURL(url);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div id="advert-view-page-container">
            <SearchSection />
            <hr />
            <main id="advert-view-main">
                <section id="advert-picture-section">
                    <img src={imageURL}></img>
                </section>

                <div className="advert-info-container" id="advert-basic-info-container">
                    <div className="advert-info-container" id="advert-category-container">
                        <span id="advert-category">
                            {advertData.category && advertData.category.category}
                        </span>
                        <span className="category-separator">&#8250;</span>
                        <span id="adver-sub-category">
                            {advertData.category && advertData.category.subCategory}
                        </span>
                    </div>
                    <span id="advert-title">{advertData.title && advertData.title}</span>
                    <span id="advert-price">
                        {advertData.price && advertData.price}zł
                    </span>
                    <span id="advert-condition">
                        Stan: {advertData.condition && advertData.condition}
                    </span>
                </div>

                <div className="advert-info-container" id="advert-description-container">
                    <h4 id="advert-description-heading">OPIS</h4>
                    <div id="advert-description">
                        {advertData.description && advertData.description}
                    </div>
                </div>
                <div
                    className="advert-info-container"
                    id="advert-owner-profile-container">
                    <div id="profile">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M24 0v24h-24v-24h24zm-6.118 16.064c-2.293-.529-4.427-.993-3.394-2.945 3.146-5.942.834-9.119-2.488-9.119-3.388 0-5.643 3.299-2.488 9.119 1.064 1.963-1.15 2.427-3.394 2.945-2.048.473-2.124 1.49-2.118 3.269l.004.667h15.993l.003-.646c.007-1.792-.062-2.815-2.118-3.29z" />
                        </svg>
                        <span id="profile-name">
                            {advertData.userName && advertData.userName}
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default AdvertView;
