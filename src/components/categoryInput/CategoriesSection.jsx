import './categories.css';
import CategoriesFlexbox from '/src/components/categoryInput/CategoriesList';

const CategoriesSection = ({ setFieldValue, status }) => {
    return (
        <section id="categories-section">
            <div id="categories-container">
                <div id="heading-container">
                    <h3>{status ? status : 'Wybierz kategorie ogłoszeń'}</h3>
                </div>
                <CategoriesFlexbox setFieldValue={setFieldValue} isSingleCategoryInputAlowed="true" />
            </div>
        </section>
    );
};
export default CategoriesSection;
