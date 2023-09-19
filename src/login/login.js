import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { validateUser } from "../firebase.js";

const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit-button");
const loginForm = document.getElementById("login-form");
const studentCounselor = document.getElementById("student-counselor");

const auth = getAuth();

const requirements = [
  { regex: /.{8,}/, index: 0 }, // Minimum of 8 characters
  { regex: /[0-9]/, index: 1 }, // At least one number
  { regex: /[a-z]/, index: 2 }, // At least one lowercase letter
  { regex: /[^A-Za-z0-9]/, index: 3 }, // At least one special character
  { regex: /[A-Z]/, index: 4 }, // At least one uppercase letter
];

let isValid = true;
passwordInput.addEventListener("keyup", (e) => {
  checkPassword(e)
});

function checkPassword(e) {
  return true;
  // requirements.forEach((item) => {
  //   console.log(e.target.value)
  //   if (item.regex.test(e.target.value)) return;
  //   isValid = false;
  // });

  // if (!isValid) {
  //   console.log("bad password");
  //   passField.classList.add("invalid");
  // } else {
  //   passField.classList.remove("invalid");
  //   console.log("good password");
  // }
  // return isValid;
}

let emailField = loginForm.querySelector(".email-field");
let emailInput = emailField.querySelector(".email");
let passField = loginForm.querySelector(".password-field");

// Email Validtion
function checkEmail() {
  const emailPattern = /^[^ ]+@[^ ]+dasd[^ ]*\.org$/;
  if (!emailInput.value.match(emailPattern)) {
    emailField.classList.add("invalid");
    return false;
  }
  emailField.classList.remove("invalid");
  return true;
}

// Password Validation
emailInput.addEventListener("keyup", checkEmail);
// passwordInput.addEventListener("keyup", createPass);

// Calling Funtion on Form Sumbit
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  checkEmail();
  // createPass();
  console.log("hello");

  const emailValid = checkEmail();

  const passValid = checkPassword(e);
  if (!emailValid || !passValid) {
    console.log("bad email or password");
    return;
  }
  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((userCredential) => {
      window.location.href = "../reports/";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});
