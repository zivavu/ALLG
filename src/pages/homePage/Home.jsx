import AdvertsSection from '../../components/advertsListSection/AdvertsSection.jsx';
import AdvertsSearchForm from './AdvertsSearchForm.jsx';

const HomePage = () => {
    return (
        <div id="home-page">
            <AdvertsSearchForm />
            <AdvertsSection
                header="To udało się nam znaleźć"
                type="allAdverts"
                noAdvertsMessage="Nie znaleźliśmy takich ogłoszeń"
                size="half-width"
            />
        </div>
    );
};
export default HomePage;
