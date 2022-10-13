export const getAuth = () => jest.fn;
export const signInWithPopup = () => jest.fn;
export const GoogleAuthProvider = () => jest.fn;
const user = {
  currentUser: {
    uid: 'kj3h84hr4h',
    email: 'usuario@correo.com',
  },
};
export const createUserWithEmailAndPassword = () => Promise.resolve(user);
export const signInWithEmailAndPassword = () => jest.fn;
export const onAuthStateChanged = () => jest.fn;
export const signOut = () => jest.fn;
export const initializeApp = () => jest.fn;
