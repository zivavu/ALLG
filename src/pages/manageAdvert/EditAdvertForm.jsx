import { uuidv4 } from '@firebase/util';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CitySearch from '../../components/advertSearch/CitySearch';
import '../../components/categoryInput/categories.css';
import CategoriesFlexbox from '../../components/categoryInput/CategoriesFlexbox';
import FormValidationErrorMessage from '../../components/FormValidationErrorMessage';
import { db } from '../../config/firebase-config';
import addAdvertSchema from '../../schemas/addAdvertFormSchema';
import { ScrollToFieldError } from '../../utils/scrollToFieldError';
import { UserContext } from '../authentication/UserContext';
import './manageAdvert.css';

function EditAdvertForm() {
    const [user, setUser] = useContext(UserContext);
    const [advertInitValues, setAdvertInitValues] = useState({
        id: '',
        title: '',
        description: '',
        city: {
            id: '',
            name: '',
            voivodeship: '',
            country: '',
        },
        category: {},
        price: '',
        imagePath: '',
        condition: '',
        views: 0,
    });
    const {
        values,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        touched,
        setFieldError,
        setFieldTouched,
        isValid,
        submitCount,
    } = useFormik({
        initialValues: advertInitValues,
        validationSchema: addAdvertSchema,
        enableReinitialize: true,
        onSubmit,
    });

    const { id: editedAdvertId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setFieldValue('user', { uid: user.uid, displayName: user.displayName });
        setFieldValue('id', uuidv4());
    }, [user]);

    //basic user validation
    useEffect(() => {
        try {
            const advertRef = doc(db, 'adverts', editedAdvertId);
            getDoc(advertRef).then((doc) => {
                if (
                    !user.uid ||
                    !doc.data().user.uid ||
                    user.uid != doc.data().user.uid
                ) {
                    navigate('/');
                } else {
                    setAdvertInitValues(doc.data());
                }
            });
        } catch {
            navigate('/error/Nie-mogliśmy-znaleźć-tego-ogłoszenia');
        }
    }, []);

    async function onSubmit(values) {
        const advertRef = doc(db, 'adverts', values.id);
        setIsLoading(true);
        try {
            await updateDoc(advertRef, values).then(() => {
                navigate(`/advert/${values.id}`);
            });
        } catch {
            navigate('/error/Wystąpił-problem-przy-edytowaniu-ogłoszenia');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div id="add-advert-container">
            <div id="advert-form-container">
                <div id="heading-container">
                    <h3 id="add-advert-heading">Edycja ogłoszenia</h3>
                </div>
                <form id="add-advert-form" onSubmit={handleSubmit}>
                    <ScrollToFieldError
                        isValid={isValid}
                        submitCount={submitCount}
                        errors={errors}
                    />
                    <main id="add-advert-main">
                        <label htmlFor="title">Tytuł ogłoszenia</label>
                        <input
                            type="text"
                            id="advert-title-input"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="off"
                            autoCorrect="off"
                            placeholder="Nowy Tytuł"></input>
                        {errors.title && touched.title ? (
                            <FormValidationErrorMessage error={errors.title} />
                        ) : null}

                        <label htmlFor="advert-description-input">Opis</label>
                        <textarea
                            type="text"
                            id="advert-description-input"
                            name="description"
                            autoComplete="off"
                            autoCorrect="off"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Nowy Opis"></textarea>
                        {errors.description && touched.description ? (
                            <FormValidationErrorMessage error={errors.description} />
                        ) : null}

                        <label htmlFor="advert-item-condition-container">Stan</label>
                        <div id="advert-item-contidion-container">
                            <label htmlFor="radio-new">
                                <input
                                    type="radio"
                                    id="radio-new"
                                    className="advert-condition-radio"
                                    name="condition"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value="Nowy"></input>
                                Nowe
                            </label>
                            <label htmlFor="radio-used" name="condition">
                                <input
                                    type="radio"
                                    id="radio-used"
                                    className="advert-condition-radio"
                                    name="condition"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value="używany"></input>
                                Używane
                            </label>
                        </div>
                        {errors.condition && touched.condition ? (
                            <FormValidationErrorMessage error={errors.condition} />
                        ) : null}

                        <label htmlFor="city-search">Miejscowość</label>
                        <CitySearch
                            handleBlur={handleBlur}
                            fieldValue={values.city.name}
                            setFieldValue={setFieldValue}
                            setFieldError={setFieldError}
                            setFieldTouched={setFieldTouched}
                        />
                        {errors.city && touched.city ? (
                            <FormValidationErrorMessage error={errors.city} />
                        ) : null}

                        <label htmlFor="category-input">Kategoria</label>
                        <div id="add-advert-categories-container">
                            <CategoriesFlexbox
                                setFieldValue={setFieldValue}
                                fieldValue={values.category}
                                isSingleCategoryInputAlowed={false}
                            />
                        </div>
                        {errors.category && touched.category ? (
                            <FormValidationErrorMessage
                                error={errors.category.category}
                            />
                        ) : null}

                        <label htmlFor="price-input">Cena</label>
                        <div id="advert-price-input-box">
                            <input
                                type="text"
                                id="advert-price-input"
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                                maxLength="7"
                                size="7"></input>
                            <span id="advert-price-prefix">zł</span>
                        </div>
                        {errors.price && touched.price ? (
                            <FormValidationErrorMessage error={errors.price} />
                        ) : null}

                        <input
                            id="add-advert-form-submit"
                            type="submit"
                            value="Edytuj ogłoszenie"
                            disabled={isLoading}
                        />
                    </main>
                </form>
            </div>
        </div>
    );
}
export default EditAdvertForm;
