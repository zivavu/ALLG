import { useEffect, useState } from 'react';
import AdvertsList from '../../components/advertsList/AdvertsList.jsx';
import AdvertsSearchForm from './AdvertsSearchForm.jsx';

const HomePage = () => {
    const [didUserSearch, setDidUserSearch] = useState(false);
    const [userSearchInput, setUserSearchInput] = useState();

    useEffect(() => {
        if (userSearchInput) {
            setDidUserSearch(true);
        }
    }, [userSearchInput]);

    return (
        <div id="home-page">
            <AdvertsSearchForm setUserSearchInput={setUserSearchInput} />
            {didUserSearch ? (
                <AdvertsList
                    key="advertsByUserInput"
                    header="To udało się nam znaleźć"
                    type="advertsByUserInput"
                    noAdvertsMessage="Nie znaleźliśmy takich ogłoszeń"
                    size="half-width"
                    userSearchInput={userSearchInput}
                />
            ) : (
                <AdvertsList
                    key="allAdverts"
                    header="Poszukaj czegoś dla siebie"
                    type="allAdverts"
                    noAdvertsMessage="Nie znaleźliśmy żadnych ogłoszeń"
                    size="half-width"
                />
            )}
        </div>
    );
};
export default HomePage;
