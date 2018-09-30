import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
//Reducers
// todo

const firebaseConfig = {
  apiKey: "AIzaSyCwYn_IYhYFrJDT6bxar-nEAuIfVpH8fA4",
  authDomain: "mastaclientpanel.firebaseapp.com",
  databaseURL: "https://mastaclientpanel.firebaseio.com",
  projectId: "mastaclientpanel",
  storageBucket: "mastaclientpanel.appspot.com",
  messagingSenderId: "503276120950"
};

// react-redux-firebase cfg
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase  instance
firebase.initializeApp(firebaseConfig);
// Initialize firestore
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

//Create initial state
const initialState = {};

//Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
