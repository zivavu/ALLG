import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import SearchSection from '../../components/advertSearch/SearchSection.jsx';
import CategoriesSection from '../../components/categoryInput/CategoriesSection.jsx';
import getAdvertsByUserInput from '../../utils/getAndFilterAdvertsByUserInput.js';

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
    const [isLoading, setIsLoading] = useState(false);
    const [advertsServerResponse, setAdvertsServerResponse] = useState([]);

    useEffect(() => {
        console.log(advertsServerResponse);
    }, [advertsServerResponse]);

    async function onSubmit(values) {
        setIsLoading(true);
        try {
            await getAdvertsByUserInput(setAdvertsServerResponse, values);
        } catch (error) {
            console.log(error.message);
        }
        setIsLoading(false);
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
