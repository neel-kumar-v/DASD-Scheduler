import { getQueryVariable, setQueryVariable } from "../../util";

let counselor;
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
    counselor: "McGavin-Wiedlich",
    date: Date.now(),
}
function handleSubmit() {
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
    }

}

