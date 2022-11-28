const ProductSearch = ({ fieldValue, setFieldValue }) => {
    return (
        <input
            name="advertName"
            id="product-search"
            type="text"
            onChange={(e) => {
                setFieldValue('advertName', e.target.value);
            }}
            value={fieldValue}
            placeholder="Czego szukasz?"></input>
    );
};
export default ProductSearch;
