import * as yup from 'yup';

const userDataSchema = yup.object().shape({
    email: yup
        .string()
        .email('To nie wygląda na poprawny email')
        .required('Musisz podać e-mail'),
    password: yup.string().required('Twoje konto musi mieć hasło'),
});
export default userDataSchema;
