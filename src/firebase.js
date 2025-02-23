import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDC9TbUuVPselst5F8D2pRkdqIunOGRp3Q",
  authDomain: "netflix-clone-a4996.firebaseapp.com",
  projectId: "netflix-clone-a4996",
  storageBucket: "netflix-clone-a4996.firebasestorage.app",
  messagingSenderId: "852672418075",
  appId: "1:852672418075:web:dc60e834bfc167f06343be"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        //alert(error);
        toast.error(error.code.split('/')[1].split('-').join(""));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        //alert(error);
        toast.error(error.code.split('/')[1].split('-').join(""));
    }
}

const logout = async () => {
    signOut(auth);
};

export { auth, db, login, signup, logout};