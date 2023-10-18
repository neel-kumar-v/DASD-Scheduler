import {
    query,
    where,
    collection,
    getDocs,
    getCountFromServer,
  } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app, db } from "..firebase.js";
import { formatTime, formatDate, capitalizeFirstLetter } from "../util.js";
import { meetingId } from '../reports/reports.js'

function generateQueryParams() {
  let link = '/form/';
  // get all firebase information
}