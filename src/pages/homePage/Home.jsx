import { useEffect, useState } from 'react';
import AdvertsSection from '../../components/advertsListSection/AdvertsSection.jsx';
import AdvertsSearchForm from './AdvertsSearchForm.jsx';

const HomePage = () => {
    const [didUserSearch, setDidUserSearch] = useState(false);
    const [userSearchInput, setUserSearchInput] = useState();

    useEffect(() => {
        if (userSearchInput) setDidUserSearch(true);
    }, [userSearchInput]);

    return (
        <div id="home-page">
            <AdvertsSearchForm setUserSearchInput={setUserSearchInput} />
            {didUserSearch ? (
                <AdvertsSection
                    key="1"
                    header="To udało się nam znaleźć"
                    type="advertsByUserInput"
                    noAdvertsMessage="Nie znaleźliśmy takich ogłoszeń"
                    size="half-width"
                    userSearchInput={userSearchInput}
                />
            ) : (
                <AdvertsSection
                    key="2"
                    header="Najnowsze ogłoszenia"
                    type="allAdverts"
                    noAdvertsMessage="Nie znaleźliśmy żadnych ogłoszeń"
                    size="half-width"
                />
            )}
        </div>
    );
};
export default HomePage;
