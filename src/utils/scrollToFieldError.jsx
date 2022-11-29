//Code By Diego Castillo

import { useEffect } from 'react';
import { getFieldErrorNames } from './getFieldErrorNames';
export const ScrollToFieldError = ({ submitCount, isValid, errors }) => {
    useEffect(() => {
        if (isValid) return;

        const fieldErrorNames = getFieldErrorNames(errors);
        if (fieldErrorNames.length <= 0) return;

        const element = document.querySelector(`input[name='${fieldErrorNames[0]}']`);
        if (!element) return;

        // Scroll to first known error into view
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [submitCount]); // eslint-disable-line react-hooks/exhaustive-deps

    return null;
};

//Code By Diego Castillo
