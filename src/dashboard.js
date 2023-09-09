import { formatDate, formatTime } from './util.js';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'

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

delCard = async (item) => {
    const delDoc = doc(db, checkin, item.id)
    delDoc.active = false
}

// onload
window.onload = async function() {
    let template = document.getElementById('person-card')
    testData.forEach((person) => {
        console.log(person)
        const clone = template.content.cloneNode(true);
        clone.querySelector('#person-name').textContent = person.firstName + " " + person.lastName;
        clone.querySelector('#checkin-time').textContent = formatTime(person.date);
        const containers = document.querySelectorAll('.col-span-1.flex.flex-col');
        containers.forEach((container) => {
            if (container.id !== person.counselor) return
            console.log(container.lastElementChild)
            container.insertBefore(clone, container.lastElementChild)
        })
    })

    let q = query(collection(db, 'checkin'), where('capital', '==', true))

    let querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
        try {
            document.getElementById(doc.id)
            if ((Date.now() - doc.date) == 1800000) {
                doc.active = false
            }
        } catch {
            const clone = template.content.cloneNode(true);
            clone.id = doc.id
            clone.querySelector('#person-name').textContent = doc.firstName + " " + doc.lastName;
            clone.querySelector('#checkin-time').textContent = formatTime(doc.date);
            const containers = document.querySelectorAll('.col-span-1.flex.flex-col');
            containers.forEach((container) => {
                if (container.id !== doc.counselor) return
                console.log(container.lastElementChild)
                container.insertBefore(clone, container.lastElementChild)
            })
        }
    })

}