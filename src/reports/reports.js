
// Frontend

const filterDropdownButton = document.getElementById('filterDropdownButton')
const filterDropdown = document.getElementById('filterDropdown')
filterDropdownButton.addEventListener('click', () => {
  filterDropdown.classList.toggle('hidden')
})

// import { collection } from 'firebase/firestore'


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
//   let q = query(collection(db, 'checkin'), where('date', '<=', date.now()-(1000*86400*30)))
//   let querySnapshot = await getDocs(q)
//   document.getElementById('monthly-meetings').innerText = querySnapshot.length;
//   let q = query(collection(db, 'checkin'), where('date', '<=', date.now()-(1000*86400*7)))
//   let querySnapshot = await getDocs(q)
//   document.getElementById('weekly-meetings').innerText = querySnapshot.length;
// }


            