import { useEffect, useState } from 'react';
import SubCategory from './SubCategory';
const Category = ({
    name,
    subcategories,
    svgPath,
    selectedCategory,
    setSelectedCategory,
    setFieldValue,
    expandedCategory,
    setExpandedCategory,
    isSingleCategoryInputAlowed,
}) => {
    const [showSubCategories, setShowSubCategories] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setIsSelected(name === selectedCategory.category);
    }, [selectedCategory]);

    //Adds mobile support by allowing only one expanded category element
    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.className != 'sub-category') {
            setExpandedCategory(isSelected ? null : name);

            //Haandles selection of category without a subcategory if it's allowed
            if (isSingleCategoryInputAlowed && !isSelected) {
                setSelectedCategory({ category: name });
                setFieldValue('category', { category: name });
            }
            if (isSelected) {
                setSelectedCategory({});
                setFieldValue('category', '');
            }
        }
    };
    useEffect(() => {
        expandedCategory === name
            ? setShowSubCategories(true)
            : setShowSubCategories(false);
    }, [expandedCategory]);
    ///////////////////////////////////////////////////////////////////////

    return (
        <>
            <div
                className={`category-container 
                ${showSubCategories ? 'categories-focus' : ''}
                ${isSelected ? 'categories-selected' : ''} 
                `}
                onMouseEnter={() => setExpandedCategory(name)}
                onMouseLeave={() => {
                    setShowSubCategories(false);
                    setExpandedCategory(null);
                }}
                onClick={handleClick}>
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
