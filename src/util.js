function getQueryVariable(variable) {
  return new URLSearchParams(window.location.search).get(variable);
}

function setQueryVariable(variable, value) {
  new URLSearchParams(window.location.search).set(variable, value);
}

function formatDate(date) {
  // console.log(date)
  const dateTime = new Date(date);
  let day = dateTime.getDate().toString();
  if (day.length == 1) {
    day = `0${day}`;
  }
  let month = (dateTime.getMonth() + 1).toString();
  if (month.length == 1) {
    month = `0${month}`;
  }
  let year = dateTime.getFullYear().toString().slice(2);
  return `${month}/${day}/${year}`;
}
function formatTime(date) {
  const dateTime = new Date(date);
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();

  // Ensure single-digit values are padded with a leading zero
  let formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  let meridian = "";

  if (hours > 12) {
    formattedHours = hours - 12;
    meridian = "PM";
  } else {
    meridian = "AM";
  }

  formattedHours = formattedHours == 0 ? 12 : formattedHours;

  return `${formattedHours}:${formattedMinutes} ${meridian}`;
}
function formatDateTime(date, comma=false) {
  // return it in the format Month, Day, at Hour:Minute AM/PM
  const dateTime = new Date(date);
  const month = dateTime.toLocaleString("default", { month: "long" });
  const day = dateTime.getDate();
  const time = formatTime(date);
  return `${month}${comma ? ',' : ''} ${day} at ${time}`;
}

function formatDateToPlaceholder(date) {
  // console.log(date.seconds)
  const dateTime = new Date(date.seconds * 1000);

  const year = dateTime.getUTCFullYear();
  const month = String(dateTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getUTCDate()).padStart(2, "0");
  const hours = String(dateTime.getUTCHours()).padStart(2, "0");
  const minutes = String(dateTime.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}


function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export {
  getQueryVariable,
  setQueryVariable,
  formatDate,
  formatTime,
  capitalizeFirstLetter,
  formatDateTime,
  formatDateToPlaceholder
};
