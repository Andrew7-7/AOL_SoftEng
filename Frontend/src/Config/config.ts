import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyA9aFv0P3aLL6mRs1Ws69teQ64zO_r4nHc",
//   authDomain: "aolsofteng.firebaseapp.com",
//   projectId: "aolsofteng",
//   storageBucket: "aolsofteng.appspot.com",
//   messagingSenderId: "44471509166",
//   appId: "1:44471509166:web:1958984b1ccee246de0d3f",
//   measurementId: "G-Y46L692TML",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCj8tXysHoYJ1Qwd6QiwZiwlHnoNoM2P9c",
  authDomain: "aol-se-testing.firebaseapp.com",
  projectId: "aol-se-testing",
  storageBucket: "aol-se-testing.appspot.com",
  messagingSenderId: "642435954211",
  appId: "1:642435954211:web:43f2ad255b8bef0e896396",
};

const fireApp = initializeApp(firebaseConfig);

const db = getFirestore(fireApp);
const storages = getStorage(fireApp);

export { db, storages };
