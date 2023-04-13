import {initializeApp} from "firebase/app";
import {connectFirestoreEmulator, getFirestore,} from "firebase/firestore";

const firebase = initializeApp({
    apiKey: "AIzaSyA0tgztbEzTBlUjNXiTcs82S0q87Odbo4M",
    authDomain: "hackserver-9c717.firebaseapp.com",
    projectId: "hackserver-9c717",
    storageBucket: "hackserver-9c717.appspot.com",
    messagingSenderId: "936311458867",
    appId: "1:936311458867:web:15ea2795016223523ee746",
});

export const firestore = getFirestore(firebase);

if (location.hostname === "localhost") {
    connectFirestoreEmulator(firestore, "localhost", 9090);
}