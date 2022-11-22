import * as yup from 'yup';

const userLoginSchema = yup.object().shape({
    email: yup
        .string()
        .email('To nie wygląda na poprawny email')
        .required('Musisz podać e-mail'),
    password: yup.string().required('Nie podano hasła'),
});
export default userLoginSchema;
