//  Web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCfJC4RCihvWG7OWjQponwnuLafDeJkMuU",
    authDomain: "ucan-8aa2e.firebaseapp.com",
    projectId: "ucan-8aa2e",
    storageBucket: "ucan-8aa2e.appspot.com",
    messagingSenderId: "905818266002",
    appId: "1:905818266002:web:6c61e12d757d5cb9e3894b",
    measurementId: "G-BZCBFWYTFW"
};

// initialize the Firebase app
// initialize Firestore database if using it
const app = firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();