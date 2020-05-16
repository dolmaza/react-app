import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBQ2YBpl7HiyNujxTt9fKh8vp0co0SUbh0",
    authDomain: "crwn-db-4c027.firebaseapp.com",
    databaseURL: "https://crwn-db-4c027.firebaseio.com",
    projectId: "crwn-db-4c027",
    storageBucket: "crwn-db-4c027.appspot.com",
    messagingSenderId: "809316781801",
    appId: "1:809316781801:web:5d6f509a135351d528ea78"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user.', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;