import { collection } from 'firebase/firestore'

// Frontend

const counselorFilterDropdownButton = document.getElementById('filterDropdownButton')
const counselorFilterDropdown = document.getElementById('filterDropdown')
counselorFilterDropdownButton.addEventListener('click', () => {
  counselorFilterDropdown.classList.toggle('hidden')
})
const reasonFilterDropdownButton = document.getElementById('filterDropdownButton2')
const reasonFilterDropdown = document.getElementById('filterDropdown2')
reasonFilterDropdownButton.addEventListener('click', () => {
  reasonFilterDropdown.classList.toggle('hidden')
})
const gradeFilterDropdownButton = document.getElementById('filterDropdownButton3')
const gradeFilterDropdown = document.getElementById('filterDropdown3')
gradeFilterDropdownButton.addEventListener('click', () => {
  gradeFilterDropdown.classList.toggle('hidden')
})

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
    }
]

window.onload =  function() {

  let template = document.getElementById('student-entry') 
  testData.forEach((person) => {
    // console.log(person)
    const clone = template.content.cloneNode(true);
    const elements = clone.childNodes[1].children
    // console.log(elements)
    elements[0].innerHTML = `<a href="https://mail.google.com/mail/?view=cm&to=${person.email}" class="group-hover:underline" target="_blank">${person.firstName}</a>`;
    elements[1].innerHTML = `<a href="https://mail.google.com/mail/?view=cm&to=${person.email}" class="group-hover:underline" target="_blank">${person.lastName}</a>`;    
    elements[2].innerHTML = person.counselor
    elements[3].innerHTML = person.grade
    elements[4].innerHTML = person.reason
    // elements[5].innerHTML = person.email
  })
}


// Backend



// Highcharts.chart('container', {
//   chart: {
//     type: 'line'
//   },
//   title: {
//     text: 'Student-Counselor Meetings'
//   },
//   xAxis: {
//     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//   },
//   yAxis: {
//     title: {
//       text: 'Number of Meetings'
//     }
//   },
//   plotOptions: {
//     line: {
//       color: '#0070c0' // Blue color
//     }
//   },
//   series: [{
//     name: 'Meetings',
//     data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65]
//   }]
// });

// window.onload() = async function() {
//   let q = query(collection(db, 'checkin'), where('date', '<=', date.now()-(1000*86400*365)))
//   let querySnapshot = await getDocs(q)
//   document.getElementById('yearly-meetings').innerText = querySnapshot.length;
//   q = query(collection(db, 'checkin'), where('date', '<=', date.now()-(1000*86400*30)))
//   querySnapshot = await getDocs(q)
//   document.getElementById('monthly-meetings').innerText = querySnapshot.length;
//   q = query(collection(db, 'checkin'), where('date', '<=', date.now()-(1000*86400*7)))
//   querySnapshot = await getDocs(q)
//   document.getElementById('weekly-meetings').innerText = querySnapshot.length;
// }


            