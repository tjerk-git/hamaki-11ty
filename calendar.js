const API_URL = "https://hamakiserver.fly.dev";
const API_URL_WITH_VERSION = "https://hamakiserver.fly.dev/api/v1";


function getURLParts(url) {
  const parts = url.split('/');
  return parts;
}


// create function that submits a form does a fetch request to https://hamakiserver.fly.dev/api/v1/spots/reserve
// and logs the response


const urlParts = getURLParts(window.location.href);
const calendarId = urlParts[urlParts.length - 1].substring(1);

if (calendarId) {

  // fetch calendar data
  // fetch('https://hamakiserver.fly.dev/calendar/' + calendarId)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });

  const data = {
    "calendar": {
      "name": "Meet with Tjerk",
      "owner": {
        "timezone": "CEST"
      },
      "allowReservationUpUntilMinutesBefore": 60,
      "url": "clumsy-rock-6A6B4",
      "description": "Meet with Tjerk ",
      "spots": []
    },
    "groupedSpots": [
      {
        "day": "2024-09-12T00:00:00Z",
        "spots": [
          {
            "spotId": "726DFEFE-9C11-4B03-94F7-D07DD5027853",
            "startDate": "2024-09-12T12:00:00Z",
            "endDate": "2024-09-12T12:30:00Z",
            "location": "D.2007",
            "isReserved": false
          },
          {
            "spotId": "1E404EA6-6BA2-44BF-BBDE-54A88D173FB3",
            "startDate": "2024-09-12T12:30:00Z",
            "endDate": "2024-09-12T13:00:00Z",
            "location": "D.2007",
            "isReserved": false
          },
          {
            "spotId": "5650E651-959C-4A34-A414-49D8383A3390",
            "startDate": "2024-09-12T13:00:00Z",
            "endDate": "2024-09-12T13:30:00Z",
            "location": "D.2007",
            "isReserved": false
          },
          {
            "spotId": "2A3C44E0-D2DD-4D87-BB7C-44E6DB12C24C",
            "startDate": "2024-09-12T13:30:00Z",
            "endDate": "2024-09-12T14:00:00Z",
            "location": "D.2007",
            "isReserved": false
          },
          {
            "spotId": "E300435A-500C-4BAA-BEDF-A2628DB425DC",
            "startDate": "2024-09-12T14:00:00Z",
            "endDate": "2024-09-12T14:30:00Z",
            "location": "D.2007",
            "isReserved": true
          }
        ]
      },
      {
        "day": "2024-09-13T00:00:00Z",
        "spots": [
          {
            "isReserved": false,
            "spotId": "5CE229B8-E6E9-4753-8D5A-CC1289AAECDE",
            "endDate": "2024-09-13T07:30:00Z",
            "location": "D.2007",
            "startDate": "2024-09-13T07:00:00Z"
          },
          {
            "isReserved": false,
            "spotId": "1CFED766-E491-4BEF-8317-D25C4E44EA21",
            "endDate": "2024-09-13T08:00:00Z",
            "location": "D.2007",
            "startDate": "2024-09-13T07:30:00Z"
          },
          {
            "isReserved": false,
            "spotId": "58EC86C0-59D4-4ABA-9D94-02F2DF5F4408",
            "endDate": "2024-09-13T08:30:00Z",
            "location": "D.2007",
            "startDate": "2024-09-13T08:00:00Z"
          },
          {
            "isReserved": false,
            "spotId": "65AAE4DC-01AB-4162-B95B-21F896EA424B",
            "endDate": "2024-09-13T09:00:00Z",
            "location": "D.2007",
            "startDate": "2024-09-13T08:30:00Z"
          }
        ]
      }
    ]
  };

  const generateSuccesHTML = () => {
    return `<button id="confettiButton">Celebrate!</button>`;
  }

  const generateHTML = (data) => {
    if (data.calendar.owner.timezone === "CEST") {
      data.calendar.owner.timezone = "Europe/Amsterdam";
    }

    return `
    <div class="calendar">
      <h1>${data.calendar.name}</h1>
      All times are shown in the owner's time zone. 
      <p>Your time zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
      <p>Owners Time Zone: ${data.calendar.owner.timezone}</p>
      ${Intl.DateTimeFormat().resolvedOptions().timeZone === data.calendar.owner.timezone ? '✅' : '❌'}

      <p>Description: ${data.calendar.description}</p>

      ${data.groupedSpots.map(group => `
        <div class="day">
          <h2>${new Date(group.day).toLocaleDateString()}</h2>
          <ul>
            ${group.spots.map(spot => `
              <li>
                <strong>Spot ID:</strong> ${spot.spotId} <br>
                <strong>Start Time:</strong> ${new Date(spot.startDate).toLocaleTimeString()} <br>
                <strong>End Time:</strong> ${new Date(spot.endDate).toLocaleTimeString()} <br>
                <strong>Location:</strong> ${spot.location} <br>
                <strong>Status:</strong> ${spot.isReserved ? 'Reserved' : 'Available'}
                ${!spot.isReserved ? `
                  <button onclick="document.getElementById('dialog-${spot.spotId}').showModal()">Reserve Spot</button>
                  <dialog id="dialog-${spot.spotId}">
                    <form method="post" id="form-${spot.spotId}">
                      <h3>Reserve Spot ${spot.spotId}</h3>
                      <label for="name-${spot.spotId}">Name:</label>
                      <input type="text" id="name-${spot.spotId}" name="visitorName" required><br>
                      <label for="email-${spot.spotId}">Email:</label>
                      <input type="email" id="email-${spot.spotId}" name="visitorEmail" required><br>
                      <label for="comment-${spot.spotId}">Comment:</label>
                      <textarea id="comment-${spot.spotId}" name="comment"></textarea><br>
                      <input type="hidden" name="spotId" value="${spot.spotId}">
                      <menu>
                        <button type="submit">Submit</button>
                        <button type="reset" onclick="document.getElementById('dialog-${spot.spotId}').close()">Cancel</button>
                      </menu>
                    </form>
                  </dialog>
                ` : ''}
              </li>
            `).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  `;
  };


  const submitForm = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log('form data', data);

    document.getElementById(`dialog-${data.spotId}`).close();

    // const response = await fetch('https://hamakiserver.fly.dev/api/v1/spots/reserve', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });

    // const responseData = await response.json();
    // console.log('response', responseData);

    if (1 === 1) {
      // replace the inner html of the id spots with a succes message
      document.querySelector("#spots").innerHTML = generateSuccesHTML();

      document.getElementById('confettiButton').addEventListener('click', () => {
        confetti({
          particleCount: 100,
          spread: Math.floor(Math.random() * (360 - 60 + 1)) + 60,
          origin: { x: Math.random(), y: Math.random() }
        });
      });

    } else {
      alert('Reservation failed');
    }
  };

  document.querySelector("#spots").innerHTML = generateHTML(data);


  // add event listeners to all form elements
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', submitForm);
  });

} else {
  throw new Error("Calendar ID not found");
}


