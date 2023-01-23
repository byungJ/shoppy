import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, set, get, onValue } from "firebase/database";
import {v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
//   return signInWithPopup(auth, provider)
//     .then((result) => {
//       const user = result.user;
//       console.log(user);
//       return user;
//     })
//     .catch(console.error);
    signInWithPopup(auth, provider).catch(console.error);
}

export async function logout() {
  //return signOut(auth).then(() => null);
  signOut(auth);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user ? await adminUser(user) : null;
    callback(updateUser);
  });
}

async function adminUser(user) {
    return get(ref(database, 'admins'))
        .then((snapshot) => {
            if(snapshot.exists()) {
                const admins = snapshot.val();
                console.log('admins', admins);
                const isAdmin = admins.includes(user.uid);
                return {...user, isAdmin}
            }
            return user;
    });
}

export async function addNewProduct(product, imageUrl) {
    const id = uuid();
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image: imageUrl,
        options: product.options.split(','),
    })
}

export async function getProducts() {
  return get(ref(database, 'products')).then(snapshot => {
    if(snapshot.exists()) {
      
      // value값들만 뽑아서 사용합니다.
      console.log('Object',Object.values(snapshot.val()));
      console.log('기본test', snapshot.val());
      return Object.values(snapshot.val());
    }
    return [];
  })
}

// 자동로그인 멈춤.
provider.setCustomParameters({
    prompt: "select_account",
});
    
    