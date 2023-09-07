import { formatDate, formatTime } from '../util.js';
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

// onload
window.onload = function() {
    let template = document.getElementById('person-card')
    testData.forEach((person) => {
        console.log(person)
        const clone = template.content.cloneNode(true);
        clone.querySelector('#person-name').textContent = "**** *****";
        clone.querySelector('#checkin-time').textContent = formatTime(person.date);
        const containers = document.querySelectorAll('.col-span-1.flex.flex-col');
        containers.forEach((container) => {
            if (container.id !== person.counselor) return
            console.log(clone)
            container.insertBefore(clone, container.lastChild)
            
        })
    })
}