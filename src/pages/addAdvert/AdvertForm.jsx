import { uuidv4 } from '@firebase/util';
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import CitySearch from '../../components/advertSearch/CitySearch';
import '../../components/categoryInput/categories.css';
import CategoriesFlexbox from '../../components/categoryInput/CategoriesFlexbox';
import FormValidationErrorMessage from '../../components/FormValidationErrorMessage';
import { auth, db, FirebaseStorage } from '../../config/firebase-config';
import { ScrollToFieldError } from '../../hooks&utils/scrollToFieldError';
import addAdvertSchema from '../../schemas/addAdvertFormSchema';
import { UserContext } from '../authentication/UserContext';
import './addAdvert.css';
function AdvertForm() {
    const [user, setUser] = useContext(UserContext);
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
        resetForm,
        isValid,
        submitCount,
    } = useFormik({
        initialValues: {
            id: '',
            title: '',
            description: '',
            city: {
                id: '',
                name: '',
                voivodeship: '',
                country: 'Polska',
            },
            category: {},
            price: '',
            imagePath: '',
            condition: '',
            views: 0,
        },
        validationSchema: addAdvertSchema,
        onSubmit,
    });

    useEffect(() => {
        setFieldValue('user', { uid: user.uid, displayName: user.displayName });
        setFieldValue('id', uuidv4());
    }, [user]);

    const [uploadedImage, setUploadedImage] = useState(null);
    const [inputBoxImage, setInputBoxImage] = useState('');

    const handleImageInput = (e) => {
        const randomImagePath = `images/${uuidv4()}`;
        setFieldValue('imagePath', randomImagePath);
        setUploadedImage(e.target.files[0]);
        //display image on the image input element
        setInputBoxImage(`${URL.createObjectURL(e.target.files[0])}`);
    };

    async function onSubmit(values) {
        uploadAdvert(values);
        addAdvertToUserDoc(values);
        uploadImage(values);
        resetForm();
    }
    const uploadAdvert = async (values) => {
        const advertsCollectionRef = doc(db, 'adverts', values.id);
        await setDoc(advertsCollectionRef, values)
            .then(() => {
                console.log('ogłoszenie dodane');
            })
            .catch('Dane były niepoprawne');
    };
    const addAdvertToUserDoc = async (values) => {
        const userDocRef = doc(db, 'users', values.user.uid);
        await updateDoc(userDocRef, {
            displayName: values.user.displayName,
            adverts: arrayUnion(values.id),
        })
            .then(() => {
                console.log('ogłosenie dodane do użytkownika');
            })
            .catch('Nie udało się podpiąć do użytkownika');
    };
    const uploadImage = async (values) => {
        const advertImagesRef = ref(FirebaseStorage, `${values.imagePath}`);
        uploadBytes(advertImagesRef, uploadedImage)
            .then(() => {
                console.log('uploaded file');
            })
            .catch('Nie udało się wysłać zdjęcia');
    };
    return (
        <div id="add-advert-container">
            <div id="advert-form-container">
                <div id="heading-container">
                    <h3 id="add-advert-heading">Dodaj ogłoszenie</h3>
                </div>
                <ScrollToFieldError
                    isValid={isValid}
                    submitCount={submitCount}
                    errors={errors}
                />
                <form id="add-advert-form" onSubmit={handleSubmit}>
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
                            placeholder="Dodaj Tytuł"></input>
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
                            placeholder="Dodaj Opis"></textarea>
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
                            <CategoriesFlexbox setFieldValue={setFieldValue} />
                        </div>
                        {errors.category && touched.category ? (
                            <FormValidationErrorMessage
                                error={errors.category.category}
                            />
                        ) : null}
                        <label htmlFor="photo-custom-input">Zdjęcia</label>
                        <label
                            htmlFor="photo-input"
                            className="photo-custom-input"
                            style={{ backgroundImage: `url(${inputBoxImage})` }}
                            id="photo-custom-input">
                            <span className={inputBoxImage ? 'hidden' : ''}>
                                Dodaj Zdjęcie
                            </span>
                        </label>
                        <input
                            type="file"
                            id="photo-input"
                            onChange={handleImageInput}
                            accept="image/heic, image/png, image/jpeg, image/webp"
                            multiple=""></input>

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
                            value="Opublikuj ogłoszenie"
                        />
                    </main>
                </form>
            </div>
        </div>
    );
}
export default AdvertForm;
