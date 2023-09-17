import {
  
  query,
  where,
  collection,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { app, db } from "../firebase.js";
import { formatTime, formatDate, capitalizeFirstLetter } from "../util.js";
import flatpickr from "flatpickr";

// Frontend

// const auth = getAuth();

// onAuthStateChanged(auth, function(user) {
//   if (!user) {
//     window.location.href = '../login/'
//   }
// });


const template = document.getElementById("student-entry");
const table = document.getElementById("student-entries");
let tr = table.getElementsByTagName("tr");

let loggedIn = true;
async function loadData() {
  
  let q = query(
    collection(db, "mscheduled"),
    where("isScheduled", "==", false)
  );

  
  
  let querySnapshot = await getDocs(q);
  
  console.log(querySnapshot)
  
  querySnapshot.forEach((doc) => {
    // console.log(person)
    const clone = template.content.cloneNode(true);
    const elements = clone.childNodes[1].children;
    // console.log(elements)
    elements[0].innerHTML = `<a href="https://mail.google.com/mail/?view=cm&to=${
      doc.data().email
    }" class="group-hover:underline" target="_blank">${capitalizeFirstLetter(
      doc.data().firstName
    )}</a>`;
    elements[1].innerHTML = `<a href="https://mail.google.com/mail/?view=cm&to=${
      doc.data().email
    }" class="group-hover:underline" target="_blank">${capitalizeFirstLetter(
      doc.data().lastName
    )}</a>`;

    elements[2].innerHTML = capitalizeFirstLetter(doc.data().counselor);
    elements[3].innerHTML = doc.data().grade;
      
    elements[4].innerHTML = doc.data().reason;

    // elements[6].innerHTML = flatpickrInstance;
    // elements[5].innerHTML = person.email
    const container = document.getElementById("student-entries");
    container.appendChild(clone);
  });

  tr = table.getElementsByTagName("tr");
};

window.onload = async function () {
  if (!loggedIn) {
    window.location.href = "/login/";
  }
  await loadData();
}

const datepickers = document.querySelectorAll("input[type=datepicker-local]")
datepickers.forEach((datepicker) => {
  datepicker.addEventListener("change", (e) => {

  })
})

function sortByFinished(descending = true) {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table-student-entries");
  switching = true;
  
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 2; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = parseInt(rows[i].getElementsByTagName("td")[5].id);
      y = parseInt(rows[i + 1].getElementsByTagName("td")[5].id);
      if (descending) {
        if (x < y) {
          shouldSwitch = true;
          break;
        }
      } else {
        if (x > y) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      if (descending) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      } else {
        rows[i + 1].parentNode.insertBefore(rows[i], rows[i + 1]);
        switching = true;
      }
    }
  }
}

