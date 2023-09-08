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
    const dateTime = new Date(date)
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();

    // Ensure single-digit values are padded with a leading zero
    let formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    let meridian = '';

    if(hours > 12) {
        formattedHours = hours - 12;
        meridian = 'PM';
    } else {
        meridian = 'AM';
    }

    return `${formattedHours}:${formattedMinutes} ${meridian}`;
}


export { getQueryVariable, setQueryVariable, formatDate, formatTime };