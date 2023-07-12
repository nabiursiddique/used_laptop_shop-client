import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // Creating a user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Login user with email and password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // create and login with google
    const googleSignIn =()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

    // Update user profile (name, image)
    const updateUser =(userInfo)=>{
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo);
    }


    // SignOut a Logged in user
    const logOut =()=>{
        setLoading(true);
        return signOut(auth);
    }

    // Getting the current logged in user and setting it on the state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        createUser,
        signIn,
        googleSignIn,
        logOut,
        user,
        updateUser,
        loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;