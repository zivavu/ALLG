import SearchSection from '../../components/advertSearch/SearchSection.jsx';
import AdvertsSection from '../../components/advertsListSection/AdvertsSection.jsx';
import getAllAdverts from '../../utils/getAllAdverts.jsx';
import CategoriesSection from './CategoriesSection.jsx';

const HomePage = () => {
    return (
        <div id="home-page">
            <SearchSection />
            <CategoriesSection />
            <AdvertsSection
                header="To udało się nam znaleźć"
                getAdvertsHandler={getAllAdverts}
            />
        </div>
    );
};
export default HomePage;
