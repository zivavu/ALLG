import * as yup from 'yup';

const userRegisterSchema = yup.object().shape({
    email: yup
        .string()
        .email('To nie wygląda na poprawny email')
        .required('Musisz podać e-mail'),
    password: yup
        .string()
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .max(60, 'Nie przesadzaj z długością hasła(max 60)')
        .required('Twoje konto musi mieć hasło'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Hasła nie są takie same'),
});
export default userRegisterSchema;
