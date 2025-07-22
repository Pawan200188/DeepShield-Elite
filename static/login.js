
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBOYwapMbceNu23IxRg1AlYYuxKnd1Cah0", // Replace with your actual API key
  authDomain: "deepshield-12e87.firebaseapp.com",
  projectId: "deepshield-12e87",
  storageBucket: "deepshield-12e87.appspot.com", // Corrected from 'firebasestorage.app'
  messagingSenderId: "787418425223",
  appId: "1:787418425223:web:fbce8c15159691ed6b1522"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const button = document.getElementById('loginButton');
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Placeholder effect
        inputs.forEach(input => input.setAttribute('placeholder', ' '));

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        button.classList.add('loading');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user);
            window.location.href = 'index.html';
        } catch (error) {
            console.error(error);
            alert('Login failed. Please check your credentials and try again.');
        } finally {
            button.classList.remove('loading');
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

