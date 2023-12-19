import {
    query,
    where,
    collection,
    getDoc,
    setDoc,
    doc,
    getCountFromServer,
  } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app, db } from "../firebase.js";
import { formatTime, formatDate, capitalizeFirstLetter } from "../util.js";
import $ from 'jquery'

const params = new URLSearchParams(document.location.search);
const meetingId = params.get("id")
const meetingRef = doc(db, 'checkin', meetingId)


document.addEventListener("DOMContentLoaded", async () => {
  const meeting = await getDoc(meetingRef)
  try {
    params.get("id")
  } catch {
    location += `?id=${meetingId}`
  }

  document.getElementById("name").innerHTML = meeting.data().firstName + " " + meeting.data().lastName;
  document.getElementById("grade").innerHTML = `Grade ${meeting.data().grade}`
  document.getElementById("counselor").innerHTML = capitalizeFirstLetter(meeting.data().counselor)
  document.getElementById("reason").innerHTML = meeting.data().reason
  document.getElementById("date").innerHTML = formatDate(meeting.data().date)
  document.getElementById("email").innerHTML = meeting.data().email

  let scheduleButton = document.getElementById("schedule-meeting");
  scheduleButton.href += `grade=${meeting.data().grade}&counselor=${meeting.data().counselor}&firstName=${meeting.data().firstName}&lastName=${meeting.data().lastName}&email=${meeting.data().email}`

  const notes = meeting.data().notes
  const notesElement = document.getElementById('message')
  // console.log(notesElement)
  if (notes != ""){
    notesElement.textContent = notes
  }
  let saveButton = document.getElementById("save-notes");
  // console.log(saveButton)
  saveButton.disabled = true
  notesElement.addEventListener('input', () => {
    saveButton.disabled = false
  })
})

function generateQueryParams() {
  let link = '/form/';
  // get all firebase information
}
$('#save-notes').on('click', async () => {
  const docRef = doc(db, 'checkin', meetingId)
  const docSnap = await getDoc(docRef)

  await setDoc(docRef, {
    notes: $('#message').val(),
    active: docSnap.data().active,
    counselor: docSnap.data().counselor,
    date: docSnap.data().date,
    date_end: docSnap.data().date_end,
    firstName: docSnap.data().firstName,
    lastName: docSnap.data().lastName,
    grade: docSnap.data().grade,
    email: docSnap.data().email,
    reason: docSnap.data().reason
  })

  window.location.href = '../reports/'

})

