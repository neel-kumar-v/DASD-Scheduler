import { getQueryVariable, setQueryVariable } from "../util";
import { addDoc, collection } from 'firebase/firestore'

const db = getFirestore(app);
let counselor;
let docRef;

window.onload = function() {
    console.log("onload function");
    // getQueryVariable('counselor')
    //create a tailwind h1 with the var
    counselor = getQueryVariable('counselor')
    const radio = document.querySelector(`input[type="radio"][name="counselor"][value=${counselor}]`);
    console.log(radio);
    radio.checked = true;

}
const firebaseTemplate = {
    firstName: "Neel",
    lastName: "Kumar",
    email: "24nkumar@student.dasd.org",
    reason: "Scheduled Visit/Meeting",
    grade: "10",
    counselor: "hewitt",
    date: Date.now(),
    active: true
}
async function handleSubmit() {
    //get all the query params
    const date = Date.now()
    // const formattedDate = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
    const firstName = document.querySelector("input[name='firstName']").value;
    const lastName = document.querySelector("input[name='lastName']").value;
    const email = document.querySelector("input[name='email']").value;
    const reason = document.querySelector("select[name='reason']").value;
    const grade = document.querySelector("input[name='grade']:checked").value;
    const counselor = document.querySelector("input[name='counselor']:checked").value;

    const firebaseData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        reason: reason,
        grade: grade,
        counselor: counselor,
        date: date,
        active: true
    }

    try {
        docRef = await addDoc(collection(db, 'checkin'), firebaseData)
    } catch {
        console.error("Document add threw error:", e)
    }


}

