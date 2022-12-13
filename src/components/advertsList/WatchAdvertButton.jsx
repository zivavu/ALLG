import React, { useContext } from 'react';
import { EmptyHeartSVG, FullHeartSVG } from '../../assets/svg';
import { UserContext } from '../../pages/authentication/UserContext';

function WatchAdvertButton({
    isWatched,
    setIsWatched,
    addToUsersWatchedAdverts,
    rmFromUsersWatchedAdverts,
    user,
    advert,
}) {
    const { isUserAuthed } = useContext(UserContext);
    const handleClick = (e) => {
        e.preventDefault();
        isWatched ? rmFromUsersWatchedAdverts() : addToUsersWatchedAdverts();
        setIsWatched(!isWatched);
    };
    return (
        <>
            {isUserAuthed && user.uid !== advert.user.uid ? (
                <button className="advert-heart-button" onClick={handleClick}>
                    {isWatched ? <FullHeartSVG /> : <EmptyHeartSVG />}
                </button>
            ) : null}
        </>
    );
}

export default WatchAdvertButton;
