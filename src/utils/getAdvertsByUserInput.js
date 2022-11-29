import { collection, getDocs, query, where } from 'firebase/firestore';
import isEqual from 'lodash/isEqual';
import { categories as CategoriesData } from '../components/categoryInput/categories.json';
import { db } from '../config/firebase-config';

const getAdvertsByUserInput = async (values, setAdvertsData) => {
    const { city, advertName: title, category } = values;
    if (!category && !city) return;
    const advertsRef = collection(db, 'adverts');

    const possibleCategories = [];
    //if user selected category without subCategory
    //populates array with category subcategory object from categories json file
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
        //else sets it to category subCategory object selected by user
    } else {
        possibleCategories.push(category);
    }

    const advertsResult = [];
    if (city) {
        const queryByCity = query(advertsRef, where('city', '==', city));
        try {
            await getDocs(queryByCity).then((data) => {
                if (data.docs) {
                    data.forEach((doc) => {
                        advertsResult.push(doc.data());
                    });
                } else setAdvertsData([]);
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    if (category && !city) {
        let queryByCategory = query(
            advertsRef,
            where('category', 'in', possibleCategories)
        );
        try {
            await getDocs(queryByCategory).then((data) => {
                if (data.docs) {
                    data.forEach((doc) => {
                        advertsResult.push(doc.data());
                    });
                } else setAdvertsData([]);
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    console.log(possibleCategories);

    const filterByUserInput = (advert) => {
        //check if user input(if exists) matches the querried adverts
        const titleMatch =
            !title || advert.title.toLowerCase().includes(title.toLowerCase());
        const cityMatch = !city || advert.city.id === city.id;
        const categoryMatch =
            !category ||
            possibleCategories.some((category) => isEqual(category, advert.category));

        console.log(titleMatch, cityMatch, categoryMatch);
        if (categoryMatch && titleMatch && cityMatch) {
            return advert;
        }
        if (cityMatch && titleMatch && categoryMatch) {
            return advert;
        }
    };
    setAdvertsData(advertsResult.filter((advert) => filterByUserInput(advert)));
};

export default getAdvertsByUserInput;
