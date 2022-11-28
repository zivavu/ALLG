import { useEffect, useState } from 'react';
import AdvertsSection from '../../components/advertsListSection/AdvertsSection.jsx';
import AdvertsSearchForm from './AdvertsSearchForm.jsx';

const HomePage = () => {
    const [didUserSearch, setDidUserSearch] = useState(false);
    const [userSearchInput, setUserSearchInput] = useState();
    useEffect(() => {
        if (userSearchInput && userSearchInput.category) {
            setDidUserSearch(true);
            console.log('switching shit');
        }
    }, [userSearchInput]);

    return (
        <div id="home-page">
            <AdvertsSearchForm setUserSearchInput={setUserSearchInput} />
            {didUserSearch ? (
                <AdvertsSection
                    key="advertsByUserInput"
                    header="To udało się nam znaleźć"
                    type="advertsByUserInput"
                    noAdvertsMessage="Nie znaleźliśmy takich ogłoszeń"
                    size="half-width"
                    userSearchInput={userSearchInput}
                />
            ) : (
                <AdvertsSection
                    key="allAdverts"
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
