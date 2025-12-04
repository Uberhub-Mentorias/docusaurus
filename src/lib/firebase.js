// Configuração do Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBV0Z7l1G8ot2_w3ec5LT5musNp0TW011w",
  authDomain: "mentorias-uberhub.firebaseapp.com",
  projectId: "mentorias-uberhub",
  storageBucket: "mentorias-uberhub.firebasestorage.app",
  messagingSenderId: "248660691174",
  appId: "1:248660691174:web:35d1660691c1ffca115327"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

export default app;

