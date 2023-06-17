const loginForm = document.getElementById("login-form");
const studentCounselor = document.getElementById("student-counselor");
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("exit");
  studentCounselor.classList.add("enter");
});

