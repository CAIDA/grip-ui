// Firebase App (the core Firebase SDK) is always required and must be listed first
import React from 'react';
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
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
};

function SignInScreen() {
    return (
        <div>
            <h1>My App</h1>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
}


function test_login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            console.log("user signed in")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("user sign in failed")
        });
}

export {test_login, SignInScreen}