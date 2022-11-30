import { useFormik } from 'formik';
import SearchSection from '../../components/advertSearch/SearchSection.jsx';
import CategoriesSection from '../../components/categoryInput/CategoriesSection.jsx';

function AdvertsSearchForm({ setUserSearchInput }) {
    const {
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        setStatus,
        status,
    } = useFormik({
        initialValues: {
            advertName: '',
            city: '',
            category: '',
        },
        onSubmit,
    });

    function onSubmit(values) {
        //search form requires user to input category or value due to firebase text search limitations
        if (!values.category.category && !values.city) {
            setStatus('Musisz wprowadzić miasto lub kategorię');
            return;
        }
        setStatus('');
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
                status={status}
            />
        </form>
    );
}
export default AdvertsSearchForm;
