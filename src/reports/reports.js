import { collection } from 'firebase/firestore'


Highcharts.chart('container', {
  chart: {
    type: 'line'
  },
  title: {
    text: 'Student-Counselor Meetings'
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    title: {
      text: 'Number of Meetings'
    }
  },
  plotOptions: {
    line: {
      color: '#0070c0' // Blue color
    }
  },
  series: [{
    name: 'Meetings',
    data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65]
  }]
});

let q = query(collection(db, 'checkin'), where('date', '<=', date.now()-(1000*86400*365)))
let querySnapshot = await getDocs(q)

document.getElementById('yearly-meetings')