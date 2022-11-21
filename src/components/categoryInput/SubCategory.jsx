import { useEffect, useState } from 'react';
const SubCategory = ({
    category,
    subCategory,
    selectedCategory,
    setSelectedCategory,
    setShowSubCategories,
    setFieldValue,
}) => {
    const [isSelected, setIsSelected] = useState(false);
    useEffect(() => {
        setIsSelected(subCategory === selectedCategory.subCategory);
    }, [selectedCategory]);

    const categorySelectHandler = () => {
        setSelectedCategory({ category: category, subCategory: subCategory });
        setFieldValue('category', { category: category, subCategory: subCategory });
        //God have mercy :) // Prevents category container blink on selection
        setTimeout(() => {
            setShowSubCategories(false);
        }, 5);
    };

    return (
        <li
            className={`${isSelected ? 'categories-selected' : ''}`}
            onClick={categorySelectHandler}>
            {subCategory}
        </li>
    );
};
export default SubCategory;
