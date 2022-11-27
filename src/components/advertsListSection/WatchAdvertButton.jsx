import React from 'react';
import { EmptyHeartSVG, FullHeartSVG } from '../../assets/svg';

function WatchAdvertButton({
    isWatched,
    setIsWatched,
    addToUsersWatchedAdverts,
    rmFromUsersWatchedAdverts,
    user,
    advert,
}) {
    const handleClick = (e) => {
        e.preventDefault();
        isWatched ? rmFromUsersWatchedAdverts() : addToUsersWatchedAdverts();
        setIsWatched(!isWatched);
    };
    return (
        <>
            {user.uid != '' && user.uid != advert.user.uid ? (
                <button className="advert-heart-button" onClick={handleClick}>
                    {isWatched ? <FullHeartSVG /> : <EmptyHeartSVG />}
                </button>
            ) : null}
        </>
    );
}

export default WatchAdvertButton;
