import './categories.css';
import CategoriesFlexbox from '/src/components/categoryInput/CategoriesFlexbox';

const CategoriesSection = () => {
    return (
        <section id="categories-section">
            <div id="categories-container">
                <div id="heading-container">
                    <h3>Wybierz kategorie ogłoszeń</h3>
                </div>
                <CategoriesFlexbox isSingleCategoryInputAlowed="true" />
            </div>
        </section>
    );
};
export default CategoriesSection;
