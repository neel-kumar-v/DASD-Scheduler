import {
    query,
    where,
    collection,
    getDoc,
    doc,
    getCountFromServer,
  } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app, db } from "..firebase.js";
import { formatTime, formatDate, capitalizeFirstLetter } from "../util.js";
import { meetingId } from '../reports/reports.js'
import $ from 'jquery'
const urlParams = new URLSearchParams(window.location.search);


$(window).on("load", () => {
  urlParams.set("id", meetingId)
  const docSnap = getDoc(doc(db, 'checkin', urlParams.get('id')))
  const notes = docSnap.data().notes
  if (notes != ""){
    $('message').val(notes)
  }
})

function generateQueryParams() {
  let link = '/form/';
  // get all firebase information
}

$('save-notes').on('click', async () => {
  await setDoc(doc(db, 'checkin', urlParams.get('id')), {
    notes: $('message').val()
  })

  location.reload();
})