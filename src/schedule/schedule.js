import {
  query,
  where,
  collection,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { app, db } from "../firebase.js";
import { formatTime, formatDate, capitalizeFirstLetter } from "../util.js";

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
    collection(db, "mscheduled")
    // where("isScheduled", "==", false)
  );

  let querySnapshot = await getDocs(q);

  // console.log(querySnapshot)

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
    elements[5].innerHTML = doc.data().isScheduled ? "Yes" : "No";
    
    let sendEmail = elements[6].querySelector("a");
    console.log(sendEmail)  
    let mrOrMrs = doc.data().counselor == "stratton" ? "Mr." : "Mrs.";
    let message = 
    `Good%20morning%20${doc.data().firstName},%0AI%20hope%20your%20week%20is%20going%20well.%20I%20wanted%20to%20remind%20you%20of%20your%20meeting,%20today%20at%20${formatTime(doc.data().date)},%20with%20${mrOrMrs}%20${capitalizeFirstLetter(doc.data().counselor)}.%20Please%20let%20me%20know%20if%20that%20will%20work%20for%20you.%0A%0AHave%20a%20great%20day.%0A%0AMrs.%20Rockowitz`
    sendEmail.href = `https://mail.google.com/mail/?view=cm&to=${doc.data().email}&su=Meeting%20Scheduled&body=${message}`
    let tooltip = sendEmail.querySelector("span");
    // console.log(tooltip)
    tooltip.title =  `Send email to ${doc.data().firstName} ${doc.data().lastName}`

    // elements[6].innerHTML = flatpickrInstance;
    // elements[5].innerHTML = person.email
    const container = document.getElementById("student-entries");
    container.appendChild(clone);
  });

  sortByFinished();

  tr = table.getElementsByTagName("tr");

  const datepickers = document.querySelectorAll("input[type=datetime-local]");
  datepickers.forEach((datepicker) => {
    datepicker.addEventListener("change", async () => {
      const sendEmailElement = datepicker.nextElementSibling;
      sendEmailElement.classList.remove("invisible");
    });
  });

  // const sendEmails = document.querySelectorAll(".send-email");
  // sendEmails.forEach((sendEmail) => {
  //   sendEmail.addEventListener("click", async () => {
      
  //   });
  // })
}



window.onload = async function () {
  if (!loggedIn) {
    window.location.href = "/login/";
  }
  await loadData();
};

function sortByFinished(descending = false) {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table-student-entries");
  switching = true;

  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      // Start from index 1 to skip the header row
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[5].textContent.toLowerCase();
      y = rows[i + 1].getElementsByTagName("td")[5].textContent.toLowerCase();

      if (
        (x === "no" && y === "yes" && descending) ||
        (x === "yes" && y === "no" && !descending)
      ) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
