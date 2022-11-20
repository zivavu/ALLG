import { useState } from 'react';
import SubCategory from './SubCategory';
const CategoryOption = ({ name, subcategories, svgPath }) => {
    const [areSubCategoriesShown, showSubCategories] = useState(false);
    return (
        <>
            <li
                className="add-advert-category-item"
                onMouseEnter={() => {
                    console.log('hmmmm');
                    showSubCategories(true);
                }}
                onMouseLeave={() => showSubCategories(false)}>
                {name}
                {areSubCategoriesShown && (
                    <div id="sub-categories-container">
                        <ul>
                            {subcategories.map((category) => {
                                return (
                                    <SubCategory
                                        key={category.name}
                                        name={category.name}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                )}
            </li>
        </>
    );
};
export default CategoryOption;
