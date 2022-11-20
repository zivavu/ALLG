import './home.css';
import '/src/components/categories/categories.css';
import CategoriesFlexbox from '/src/components/categories/CategoriesFlexbox';

const CategoriesSection = () => {
    return (
        <section id="categories-section">
            <div id="categories-container">
                <div id="heading-container">
                    <h3>Kategorie Ogłoszeń</h3>
                </div>
                <CategoriesFlexbox />
            </div>
        </section>
    );
};
export default CategoriesSection;
