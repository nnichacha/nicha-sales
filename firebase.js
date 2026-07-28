// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB6Tzu2kTRULZ1s-oGAd7xZIYpqdXUqp9w",
  authDomain: "sales-nicha.firebaseapp.com",
  databaseURL: "https://sales-nicha-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sales-nicha",
  storageBucket: "sales-nicha.firebasestorage.app",
  messagingSenderId: "934539052951",
  appId: "1:934539052951:web:8ed95ddc677bc6208c66d2",
  measurementId: "G-VZ4V32EP5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Export ให้ไฟล์อื่นเรียกใช้ได้
window.db = db;
window.ref = ref;
window.push = push;
window.set = set;
window.onValue = onValue;
