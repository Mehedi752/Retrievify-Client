import { createContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import auth from '../../public/firebase.config'
import useAxiosPublic from '../hooks/useAxiosPublic'
import { toast } from 'react-toastify'

// Create a context
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // Create new user
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign in user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Sign out user
    const signOutUser = () => {
        return signOut(auth)
    }

    // Update user profile
    const updateProfileUser = (updateInfo) => {
        return updateProfile(auth.currentUser, updateInfo);
    }


    // Sign in with Google
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }


    // Check if any user is logged in
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, currentUser => {
            console.log('Current State : ', currentUser?.email);


            if (currentUser?.email) {
                setUser(currentUser);
                setLoading(false);
                const user = { email: currentUser.email };

                axiosPublic.post('/users', user)
                    .then(res => {
                        //console.log('User added to database : ', res.data);
                        if(res.data.insertedId){
                            toast.success(`Welcome ${currentUser.displayName} to our website`);
                        }
                    })
                    .catch(err => {
                        //console.log('Error adding user to database : ', err);
                    })
                

            } 
            
            else {
                setUser(null);
                setLoading(false);
            }
        })

        return () => {
            unsubcribe()
        }
    }, [])


    // Auth info
    const authInfo = {
        createNewUser,
        user,
        setUser,
        signInUser,
        signOutUser,
        loading,
        updateProfileUser,
        signInWithGoogle
    }

    return (
        <div className=''>
            <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
        </div>
    )
}

export default AuthProvider;