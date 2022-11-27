import React from 'react';

export const EmptyHeartSVG = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
            <path d="M17.867 3.493l4.133 3.444v5.127l-10 8.333-10-8.334v-5.126l4.133-3.444 5.867 3.911 5.867-3.911zm.133-2.493l-6 4-6-4-6 5v7l12 10 12-10v-7l-6-5z" />
        </svg>
    );
};
const FullHeartSVG = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
        </svg>
    );
};
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
                <button className="advert-star-button" onClick={handleClick}>
                    {isWatched ? <FullHeartSVG /> : <EmptyHeartSVG />}
                </button>
            ) : null}
        </>
    );
}

export default WatchAdvertButton;
