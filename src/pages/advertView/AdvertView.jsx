import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import useDownloadImage from '../../utils/useDownloadImage';
import { UserContext } from '../authentication/UserContext';
import './advertView.css';
import FullImageView from './FullImageView';

function AdvertView() {
    const navigate = useNavigate();
    const { user, isUserAuthed } = useContext(UserContext);
    const { id } = useParams();
    const [advertData, setAdvertData] = useState();

    const [viewFullImage, setViewFullImage] = useState(false);

    const { imageURL, isImageLoading } = useDownloadImage(advertData ? advertData.imagePath : '');

    useEffect(() => {
        getAdvertData();
    }, [id]);

    const docRef = doc(db, 'adverts', id);
    const getAdvertData = () => {
        getDoc(docRef)
            .then((doc) => {
                if (doc.data()) {
                    setAdvertData(doc.data());
                    updateFirebaseViewsCounter();
                } else {
                    navigate('/error/Nie-mogliśmy-znaleźć-tego-ogłoszenia');
                }
            })
            .catch(() => {
                navigate('/error/Nie-mogliśmy-znaleźć-tego-ogłoszenia');
            });
    };

    const updateFirebaseViewsCounter = () => {
        updateDoc(docRef, {
            views: increment(1),
        });
    };

    return (
        <div id="advert-view-page-container">
            {viewFullImage ? (
                <FullImageView
                    imageURL={imageURL}
                    advertData={advertData}
                    setViewFullImage={setViewFullImage}
                />
            ) : null}
            <main id="advert-view-main">
                <section id="advert-picture-section">
                    {isImageLoading ? (
                        <div className="placeholder">
                            <div className="animated-background"></div>
                        </div>
                    ) : (
                        <img
                            className="normal-size-image"
                            onClick={() => {
                                document.body.scrollTop = document.documentElement.scrollTop = 0;
                                setViewFullImage(!viewFullImage);
                            }}
                            alt="Przedmiot ogłoszenia"
                            src={imageURL}></img>
                    )}
                </section>

                <div className="advert-info-container" id="advert-basic-info-container">
                    <div className="advert-info-container" id="advert-category-container">
                        <span>
                            <span id="advert-category">
                                {advertData ? advertData.category.category : null}
                            </span>
                            <span className="category-separator">&#8250;</span>
                            <span id="adver-sub-category">
                                {advertData ? advertData.category.subCategory : null}
                            </span>
                        </span>
                    </div>
                    <span id="advert-title">{advertData ? advertData.title : null}</span>
                    <span id="advert-city">{advertData ? advertData.city.name : null}</span>
                    <span id="advert-price">{advertData ? advertData.price : null}zł</span>
                    <span id="advert-condition">Stan: {advertData ? advertData.condition : null}</span>
                </div>

                <div className="advert-info-container" id="advert-description-container">
                    <h4 id="advert-description-heading">OPIS</h4>
                    <div id="advert-description">{advertData ? advertData.description : null}</div>
                </div>
                <div className="advert-info-container" id="advert-owner-profile-container">
                    <div id="profile">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M24 0v24h-24v-24h24zm-6.118 16.064c-2.293-.529-4.427-.993-3.394-2.945 3.146-5.942.834-9.119-2.488-9.119-3.388 0-5.643 3.299-2.488 9.119 1.064 1.963-1.15 2.427-3.394 2.945-2.048.473-2.124 1.49-2.118 3.269l.004.667h15.993l.003-.646c.007-1.792-.062-2.815-2.118-3.29z" />
                        </svg>

                        {advertData && isUserAuthed && advertData.user.uid === user.uid ? (
                            <Link to="/my-profile">
                                <span id="profile-name">
                                    {advertData ? advertData.user.displayName : null}
                                </span>
                            </Link>
                        ) : (
                            <Link to={`/profile/${advertData ? advertData.user.uid : null}`}>
                                <span id="profile-name">
                                    {advertData ? advertData.user.displayName : null}
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
export default AdvertView;
