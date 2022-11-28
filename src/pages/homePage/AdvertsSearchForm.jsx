import { useFormik } from 'formik';
import { useState } from 'react';
import SearchSection from '../../components/advertSearch/SearchSection.jsx';
import CategoriesSection from '../../components/categoryInput/CategoriesSection.jsx';

function AdvertsSearchForm() {
    const {
        values,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        touched,
        fieldValue,
    } = useFormik({
        initialValues: {
            advertName: '',
            city: '',
            category: '',
        },
        onSubmit,
    });
    console.log(values);
    const [isLoading, setIsLoading] = useState(false);
    async function onSubmit(values) {
        setIsLoading(true);
        console.log(values);
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
