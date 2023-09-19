import {
  query,
  where,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  getCountFromServer,
} from "firebase/firestore";
import { app, db } from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  formatTime,
  formatDate,
  capitalizeFirstLetter,
  formatDateTime,
  formatDateToPlaceholder,
} from "../util.js";
// import { on } from "events";

// Frontend

const auth = getAuth();

onAuthStateChanged(auth, function (user) {
  if (!user) {
    window.location.href = "../login/";
  }
});

const template = document.getElementById("student-entry");
const table = document.getElementById("student-entries");
let tr = table.getElementsByTagName("tr");

let loggedIn = true;
async function loadData() {
  let q = query(collection(db, "mscheduled"));

  let querySnapshot = await getDocs(q);

  let mrOrMrs, message, href;

  querySnapshot.forEach((docItem) => {
    // console.log(person)
    if(docItem.data().date == 0) {
      updateDoc(doc(db, "mscheduled", docItem.id), {
        isScheduled: false,
      })
    }
    const clone = template.content.cloneNode(true);
    const elements = clone.childNodes[1].children;
    // console.log(elements)
    elements[0].innerHTML = `<a href="https://mail.google.com/mail/?view=cm&to=${
      docItem.data().email
    }" class="group-hover:underline" target="_blank">${capitalizeFirstLetter(
      docItem.data().firstName
    )}</a>`;
    elements[1].innerHTML = `<a href="https://mail.google.com/mail/?view=cm&to=${
      docItem.data().email
    }" class="group-hover:underline" target="_blank">${capitalizeFirstLetter(
      docItem.data().lastName
    )}</a>`;

    elements[2].innerHTML = capitalizeFirstLetter(docItem.data().counselor);
    elements[3].innerHTML = docItem.data().grade;

    elements[4].innerHTML = docItem.data().reason;
    elements[5].innerHTML = docItem.data().isScheduled ? "Yes" : "No";

    let sendEmail = elements[6].querySelector("a");
    let dateInput = elements[6].querySelector("input");


    if (docItem.data().isScheduled) {
      let datePlaceholder = formatDateToPlaceholder(docItem.data().date);
      console.log(datePlaceholder, docItem.data().date);
      dateInput.value = datePlaceholder;

      let newTooltip = sendEmail.querySelector("span");
      newTooltip.textContent = "Sent! ✅";
      sendEmail.classList.remove("invisible");
      sendEmail.href = "#";
      sendEmail.target = "_self";
      sendEmail.classList.add("cursor-not-allowed");
      sendEmail.classList.remove("hover:bg-gray-200");
      sendEmail.addEventListener('mouseover', (e) => {
        newTooltip.title = "Change the date to send a new email";
      })
      sendEmail.addEventListener('click', (e) => {
        e.preventDefault();
      })
    }

    sendEmail.id = docItem.id;
    // console.log(sendEmail);
    mrOrMrs = docItem.data().counselor == "stratton" ? "Mr." : "Mrs.";
    message = `Good morning ${
      docItem.data().firstName
    },%0AI hope your week is going well. I wanted to remind you of your meeting at [time], with ${mrOrMrs} ${capitalizeFirstLetter(
      docItem.data().counselor
    )}. Please let me know if that will work for you.%0A%0AHave a great day.%0A%0AMrs. Rockowitz`;
    message = message.replace(" ", "%20");
    href = `https://mail.google.com/mail/?view=cm&to=${
      docItem.data().email
    }&su=Meeting%20Scheduled&body=[message]`;
    let tooltip = sendEmail.querySelector("span");
    // console.log(tooltip)
    tooltip.title = `Send email to ${docItem.data().firstName} ${
      docItem.data().lastName
    }`;

    // elements[6].innerHTML = flatpickrInstance;
    // elements[5].innerHTML = person.email
    const container = document.getElementById("student-entries");
    container.appendChild(clone);
  });

  sortByFinished();

  tr = table.getElementsByTagName("tr");

  const datepickers = document.querySelectorAll("input[type=datetime-local]");
  let dates = [];
  for (let i = 0; i < datepickers.length; i++) {
    let datepicker = datepickers[i];
    dates.push(0);
    datepicker.addEventListener("change", async () => {
      const sendEmailElement = datepicker.nextElementSibling;
      sendEmailElement.classList.remove("invisible");
      dates[i] = new Date(datepicker.value);
      wasSentEmails[i] = false;
    });
  }

  let wasSentEmails = [];
  let sendEmails = document.querySelectorAll(".send-email");
  for (let i = 0; i < sendEmails.length; i++) {
    let sendEmail = sendEmails[i];
    wasSentEmails.push(false);
    sendEmail.addEventListener("mouseover", function () {
      message = message.replace(/\[time\]/, formatDateTime(dates[i]));
      message = message.replace(" ", "%20");
      href = href.replace(/\[message\]/, message);
      sendEmail.href = href;
    });
    sendEmail.addEventListener("click", function () {
      // wait 0.5 seconds
      if (wasSentEmails[i]) {
        console.log("was sent");
        sendEmail.classList.remove("hover:bg-gray-200");
        sendEmail.href = "#";
        sendEmail.target = "_self";
        return;
      }
      setTimeout(async () => {
        wasSentEmails[i] = true;
        let tooltip = sendEmail.querySelector("span");
        tooltip.title = "Change the date to send a new email";
        tooltip.textContent = "Sent! ✅";
        sendEmail.href = "#";
        sendEmail.classList.add("cursor-not-allowed");  
        console.log(sendEmail.href);
        if (dates[i] == 0) return;
        let docRef = doc(db, "mscheduled", sendEmail.id);
        await updateDoc(docRef, {
          isScheduled: true,
          date: dates[i],
        });
      }, 500);
    });
  }
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
