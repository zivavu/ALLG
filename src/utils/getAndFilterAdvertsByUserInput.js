import { collection, getDocs, query, where } from 'firebase/firestore';
import { categories as CategoriesData } from '../components/categoryInput/categories.json';
import { db } from '../config/firebase-config';

const getAdvertsByUserInput = async (setAdvertsData, values) => {
    const { city, advertName, category } = values;
    if (!category) return;

    //array of objects containing category and all its subcategories
    //based on categories.json file and category selected by user
    const possibleCategories = [];
    if (!category.subCategory) {
        CategoriesData.forEach((categoryData) => {
            if (categoryData.name != category.category) return;
            categoryData.subcategories.forEach((subCategory) => {
                possibleCategories.push({
                    category: category.category,
                    subCategory: subCategory.name,
                });
            });
        });
    } else {
        possibleCategories.push(category);
    }

    const advertsRef = collection(db, 'adverts');
    const q = query(advertsRef, where('category', 'in', possibleCategories));
    const advertsResult = [];
    try {
        await getDocs(q).then((data) => {
            data.forEach((doc) => {
                advertsResult.push(doc.data());
            });
        });
    } catch (error) {
        console.log(error.message);
    }

    const filterByUserInput = (advert) => {
        if (!advertName && !city) return advert;
        if (city && !advertName && advert.city.name === city.name) return advert;
        if (
            !city &&
            advertName &&
            advert.title.toLowerCase().includes(advertName.toLowerCase())
        )
            return advert;
    };
    setAdvertsData(advertsResult.filter((advert) => filterByUserInput(advert)));
};
export default getAdvertsByUserInput;
