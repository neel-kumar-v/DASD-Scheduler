import {
    query,
    where,
    collection,
    getDoc,
    doc,
    getCountFromServer,
  } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app, db } from "../firebase.js";
import { formatTime, formatDate, capitalizeFirstLetter } from "../util.js";
import $ from 'jquery'
import { meetingId } from '../reports/reports.js'

const params = new URLSearchParams(document.location.search);
meetingId = params.get("id")
const meeting = await getDoc(doc(db, 'checkin', meetingId))
console.log(meeting.data())

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
    $('message').val(notes)
  }
})

function generateQueryParams() {
  let link = '/form/';
  // get all firebase information
}

$('save-notes').on('click', async () => {
  console.log($('#message').val())
  await setDoc(doc(db, 'checkin', id), {
    notes: $('#message').val()
  })

  location.reload()
})