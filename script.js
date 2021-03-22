// Write your JavaScript code here!

function isNotAlpha(str) {
   for (let i = 0; i < str.length; i++) {
      // found this neat trick online, wish I could take credit for it
      if (str[i].toLowerCase() == str[i].toUpperCase()) {
         return true;
      }
   }
   return false;
}

// Gave event argument a name, even if I may not use it. Is this a good practice?
window.addEventListener('load', function (event) {
   let url = 'https://handlers.education.launchcode.org/static/planets.json';
   fetch(url).then(function (response) {
      response.json().then(function (json) {
         let missionTarget = document.getElementById('missionTarget');
         let planet = Math.floor(Math.random() * json.length);
         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[planet].name}</li>
            <li>Diameter: ${json[planet].diameter}</li>
            <li>Star: ${json[planet].star}</li>
            <li>Distance from Earth: ${json[planet].distance}</li>
            <li>Number of Moons: ${json[planet].moons}</li>
         </ol>
         <img src="${json[planet].image}">
         `;
      });
   });
   let launchForm = document.getElementById('launchForm');
   launchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      let pilotName = document.querySelector('input[name=pilotName]');
      let copilotName = document.querySelector('input[name=copilotName]');
      let fuelLevel = document.querySelector('input[name=fuelLevel]');
      let cargoMass = document.querySelector('input[name=cargoMass]');
      if (
         !pilotName.value ||
         !copilotName.value ||
         !fuelLevel.value ||
         !cargoMass.value
         ) {
         alert('All fields must have an entry.');
      } else if (isNotAlpha(pilotName.value)) {
         alert('Pilot name must only contain letters in the alphabet.');
      } else if (isNotAlpha(copilotName.value)) {
         alert('Copilot name must only contain letters in the alphabet.');
      } else if (isNaN(fuelLevel.value)) {
         alert('Fuel level must be a number.');
      } else if (isNaN(cargoMass.value)) {
         alert('Cargo mass must be a number.');
      } else {
         // user supplied text for both names and numbers for fuel level
         // and cargo mass. next, check if ready for launch
         let faultyItems = document.getElementById('faultyItems');
         let pilotStatus = document.getElementById('pilotStatus');
         let copilotStatus = document.getElementById('copilotStatus');
         let launchStatus = document.getElementById('launchStatus');
         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
         if (fuelLevel.value < 10000) {
            faultyItems.style.visibility = 'visible';
            let fuelStatus = document.getElementById('fuelStatus');
            fuelStatus.innerHTML = 'Fuel level too low for launch';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'red';
         } else if (cargoMass.value > 10000) {
            faultyItems.style.visibility = 'visible';
            let cargoStatus = document.getElementById('cargoStatus');
            cargoStatus.innerHTML = 'Cargo mass too high for launch';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'red';
         } else {
            launchStatus.innerHTML = 'Shuttle is ready for launch';
            launchStatus.style.color = 'green';
         }
      }
   });
});