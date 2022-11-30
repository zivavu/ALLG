import React from 'react';

const FormValidationErrorMessage = ({ error, main }) => {
    return (
        <span
            className={`${
                main
                    ? 'form-validation-error-message main'
                    : 'form-validation-error-message'
            }`}>
            {error}
        </span>
    );
};

export default FormValidationErrorMessage;
