function getQueryVariable(variable)
{
    return new URLSearchParams(window.location.search).get(variable); 
}

function setQueryVariable(variable, value) {
    new URLSearchParams(window.location.search).set(variable, value);
}

function formatDate(date) {
    return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
}
function formatTime(date) {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export { getQueryVariable, setQueryVariable, formatDate, formatTime };