import { useState } from 'react';
import '../../components/advertSearch/searchArea.css';
import CitySearch from './CitySearch';
import ProductSearch from './ProductSearch';
function SearchSection() {
    const [selectedCity, setSelectedCity] = useState('');
    return (
        <section id="search-section">
            <div id="search-container">
                <ProductSearch />
                <CitySearch selectedCity={selectedCity} setFieldValue={setSelectedCity} />
                <button id="search-submit">Szukaj</button>
            </div>
        </section>
    );
}
export default SearchSection;
