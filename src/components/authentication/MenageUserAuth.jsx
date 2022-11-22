import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import React, { useContext } from 'react';
import { auth } from '../../config/firebase-config';
import { UserContext } from './UserContext';

export function loginUser(email, password) {
    const [user, setUser] = useContext(UserContext);
    console.log(user);
}
