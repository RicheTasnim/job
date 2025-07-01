import React, { useEffect, useState } from 'react';
import AuthContecxt from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../firebase/firebase.init';
import axios from 'axios';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            if(currentUser?.email){
                const user = {email: currentUser.email};
                axios.post('https://job-portal-server-teal-seven.vercel.app/jwt', user, {withCredentials: true})
                .then(res => {
                    console.log('login',res.data);
                    setLoading(false);
                })
            }
            else {
                axios.post('https://job-portal-server-teal-seven.vercel.app/logout', {}, {
                    withCredentials: true
                })
                .then(res => {
                    console.log('logout', res.data);
                    setLoading(false);
                })
            }
            
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    const signInUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('state captured', currentUser);
            setLoading(false);
        })
        return () =>{
            unsubscribe();
        }
    },[])

    const authInfo ={
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
    }

    return (
        <AuthContecxt.Provider value={authInfo}>
            {children}
        </AuthContecxt.Provider>
    );
};

export default AuthProvider;