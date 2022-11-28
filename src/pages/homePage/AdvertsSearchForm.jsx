import { useFormik } from 'formik';
import SearchSection from '../../components/advertSearch/SearchSection.jsx';
import CategoriesSection from '../../components/categoryInput/CategoriesSection.jsx';

function AdvertsSearchForm({ setUserSearchInput }) {
    const { values, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            advertName: '',
            city: '',
            category: '',
        },
        onSubmit,
    });

    function onSubmit(values) {
        setUserSearchInput(values);
    }
    return (
        <form onSubmit={handleSubmit}>
            <SearchSection
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                values={values}
            />
            <CategoriesSection
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                handleChange={handleChange}
            />
        </form>
    );
}
export default AdvertsSearchForm;
