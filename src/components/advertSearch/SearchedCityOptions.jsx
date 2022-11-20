const CityOption = ({
    name,
    country,
    voivodeship,
    id,
    setCitiesResponse,
    setSearchTerm,
    setFieldValue,
}) => {
    const citySelectHandler = () => {
        setFieldValue('city', {
            id: id,
            name: name,
            country: 'polska',
            voivodeship: voivodeship,
        });
        setCitiesResponse([]);
        setSearchTerm(name);
    };
    return (
        <div className="cities-list-item" onClick={citySelectHandler}>
            <section className="city-name">{name}</section>
            <section className="country-name">{country}</section>
        </div>
    );
};
export default CityOption;
