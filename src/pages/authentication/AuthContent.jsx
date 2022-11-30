import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase-config';

export async function loginUser(email, password) {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error.message);
    }
}
