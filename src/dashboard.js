import { formatDate, formatTime } from "./util.js";
import { app, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const testData = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@gmail.com",
    reason: "I want to know more about your products",
    grade: "9",
    counselor: "stratton",
    date: Date.now(),
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jdoe@email.com",
    reason: "I want to know more about your products",
    grade: "9",
    counselor: "wallin",
    date: Date.now(),
  },
];

delBtn = document.getElementById('deleteButton')
if (delBtn != null) {
}


function verifyDoc(doc) {
  isExisting = document.getElementById(doc.id);
  if (isExisting == null) {
    throw new Error("Document does not exist.");
  }
}

// onload
window.onload = async function () {
  let template = document.getElementById("person-card");
  let q = query(collection(db, "checkin"), where("active", "==", true));
  let querySnapshot = await getDocs(q);
  console.log(querySnapshot);

  querySnapshot.forEach((doc) => {
    console.log(doc.data())
    try {
      verifyDoc(doc);
      if (Date.now() - doc.data().date == 1800000) {
        docSnap.active = false;
      }
    } catch {
      const clone = template.content.cloneNode(true);
      const cloneDOM = clone.querySelector(".person-card");
      cloneDOM.id = doc.id;
      console.log(cloneDOM);
      cloneDOM.querySelector("#person-name").textContent =
        doc.data().firstName + " " + doc.data().lastName;
      cloneDOM.querySelector("#checkin-time").textContent = formatTime(
        doc.data().date
      );
      console.log(cloneDOM);
      const containers = document.querySelectorAll(".col-span-1.flex.flex-col");
      containers.forEach((container) => {
        if (container.id !== doc.data().counselor) return;
        console.log(container.lastElementChild);
        container.insertBefore(cloneDOM, container.lastElementChild);
      });
    }
  });
};
