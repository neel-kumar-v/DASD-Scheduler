// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN2ACIBypMQVHOuucArao1CupZql0zms0",
  authDomain: "dasd-scheduler.firebaseapp.com",
  projectId: "dasd-scheduler",
  storageBucket: "dasd-scheduler.appspot.com",
  messagingSenderId: "309908797476",
  appId: "1:309908797476:web:53b0f06527391b778d00b1",
  measurementId: "G-YM7DTK26QL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const passwordInput = document.querySelector(".pass-field input");
const requirementList = document.querySelectorAll(".requirement-list li");
const submitButton = document.getElementById("submit-button");
const loginForm = document.getElementById("login-form");
const studentCounselor = document.getElementById("student-counselor");

const requirements = [
  { regex: /.{8,}/, index: 0 }, // Minimum of 8 characters
  { regex: /[0-9]/, index: 1 }, // At least one number
  { regex: /[a-z]/, index: 2 }, // At least one lowercase letter
  { regex: /[^A-Za-z0-9]/, index: 3 }, // At least one special character
  { regex: /[A-Z]/, index: 4 }, // At least one uppercase letter
]
passwordInput.addEventListener("keyup", (e) => {
  requirements.forEach(item => {
      // Check if the password matches the requirement regex
      const isValid = item.regex.test(e.target.value);
      const requirementItem = requirementList[item.index];
      // Updating class and icon of requirement item if requirement matched or not
      if (isValid) {
          requirementItem.classList.add("valid");
          requirementItem.firstElementChild.className = "fa-solid fa-check";
      } else {
          requirementItem.classList.remove("valid");
          requirementItem.firstElementChild.className = "fa-solid fa-circle";
      }
  });
});

emailField = form.querySelector(".email-field"),
emailInput = emailField.querySelector(".email"),
passField = form.querySelector(".password-field"),


// Email Validtion
function checkEmail() {
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
if (!emailInput.value.match(emailPattern)) {
  return emailField.classList.add("invalid"); 
}
emailField.classList.remove("invalid"); 
}

// Password Validation
function createPass() {
  const password = passwordInput.value;
  const isValidPassword =
    password.length >= 8 &&
    /[0-9]/.test(password) &&
    /[a-z]/.test(password) &&
    /[^A-Za-z0-9]/.test(password) &&
    /[A-Z]/.test(password);

  if (!isValidPassword) {
    passField.classList.add("invalid");
  } else {
    passField.classList.remove("invalid");
  }
}


// Calling Funtion on Form Sumbit
submitButton.addEventListener("click", (e) => {
e.preventDefault();
checkEmail();
createPass();

emailInput.addEventListener("keyup", checkEmail);
passwordInput.addEventListener("keyup", createPass);

if (
  !emailField.classList.contains("invalid") &&
  !passField.classList.contains("invalid")
) {
  location.href = form.getAttribute("action");
} else {
  loginForm.classList.add("exit");
  studentCounselor.classList.add("enter");
}
});