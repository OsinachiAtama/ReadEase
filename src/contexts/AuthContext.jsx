// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth, db } from "./firebase.js";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   sendEmailVerification,
//   updateProfile,
//   GoogleAuthProvider,
//   signInWithPopup,
//   getIdToken,
// } from "firebase/auth";
// import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// // Create the context
// export const AuthContext = createContext();

// // Hook to consume it in components
// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null); // firebase user + extra Firestore data
//   const [loading, setLoading] = useState(true);

//   // --- SIGN UP (email/password) ---
//   async function signup(email, password, displayName) {
//     const cred = await createUserWithEmailAndPassword(auth, email, password);

//     // update profile displayName in Firebase Auth
//     await updateProfile(cred.user, { displayName });

//     // create user doc in Firestore
//     await setDoc(doc(db, "users", cred.user.uid), {
//       uid: cred.user.uid,
//       displayName,
//       email: cred.user.email,
//       createdAt: serverTimestamp(),
//       roles: { user: true },
//     });

//     return cred.user;
//   }

//   // --- SIGN IN ---
//   function login(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   // --- GOOGLE SIGN-IN (popup) ---
//   async function signInWithGoogle() {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     const u = result.user;

//     // ensure a Firestore doc exists
//     const userDoc = await getDoc(doc(db, "users", u.uid));
//     if (!userDoc.exists()) {
//       await setDoc(doc(db, "users", u.uid), {
//         uid: u.uid,
//         displayName: u.displayName || null,
//         email: u.email,
//         createdAt: serverTimestamp(),
//         provider: "google",
//         roles: { user: true },
//       });
//     }
//     return u;
//   }

//   // --- LOGOUT ---
//   function logout() {
//     return signOut(auth);
//   }

//   // --- PASSWORD RESET ---
//   function resetPassword(email) {
//     return sendPasswordResetEmail(auth, email);
//   }

//   // --- EMAIL VERIFICATION ---
//   function sendVerificationEmail(user) {
//     return sendEmailVerification(user);
//   }

//   // --- GET TOKEN ---
//   async function getToken() {
//     if (!auth.currentUser) return null;
//     return await getIdToken(auth.currentUser, false);
//   }

//   // --- AUTH STATE LISTENER ---
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         // load extra profile data from Firestore
//         const snap = await getDoc(doc(db, "users", firebaseUser.uid));
//         setUser({
//           ...firebaseUser,
//           profile: snap.exists() ? snap.data() : null,
//         });
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   // Provide values to consumers
//   const value = {
//     user,
//     signup,
//     login,
//     logout,
//     resetPassword,
//     signInWithGoogle,
//     sendVerificationEmail,
//     getToken,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }