import { useState } from 'react';
import './categories.css';
import { categories } from './categories.json';
import Category from './Category.jsx';

const CategoriesFlexbox = ({ setFieldValue }) => {
    const [selectedCategory, setSelectedCategory] = useState({});
    const [expandedCategory, setExpandedCategory] = useState('');

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
                    />
                );
            })}
        </div>
    );
};
export default CategoriesFlexbox;
