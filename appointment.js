function getURLParts(url) {
  const parts = url.split('/');
  return parts;
}

const urlParts = getURLParts(window.location.href);
const reservationId = urlParts[urlParts.length - 1].substring(1);

const url = `https://hamakiserver.fly.dev/api/v1/reservation/${reservationId}`;

console.log('hamaki url', url);