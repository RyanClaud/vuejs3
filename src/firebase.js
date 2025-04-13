// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDNP5VrzrWTu-6iF3ugchO8BWtsYw_cgzA",
  authDomain: "vue3-f5328.firebaseapp.com",
  projectId: "vue3-f5328",
  storageBucket: "vue3-f5328.firebasestorage.app",
  messagingSenderId: "677256812677",
  appId: "1:677256812677:web:b5eae859d6eff0e7c6f1ec",
  measurementId: "G-T75CDW4874",
}

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig)

// Initialize Firebase Auth
const auth = getAuth(firebaseApp)

// Export necessary functions and objects
export { auth, signInWithPopup }

// Export GoogleAuthProvider for use in LoginView.vue
export const googleProvider = new GoogleAuthProvider()

// Function to sign out
export const signOutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error signing out:', error)
  }
}

// Function to register with email and password
export const registerWithEmail = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error('Error registering user:', error)
  }
}

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider)
  } catch (error) {
    console.error('Error signing in with Google:', error)
  }
}