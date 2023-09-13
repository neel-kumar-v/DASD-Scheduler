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

async function delCard(item) {
  const delDoc = doc(db, checkin, item.id);
  delDoc.active = false;
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
  //   testData.forEach((person) => {
  //     console.log(person);
  //     const clone = template.content.cloneNode(true);
  //     clone.querySelector("#person-name").textContent =
  //       person.firstName + " " + person.lastName;
  //     clone.querySelector("#checkin-time").textContent = formatTime(person.date);
  //     const containers = document.querySelectorAll(".col-span-1.flex.flex-col");
  //     containers.forEach((container) => {
  //       if (container.id !== person.counselor) return;
  //       console.log(container.lastElementChild);
  //       container.insertBefore(clone, container.lastElementChild);
  //     });
  //   });

  let q = query(collection(db, "checkin"), where("active", "==", true));

  let querySnapshot = await getDocs(q);
  console.log(querySnapshot);

  querySnapshot.forEach((docitem) => {
    const docSnap = getDoc(doc(db, "checkin", doc.id));
    console.log(docSnap.firstName);
    getDoc();
    try {
      verifyDoc(docitem);
      if (Date.now() - docitem.date == 1800000) {
        docSnap.active = false;
      }
    } catch {
      const clone = template.content.cloneNode(true);
      const cloneDOM = clone.querySelector(".person-card");
      cloneDOM.id = docitem.id;
      console.log(cloneDOM);
      cloneDOM.querySelector("#person-name").textContent =
        doc.firstName + " " + doc.lastName;
      cloneDOM.querySelector("#checkin-time").textContent = formatTime(
        doc.date
      );
      console.log(cloneDOM);
      const containers = document.querySelectorAll(".col-span-1.flex.flex-col");
      containers.forEach((container) => {
        if (container.id !== doc.counselor) return;
        console.log(container.lastElementChild);
        container.insertBefore(cloneDOM, container.lastElementChild);
      });
    }
  });
};
