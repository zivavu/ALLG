import { useState } from 'react';
import '../../components/advertSearch/searchArea.css';
import CitySearch from './CitySearch';
import ProductSearch from './ProductSearch';
function SearchSection({ setFieldValue, handleBlur, values, isLoading }) {
    const [selectedCity, setSelectedCity] = useState('');
    return (
        <section id="search-section">
            <div id="search-container">
                <ProductSearch
                    setFieldValue={setFieldValue}
                    fieldValue={values.advertName}
                />
                <CitySearch
                    selectedCity={selectedCity}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    fieldValue={values.city.name}
                />
                <button id="search-submit" type="submit" disabled={isLoading}>
                    Szukaj
                </button>
            </div>
        </section>
    );
}
export default SearchSection;
