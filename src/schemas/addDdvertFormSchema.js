import * as yup from 'yup';

const addAdvertSchema = yup.object().shape({
    user: yup
        .object()
        .required('Wystąpił problem z kontem')
        .shape({
            uid: yup.string().min(28, 'Wystąpił problem z kontem').required(),
            displayName: yup.string(),
        }),
    title: yup
        .string()
        .min(8, 'Tytuł jest za krótki(min 8 znaków)')
        .max(40, 'Tytuł jest za długi(max 70 znaków)')
        .required('Wprowadź tytuł'),
    description: yup
        .string()
        .min(15, 'Opis jest za krótki(min 15 znaków)')
        .max(1000, 'Opis jest za długi(max 1000 znaków)')
        .required('Wprowadź opis'),
    city: yup.object().required('Wyszukaj miasto i wybierz z listy'),
    category: yup
        .object()
        .shape({
            category: yup.string().required('Wybierz kategorię'),
        })
        .required('Wybierz kategorię'),
    condition: yup.string().required('Podaj stan przedmiotu'),
    price: yup
        .number()
        .typeError('Cena musi być liczbą')
        .integer('Cena musi składać się wyłącznie z cyfr')
        .positive('Cena musi być większa od zera')
        .required('Podaj cenę'),
});

export default addAdvertSchema;
