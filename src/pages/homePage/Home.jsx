import SearchSection from '../../components/advertSearch/SearchSection.jsx';
import AdvertsSection from '../../components/advertsListSection/AdvertsSection.jsx';
import CategoriesSection from './CategoriesSection.jsx';

const HomePage = () => {
    return (
        <>
            <SearchSection />
            <CategoriesSection />
            <AdvertsSection />
        </>
    );
};
export default HomePage;
