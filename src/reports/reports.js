import {
  query,
  where,
  collection,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app, db } from "../firebase.js";
import { formatTime, formatDate, capitalizeFirstLetter } from "../util.js";

export let meetingId;

// Frontend

const auth = getAuth();

onAuthStateChanged(auth, function(user) {
  if (!user) {
    window.location.href = '../login/'
  } else {
    console.log(user)
  }
});

const counselorFilterDropdownButton = document.getElementById(
  "filterDropdownButton"
);
const counselorFilterDropdown = document.getElementById("filterDropdown");
counselorFilterDropdownButton.addEventListener("click", () => {
  counselorFilterDropdown.classList.toggle("hidden");
  closeOtherDropdowns(counselorFilterDropdown);
});
const reasonFilterDropdownButton = document.getElementById(
  "filterDropdownButton2"
);
const reasonFilterDropdown = document.getElementById("filterDropdown2");
reasonFilterDropdownButton.addEventListener("click", () => {
  reasonFilterDropdown.classList.toggle("hidden");
  closeOtherDropdowns(reasonFilterDropdown);
});
const gradeFilterDropdownButton = document.getElementById(
  "filterDropdownButton3"
);
const gradeFilterDropdown = document.getElementById("filterDropdown3");
gradeFilterDropdownButton.addEventListener("click", () => {
  gradeFilterDropdown.classList.toggle("hidden");
  closeOtherDropdowns(gradeFilterDropdown);
});
const dateFilterDropdownButton = document.getElementById(
  "filterDropdownButton4"
);
const dateFilterDropdown = document.getElementById("filterDropdown4");
dateFilterDropdownButton.addEventListener("click", () => {
  dateFilterDropdown.classList.toggle("hidden");
  closeOtherDropdowns(dateFilterDropdown);
});

const dropdowns = [
  counselorFilterDropdown,
  reasonFilterDropdown,
  gradeFilterDropdown,
  dateFilterDropdown,
];

function closeOtherDropdowns(openedDropdown) {
  dropdowns.forEach((dropdown) => {
    if (dropdown !== openedDropdown) {
      if (!dropdown.classList.contains("hidden")) {
        dropdown.classList.add("hidden");
      }
    }
  });
}

const containerElements = document.querySelectorAll(".dropdown-container");

containerElements.forEach((containerElement) => {
  containerElement.addEventListener("focusout", function (e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      closeAllDropdowns();
    }
  });
});

function closeAllDropdowns() {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.classList.contains("hidden")) {
      dropdown.classList.add("hidden");
    }
  });
}

function startOfDay(timestamp) {
  // Convert the timestamp from milliseconds to seconds
  let date = new Date(timestamp);

  // Set the time to the start of the day (midnight)
  date.setHours(0, 0, 0, 0);

  // Convert back to the large number format (milliseconds since the Unix epoch)
  return date.getTime();
}
let loggedIn = true;
async function loadData() {
  
  let q = query(
    collection(db, "checkin"),
    where("date", ">=", Date.now() - 1000 * 86400 * 365)
  );
  let snapshot = await getCountFromServer(q);
  document.getElementById("yearly-meetings").innerText =
    snapshot._data.count.integerValue;
  q = query(
    collection(db, "checkin"),
    where("date", ">=", Date.now() - 1000 * 86400 * 30)
  );
  snapshot = await getCountFromServer(q);
  document.getElementById("monthly-meetings").innerText =
    snapshot._data.count.integerValue;
  q = query(
    collection(db, "checkin"),
    where("date", ">=", Date.now() - 1000 * 86400 * 7)
  );
  snapshot = await getCountFromServer(q);
  document.getElementById("weekly-meetings").innerText =
    snapshot._data.count.integerValue;

  // console.log(startOfDay(1694558471326));
  let template = document.getElementById("student-entry");

  let totalQuery = query(
    collection(db, "checkin"),
    where("date", ">=", Date.now() - 1000 * 86400 * 365)
  );
  let querySnapshot = await getDocs(q);
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

    elements[0].id = doc.id

    elements[1].innerHTML = `<a href="https://mail.google.com/mail/?view=cm&to=${
      doc.data().email
    }" class="group-hover:underline" target="_blank">${capitalizeFirstLetter(
      doc.data().lastName
    )}</a>`;

    elements[1].id = doc.id

    elements[2].innerHTML = capitalizeFirstLetter(doc.data().counselor);
    elements[3].innerHTML = doc.data().grade;

    elements[4].innerHTML = `${formatDate(doc.data().date)} ${formatTime(doc.data().date)}`;
    elements[4].id = doc.data().date;

    console.log(doc.data().date_end);

    if(doc.data().date_end == 0 || doc.data().date_end == null) {
      elements[5].innerHTML = "N/A";
      elements[5].id = 0;
    } else {
      elements[5].innerHTML = `${formatDate(doc.data().date_end)} ${formatTime(doc.data().date_end)}`;
      elements[5].id = doc.data().date_end;
    }



    elements[6].innerHTML = doc.data().reason;
    // elements[5].innerHTML = person.email
    const container = document.getElementById("student-entries");
    container.appendChild(clone);
  });
  tr = table.getElementsByTagName("tr");
  sortByDate();
};

window.onload = async function () {
  if (!loggedIn) {
    window.location.href = "/login/";
  }
  await loadData();
}

let input,
filter,
table,
tr,
firstName,
lastName,
i,
firstNameTextValue,
lastNameTextValue;
input = document.getElementById("student-name");
table = document.getElementById("table-student-entries");
tr = table.getElementsByTagName("tr");
// console.log(tr);

function nameSearch() {
  filter = input.value.toUpperCase();
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    firstName = tr[i].getElementsByTagName("td")[0];
    lastName = tr[i].getElementsByTagName("td")[1];
    if (firstName) {
      const firstNameElement = firstName.children[0];
      firstNameTextValue = firstNameElement.textContent;
      firstNameTextValue = firstNameTextValue.toUpperCase();
      // console.log(firstNameTextValue, filter);

      const lastNameElement = lastName.children[0];
      lastNameTextValue = lastNameElement.textContent;
      lastNameTextValue = lastNameTextValue.toUpperCase();
      console.log(lastNameTextValue, filter);

      const hasFirstName = firstNameTextValue.indexOf(filter) > -1;
      const hasLastName = lastNameTextValue.indexOf(filter) > -1;
      if (hasFirstName || hasLastName) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
input.addEventListener("keyup", nameSearch);

const filterDropdownCheckboxes = document.querySelectorAll(
  '#filterDropdown input[type="checkbox"]'
);
const filterDropdown2Checkboxes = document.querySelectorAll(
  '#filterDropdown2 input[type="checkbox"]'
);

const filterDropdown3Checkboxes = document.querySelectorAll(
  '#filterDropdown3 input[type="checkbox"]'
);

const filterDropdown4Radios = document.querySelectorAll(
  '#filterDropdown4 input[type="radio"]'
);

function getCheckedValues(checkboxes) {
  const checkedValues = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedValues.push(checkbox.value);
    }
  });
  return checkedValues;
}

// Event listener for filterDropdown checkboxes
filterDropdownCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      counselorFilters.push(checkbox.id);
    } else {
      const index = counselorFilters.indexOf(checkbox.id);
      if (index !== -1) {
        counselorFilters.splice(index, 1);
      }
    }
  });
});

// Event listener for filterDropdown2 checkboxes
filterDropdown2Checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      reasonFilters.push(checkbox.value);
    } else {
      console.log(reasonFilters);
      let index = reasonFilters.indexOf(checkbox.value.toLowerCase());
      if (index > -1) {
        reasonFilters.splice(index, 1);
      }
    }
    // You can use counselorFilters for further processing
  });
});

// Event listener for filterDropdown3 checkboxes
filterDropdown3Checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      gradeFilters.push(checkbox.id);
    } else {
      const index = gradeFilters.indexOf(checkbox.id);
      if (index !== -1) {
        gradeFilters.splice(index, 1);
      }
    }
  });
});

filterDropdown4Radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      dateFilters = radio.id;
    } else {
      const index = dateFilters.indexOf(radio.id);
      if (index !== -1) {
        gradeFilters.splice(index, 1);
      }
    }
  });
});

let counselorFilters = [];
let gradeFilters = [];
let dateFilters = "";
let reasonFilters = [];
// Function to apply filters
async function applyFilters() {
  const entries = document.querySelectorAll(".student-entry");
  // parse through all of the checkboxes and see which ones are checked
  // if they are checked, then add them to an array of filter strings
  // parse through all of the data and see if the specified column value is contained in the filter array

  // Get checked values from filterDropdown checkboxes
  console.log(counselorFilters);
  console.log(gradeFilters);
  console.log(dateFilters);
  console.log(reasonFilters);
  for (i = 0; i < reasonFilters.length; i++) {
    reasonFilters[i] = reasonFilters[i].toLowerCase();
    console.log(reasonFilters[i]);
  }
  // Check the table with the filters

  for (i = 1; i < tr.length; i++) {
    // Get all the sorting-necessary values of the table row
    let counselorColumn = tr[i]
      .getElementsByTagName("td")[2]
      .textContent.toLowerCase();
    // console.log(counselorColumn);
    let gradeColumn = tr[i]
      .getElementsByTagName("td")[3]
      .textContent.toLowerCase();
    let dateColumn = parseInt(tr[i].getElementsByTagName("td")[4].id);
    let reasonColumn = tr[i]
      .getElementsByTagName("td")[5]
      .textContent.toLowerCase();

    // Check what date the table value must be ahead of
    let afterThisDate = 0;
    switch (dateFilters) {
      case "alltime":
        afterThisDate = 0;
        break;
      case "year":
        afterThisDate = startOfDay(Date.now()) - 86400 * 365;
        break;
      case "month":
        afterThisDate = startOfDay(Date.now()) - 86400 * 30;
        break;
      case "week":
        afterThisDate = startOfDay(Date.now()) - 86400 * 7;
        break;
      case "day":
        break;
      default:
        break;
    }
    afterThisDate = startOfDay(afterThisDate);
    // console.log(afterThisDate, dateColumn);

    // console.log(tr[i]);
    // check if the table row matches the filters
    const counselorMatch =
      counselorFilters.includes(counselorColumn) ||
      counselorFilters.length == 0; // the value is filtered yes
    const gradeMatch =
      gradeFilters.includes(gradeColumn) || gradeFilters.length == 0;
    const dateMatch = dateColumn <= afterThisDate || dateFilters == "";
    const reasonMatch =
      reasonFilters.includes(reasonColumn) || reasonFilters.length == 0;

    console.log(counselorMatch, gradeMatch, dateMatch, reasonMatch);
    if (counselorMatch && gradeMatch && dateMatch) {
      tr[i].style.display = "";
      if (reasonMatch) {
        tr[i].style.display = "";
        console.log("match");
      } else {
        tr[i].style.display = "none";
        console.log("reason doesn't match", reasonFilters, reasonColumn);
      }
    } else {
      tr[i].style.display = "none";
    }
  }
}

function sortByDate(descending = true) {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table-student-entries");
  switching = true;
  
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 2; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = parseInt(rows[i].getElementsByTagName("td")[4].id);
      y = parseInt(rows[i + 1].getElementsByTagName("td")[4].id);
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

document.querySelector('.redirect-btn').onclick = (e) => {
  meetingId = e.id
}

document.getElementById("filterButton").addEventListener("click", applyFilters);