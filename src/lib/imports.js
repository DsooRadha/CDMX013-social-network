export {
  getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, onAuthStateChanged, signOut,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
export {
  getFirestore, collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp, getDoc, doc,
  updateDoc, deleteDoc, arrayUnion, arrayRemove,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
export { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js';
