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
    };

    return (
        <li
            className={`${
                isSelected ? 'sub-category categories-selected' : 'sub-category'
            }`}
            onClick={categorySelectHandler}>
            {subCategory}
        </li>
    );
};
export default SubCategory;
