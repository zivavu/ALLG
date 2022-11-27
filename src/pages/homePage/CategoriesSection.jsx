import './home.css';
import '/src/components/categoryInput/categories.css';
import CategoriesFlexbox from '/src/components/categoryInput/CategoriesFlexbox';

const CategoriesSection = () => {
    return (
        <section id="categories-section">
            <div id="categories-container">
                <div id="heading-container">
                    <h3>Wybierz kategorie ogłoszeń</h3>
                </div>
                <CategoriesFlexbox />
            </div>
        </section>
    );
};
export default CategoriesSection;
