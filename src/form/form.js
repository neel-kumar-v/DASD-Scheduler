import { getQueryVariable, setQueryVariable } from "../util";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { db } from "../firebase.js";

let counselor, grade, reason, firstName, lastName, email, future;
let docRef;
let presentCheckbox = document.getElementById('present');
const dateInput = document.getElementById("date");
const sendButton = document.getElementById("send-button");
let titleElement = document.getElementById("title");
window.onload = function () {
  console.log("onload function");
  // getQueryVariable('counselor')
  //create a tailwind h1 with the var
  counselor = getQueryVariable("counselor");
  if (counselor != null) {
    const radio = document.querySelector(
      `input[type="radio"][name="counselor"][value=${counselor}]`
    );
    radio.checked = true;
  }

  grade = getQueryVariable("grade");
  if (grade != null) {
    const gradeRadio = document.querySelector(
      `input[type="radio"][name="grade"][value=${grade}]`
    );
    gradeRadio.checked = true;
  }

  reason = getQueryVariable("reason");
  if (reason != null) {
    const reasonSelect = document.querySelector(
      `select[name="reason"] option[value="${reason}"]`
    );
    reasonSelect.selected = true;
    
  }
  firstName = getQueryVariable("firstName");
  if (firstName != null) {
    const firstNameInput = document.querySelector(
      `input[name="firstName"]`
    );
    firstNameInput.value = firstName;
  }

  lastName = getQueryVariable("lastName");
  if (lastName != null) {
    const lastNameInput = document.querySelector(
      `input[name="lastName"]`
    );
    lastNameInput.value = lastName;
  }

  email = getQueryVariable("email");

  if (email != null) {
    const emailInput = document.querySelector(
      `input[name="email"]`
    );
    emailInput.value = email;
  }

  future = getQueryVariable("future");
  console.log(future);
  if(future == 'true') {
    presentCheckbox.checked = false;
    titleElement.innerText = "Schedule a Meeting";
    
  } else {
    presentCheckbox.checked = true;
    titleElement.innerText = "Log A Meeting";
  }

  dateInput.disabled = presentCheckbox.checked;
  dateInput.value = '';

  if (presentCheckbox.checked) {
    dateInput.style.opacity = '0.5';
  } else {
    dateInput.style.opacity = '1';
  }

  presentCheckbox.addEventListener('change', function() {
    dateInput.disabled = this.checked;
    dateInput.value = '';

    if (this.checked) {
      dateInput.style.opacity = '0.5';
      sendButton.classList.add("invisible");
    } else {
      dateInput.style.opacity = '1';
      // sendButton.classList.remove("invisible");
    }
  });
  
  dateInput.addEventListener("change", () => {
    console.log("date changed");
    const selectedDate = dateInput.value;
    if (selectedDate != "") {
      sendButton.classList.remove("invisible");
    } else {
      sendButton.classList.add("invisible");
    }
    
  });
  
  document.getElementById("send-email-button").addEventListener("click", (e) => {
    e.preventDefault();
    // Add your email sending logic here
  });
  
}

const firebaseTemplate = {
  firstName: "Neel",
  lastName: "Kumar",
  email: "24nkumar@student.dasd.org",
  reason: "Scheduled Visit/Meeting",
  grade: "10",
  counselor: "hewitt",
  date: Date.now(),
  active: true,
  date_end: 0,
};
function getData() {
  let date;
  // const formattedDate = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
  const firstName = document.querySelector(
    "form[name='main'] input[name='firstName']"
  ).value;
  const lastName = document.querySelector(
    "form[name='main'] input[name='lastName']"
  ).value;
  let email = document.querySelector(
    "form[name='main'] input[name='email']"
  ).value + "@student.dasd.org";
  if(email.includes("@student.dasd.org@student.dasd.org")) {
    // split the string at the second @
    email = email.split("@")[0] + "@student.dasd.org"
  }
  const reason = document.querySelector(
    "form[name='main'] select[name='reason']"
  ).value;
  const grade = document.querySelector(
    "form[name='main'] input[name='grade']:checked"
  ).value;
  const counselor = document.querySelector(
    "form[name='main'] input[name='counselor']:checked"
  ).value;
  if (presentCheckbox.checked) {
    date = Date.now();
    firebaseData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      reason: reason,
      grade: grade,
      counselor: counselor,
      date: date,
      date_end: 0,
      active: true
    };
  } else {
    date = document.querySelector(
      "input#date"
    ).value;
    firebaseData =  {
      firstName: firstName,
      lastName: lastName,
      email: email,
      reason: reason,
      grade: grade,
      counselor: counselor,
      date: date,
      isScheduled: true
    };
  }
}
document.getElementById("submit-button").onclick = async function handleSubmit(event) {
  event.preventDefault();
  console.log("hello");
  getData()

  if (presentCheckbox.checked) {
    try {
      docRef = await addDoc(collection(db, "checkin"), firebaseData);
      // history.back();
    } catch(e) {
      console.error("Document add threw error:", e);
    }
  } else {
    try {
      docRef = await addDoc(collection(db, "mscheduled"), firebaseData);
      // history.back();
    } catch(e) {
      console.error("Document add threw error:", e);
    }
  }

  console.log(firebaseData);

  
};
