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

    const categorySelectHandler = (e) => {
        e.preventDefault();
        setSelectedCategory({ category: category, subCategory: subCategory });
        setFieldValue('category', { category: category, subCategory: subCategory });
        //prevent category flashing on select due to className changing
        setTimeout(() => {
            setShowSubCategories(false);
        }, 5);
    };

    return (
        <li className={`${isSelected ? 'sub-category categories-selected' : 'sub-category'}`}>
            <button className="sub-category-button" onClick={categorySelectHandler}></button>
            {subCategory}
        </li>
    );
};
export default SubCategory;
