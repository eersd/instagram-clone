import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDZjKM7Qq1JmL_DedVwT7swv52JIPaGIkU",
    authDomain: "instagram-clone-7e162.firebaseapp.com",
    databaseURL: "https://instagram-clone-7e162.firebaseio.com",
    projectId: "instagram-clone-7e162",
    storageBucket: "instagram-clone-7e162.appspot.com",
    messagingSenderId: "678458881257",
    appId: "1:678458881257:web:ca91ebc0acd1f3ef412c78",
    measurementId: "G-E5624EN3H9"
  }
);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export {db,auth,storage};

  //export default db;