// Firebase App (the core Firebase SDK) is always required and must be listed first
import React, {createContext, useContext, useEffect, useState} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase/app";
import "firebase/auth";
import "firebaseui"


const firebaseConfig = {
    apiKey: "AIzaSyCKwZuWNrB5xSz3wkvgm37hNZZKGauoPC8",
    authDomain: "grip-test.firebaseapp.com",
    projectId: "grip-test",
    storageBucket: "grip-test.appspot.com",
    messagingSenderId: "459445931001",
    appId: "1:459445931001:web:9326ab7e2ea722d7718b28"
};
firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signin',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
};

function SignInScreen() {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    if (!isSignedIn) {
        return (
            <div>
                <h1>GRIP User Sign-in</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }
    return (
        <div>
            <h1>GRIP User Sign-in</h1>
            <p>Welcome {firebase.auth().currentUser.email}! You are now signed-in!</p>
            <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
        </div>
    );
}

const FirebaseAuthContext = createContext(undefined)

let FirebaseAuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const value = { user };

    useEffect( () => {
        return firebase.auth().onAuthStateChanged(setUser);
        }, []);

    return (
        <FirebaseAuthContext.Provider value={value}>
            {children}
        </FirebaseAuthContext.Provider>
    )
}

function getCurrentUser() {
    const context = useContext(FirebaseAuthContext);
    if (context === undefined) {
        throw new Error(
            "useFirebaseAuth must be used within a FirebaseAuthProvider"
        );
    }
    return context.user;
}

function UserProfile() {
    return (
    <FirebaseAuthProvider>
        <UserEmail />
    </FirebaseAuthProvider>
    );
}

function UserEmail() {
    const user = getCurrentUser();
    return <div>{user?.email || "unauthenticated"}</div>;
}

export {SignInScreen, FirebaseAuthProvider, getCurrentUser, UserProfile}