// Get a RTDB instance
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'


export const db = firebase
  .initializeApp({
          apiKey: "AIzaSyAVjzLAX7YzDSJueE2VxUxqDZawSZlJTt8",
      authDomain: "patrimoine-pontault-combault.firebaseapp.com",
      databaseURL: "https://patrimoine-pontault-combault.firebaseio.com",
      projectId: "patrimoine-pontault-combault",
      storageBucket: "gs://projet-app-a43c6.appspot.com",
      messagingSenderId: "1069741740602" })
  .database();

export const fire=firebase;

// Get a reference to the storage service, which is used to create references in your storage bucket
export var storage = firebase.storage();

// Create a storage reference from our storage service
export var storageRef = storage.ref();
