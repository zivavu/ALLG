import { useEffect, useState } from 'react';
import './categories.css';
import { categories } from './categories.json';
import Category from './Category.jsx';

const CategoriesFlexbox = ({
    setFieldValue,
    isSingleCategoryInputAlowed,
    fieldValue,
}) => {
    const [selectedCategory, setSelectedCategory] = useState({});
    const [expandedCategory, setExpandedCategory] = useState('');

    //handles initial value of field on edit advert page
    useEffect(() => {
        if (fieldValue) setSelectedCategory(fieldValue);
    }, [fieldValue]);

    return (
        <div id="categories-flexbox">
            {categories.map((category) => {
                const { id, name, subcategories, svgPath } = category;
                return (
                    <Category
                        key={id}
                        name={name}
                        subcategories={subcategories}
                        svgPath={svgPath}
                        expandedCategory={expandedCategory}
                        setExpandedCategory={setExpandedCategory}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        setFieldValue={setFieldValue}
                        //allows user to select category without a subcategory
                        isSingleCategoryInputAlowed={isSingleCategoryInputAlowed}
                    />
                );
            })}
        </div>
    );
};
export default CategoriesFlexbox;
