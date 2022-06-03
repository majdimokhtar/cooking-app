import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBKcIVD3aj-cm58NRsJJ8UJD2F563H9A_s",
    authDomain: "cooking-site-e8372.firebaseapp.com",
    projectId: "cooking-site-e8372",
    storageBucket: "cooking-site-e8372.appspot.com",
    messagingSenderId: "13093994574",
    appId: "1:13093994574:web:979bc1c1ff8ffbc4ddc31f"
  };
//   init firebase
firebase.initializeApp(firebaseConfig)
// init services
const projectFirestore = firebase.firestore()

export {projectFirestore}