import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { storage } from '../config/firebase-config';
import imageNotFound from '/src/assets/image-not-found-icon.webp';

const useDownloadImage = (imagePath) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        const getImageUrl = async () => {
            setIsImageLoading(true);
            if (!imagePath) {
                return;
            }
            const imagePathRef = ref(storage, `${imagePath}`);
            try {
                const downloadURL = await getDownloadURL(imagePathRef);
                setImageURL(downloadURL);
            } catch {
                setImageURL(imageNotFound);
            } finally {
                setIsImageLoading(false);
            }
        };
        getImageUrl();
    }, [imagePath]);

    return { imageURL, isImageLoading };
};
export default useDownloadImage;
