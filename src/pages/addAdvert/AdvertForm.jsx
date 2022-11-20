import { uuidv4 } from '@firebase/util';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import CitySearch from '../../components/advertSearch/CitySearch';
import '../../components/categories/categories.css';
import CategoriesFlexbox from '../../components/categories/CategoriesFlexbox';
import { db, FirebaseStorage } from '../../config/firebase-config';
import addAdvertSchema from '../../schemas/advertFormSchema';
import './addAdvert.css';
import FormValidationErrorMessage from './FormValidationErrorMessage';

function AdvertForm() {
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
    } = useFormik({
        initialValues: {
            userId: 1,
            userName: 'Tomasz',
            title: '',
            description: '',
            city: '',
            category: {},
            price: '',
            imagePath: '',
            condition: '',
        },
        validationSchema: addAdvertSchema,
        onSubmit,
    });
    const advertsCollectionRef = collection(db, 'adverts');

    async function onSubmit(values) {
        resetForm();
        //upload form to Firebase
        await addDoc(advertsCollectionRef, values)
            .then(() => {
                console.log('ogłoszenie dodane');
            })
            .catch('Dane były niepoprawne');

        //upload image to Firebase Storage
        const advertImagesRef = ref(FirebaseStorage, `${values.imagePath}`);
        uploadBytes(advertImagesRef, uploadedImage)
            .then(() => {
                console.log('uploaded file');
            })
            .catch('Nie udało się wysłać zdjęcia');
    }

    const [uploadedImage, setUploadedImage] = useState(null);
    const [inputBoxImage, setInputBoxImage] = useState('');

    const handleImageInput = (e) => {
        const randomImagePath = `images/${uuidv4()}`;
        setFieldValue('imagePath', randomImagePath);
        setUploadedImage(e.target.files[0]);
        setInputBoxImage(`${URL.createObjectURL(e.target.files[0])}`);
    };

    return (
        <div id="add-advert-container">
            <div id="advert-form-container">
                <div id="heading-container">
                    <h3 id="add-advert-heading">Dodaj ogłoszenie</h3>
                </div>
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
                        {errors.title && touched.title && (
                            <FormValidationErrorMessage error={errors.title} />
                        )}

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
                        {errors.description && touched.description && (
                            <FormValidationErrorMessage error={errors.description} />
                        )}

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
                        {errors.condition && touched.condition && (
                            <FormValidationErrorMessage error={errors.condition} />
                        )}

                        <label htmlFor="city-search">Miejscowość</label>
                        <CitySearch
                            handleBlur={handleBlur}
                            fieldValue={values.city.name}
                            setFieldValue={setFieldValue}
                            setFieldError={setFieldError}
                            setFieldTouched={setFieldTouched}
                        />
                        {errors.city && touched.city && (
                            <FormValidationErrorMessage error={errors.city} />
                        )}

                        <label htmlFor="category-input">Kategoria</label>
                        <div id="add-advert-categories-container">
                            <CategoriesFlexbox setFieldValue={setFieldValue} />
                        </div>
                        {errors.category && touched.category && (
                            <FormValidationErrorMessage
                                error={errors.category.category}
                            />
                        )}
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
                        {errors.price && touched.price && (
                            <FormValidationErrorMessage error={errors.price} />
                        )}

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
