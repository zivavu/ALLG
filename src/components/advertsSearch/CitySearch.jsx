import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase-config';
import { useDebounce } from '../../utils/useDebounce';
import './searchArea.css';
import CityOption from './SearchedCityOptions.jsx';

function CitySearch({ setFieldValue, handleBlur, fieldValue }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [citiesResponse, setCitiesResponse] = useState([]);
    const debouncedValue = useDebounce(searchTerm, 500);

    useEffect(() => {
        //convert user input to format found in firestore
        const cityToSearch = searchTerm[0]
            ? searchTerm.split('')[0].toUpperCase() + searchTerm.split('').slice(1).join('')
            : '';
        if (fieldValue === cityToSearch) return;

        let q = query(
            collection(db, 'cities'),
            where('caseSearch', 'array-contains', cityToSearch),
            orderBy('population', 'desc'),
            limit(10)
        );
        const getCities = async () => {
            const querySnapshot = await getDocs(q);
            setCitiesResponse(querySnapshot.docs.map((doc) => doc.data()));
        };
        getCities();
    }, [debouncedValue]);

    //handles initial value of field on edit advert page
    useEffect(() => {
        if (fieldValue) setSearchTerm(fieldValue);
    }, [fieldValue]);

    const handleChange = (e) => {
        setCitiesResponse([]);
        setSearchTerm(e.target.value);
        setFieldValue('city', '');
    };
    return (
        <div id="city-search-container">
            <input
                placeholder="Miejscowość"
                id="city-search"
                type="text"
                name="city"
                autoComplete="off"
                onChange={(e) => {
                    handleChange(e);
                }}
                onBlur={(e) => {
                    handleBlur(e);
                    if (citiesResponse[0]) setFieldValue('city', citiesResponse[0]);
                    setCitiesResponse([]);
                }}
                value={searchTerm}></input>

            <ul id="cities-list">
                {citiesResponse.map((city) => {
                    return (
                        <li key={city.id}>
                            <CityOption
                                name={city.name}
                                voivodeship={city.voivodeship}
                                id={city.id}
                                setFieldValue={setFieldValue}
                                setCitiesResponse={setCitiesResponse}
                                setSearchTerm={setSearchTerm}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
export default CitySearch;
