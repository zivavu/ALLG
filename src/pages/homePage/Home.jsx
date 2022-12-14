import { useEffect, useState } from 'react';
import AdvertsList from '../../components/advertsList/AdvertsList.jsx';
import getAdvertsByUserInput from '../../utils/getAdvertsByUserInput.js';
import getAllAdverts from '../../utils/getAllAdverts.js';
import useGetWatchedAdvertsIds from '../../utils/useGetWatchedAdvertsIds.jsx';
import AdvertsSearchForm from './AdvertsSearchForm.jsx';

const HomePage = () => {
    const [didUserSearch, setDidUserSearch] = useState(false);
    const [userSearchInput, setUserSearchInput] = useState();

    useEffect(() => {
        if (userSearchInput) {
            setDidUserSearch(true);
        }
    }, [userSearchInput]);

    const getAllAdvertsHandler = async () => {
        return await getAllAdverts();
    };

    const getAdvertsByUserInputHandler = async () => {
        return await getAdvertsByUserInput(userSearchInput);
    };
    const { watchedAdverts } = useGetWatchedAdvertsIds();

    return (
        <div id="home-page">
            <AdvertsSearchForm setUserSearchInput={setUserSearchInput} />
            {didUserSearch ? (
                <AdvertsList
                    key="advertsByUserInput"
                    getAdvertsHandler={getAdvertsByUserInputHandler}
                    header="To udało się nam znaleźć"
                    noAdvertsMessage="Nie znaleźliśmy takich ogłoszeń"
                    size="half-width"
                    watchedAdverts={watchedAdverts}
                />
            ) : (
                <AdvertsList
                    key="allAdverts"
                    getAdvertsHandler={getAllAdvertsHandler}
                    header="Poszukaj czegoś dla siebie"
                    noAdvertsMessage="Nie znaleźliśmy żadnych ogłoszeń"
                    size="half-width"
                    watchedAdverts={watchedAdverts}
                />
            )}
        </div>
    );
};
export default HomePage;
