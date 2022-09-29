/* eslint-disable max-len */
import {
  getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import {
  getFirestore, collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp, getDoc, doc, updateDoc, deleteDoc, arrayUnion, arrayRemove,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
import { onNavigate } from '../main.js';
import { app } from './firebase.js';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const registerWithGoogle = () => signInWithPopup(auth, provider);
export const userLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const savePost = (post) => {
  addDoc(collection(db, 'posts'), {
    post, createdAt: serverTimestamp(), userEmail: auth.currentUser.email, likes: [],
  });
};

const order = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(10));
export const onGetPost = (callback) => onSnapshot(order, callback);

export const emailUser = [];
console.log(emailUser);
export function loginStateUser() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const email = user.email;
      emailUser.push(email);
      console.log('Existe un usuario activo', uid, email);
      onNavigate('/homepage');
    } else {
      console.log('no existe usuario activo');
      onNavigate('/');
    }
  });
}

export const getPost = (id) => getDoc(doc(db, 'posts', id));
export const updatePost = (id, newFields) => updateDoc(doc(db, 'posts', id), newFields);
export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));

export const likesPost = async (iddocument, option) => {
  const Postlike = doc(db, 'posts', iddocument);
  await updateDoc(Postlike, {
    likes: arrayUnion(auth.currentUser.email),
  });
};

export const dislikesPost = async (iddocument, option) => {
  const Postlike = doc(db, 'posts', iddocument);
  await updateDoc(Postlike, {
    likes: arrayRemove(auth.currentUser.email),
  });
};
