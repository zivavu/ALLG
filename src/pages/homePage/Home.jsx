import SearchSection from '../../components/advertSearch/SearchSection.jsx';
import AdvertsSection from '../../components/advertsListSection/AdvertsSection.jsx';
import CategoriesSection from './CategoriesSection.jsx';

const HomePage = () => {
    return (
        <div id="home-page">
            <SearchSection />
            <CategoriesSection />
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
