import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import { app } from './firebase.js';
import { onNavigate } from '../main.js';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const registerWithGoogle = () => signInWithPopup(auth, provider);
export const userLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const saveTask = (description) => {
    addDoc(collection(db, 'post'), { description }
    )
};
export const getTask = () => getDocs(collection(db, 'tasks'));
export const onGetTask=(callback)=>onSnapshots(colllection(db, 'tasks'),callback);
//export const observador = () =>  onAuthStateChanged(auth, (user) )

export const observador = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const email = user.email;
        console.log('Existe un usuario activo', uid, email);
        onNavigate('/homepage');
      } else {
        // User is signed out
        // ...
        console.log('no existe usuario activo');
        onNavigate('/');
      }
    });
  }