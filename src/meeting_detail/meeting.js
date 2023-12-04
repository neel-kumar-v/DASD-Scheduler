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
const meeting = await getDoc(meetingRef)
console.log(meeting)

$(() => {
  try {
    params.get("id")
  } catch {
    location += `?id=${meetingId}`
  }

  $('#name').html(meeting.data().firstName + " " + meeting.data().lastName)
  $("#grade").html(`Grade ${meeting.data().grade}`)
  $("#counselor").html(capitalizeFirstLetter(meeting.data().counselor))
  $("#reason").html(meeting.data().reason)
  $("#date").html(formatDate(meeting.data().date))
  $("#email").html(meeting.data().email)

  const notes = meeting.data().notes
  if (notes != ""){
    $('message').val() = notes
  }
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