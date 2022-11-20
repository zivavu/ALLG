import { useEffect, useState } from 'react';
import SubCategory from './SubCategory';
const Category = ({
    name,
    subcategories,
    svgPath,
    selectedCategory,
    setSelectedCategory,
    setFieldValue,
}) => {
    const [showSubCategories, setShowSubCategories] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setIsSelected(name === selectedCategory.category);
    }, [selectedCategory]);

    return (
        <>
            <div
                className={`category-container 
                ${showSubCategories ? 'categories-focus' : ''}
                ${isSelected ? 'categories-selected' : ''} 
                `}
                onMouseEnter={() => setShowSubCategories(true)}
                onMouseLeave={() => setShowSubCategories(false)}
                onTouchStart={() => setShowSubCategories(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d={svgPath} />
                </svg>
                <span>{name}</span>
                {showSubCategories && (
                    <div className="sub-categories-container">
                        <ul>
                            {subcategories.map((subCategory) => {
                                return (
                                    <SubCategory
                                        key={subCategory.name}
                                        category={name}
                                        subCategory={subCategory.name}
                                        setFieldValue={setFieldValue}
                                        setShowSubCategories={setShowSubCategories}
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={setSelectedCategory}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default Category;
