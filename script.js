window.addEventListener('load', function () {
   // on page load, get planetary json array, randomly select and display a destination
   const planetsURL = 'https://handlers.education.launchcode.org/static/planets.json';
   fetch(planetsURL).then(function (response) {
      response.json().then(function (json) {
         const planet = Math.floor(Math.random() * json.length); // randomly selected planet
         document.getElementById('missionTarget').innerHTML = `
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

   // destination is set. next, get/validate input from user
   document.getElementById('launchForm').addEventListener('submit', function (event) {
      // prevent form send/page refresh
      event.preventDefault();
      // isNotAlpha will check pilot/copilot name for non-letter characters
      function isNotAlpha(string) {
         for (character of string) {
            if (character.toLowerCase() === character.toUpperCase()) {
               // eg: '%'.toLowerCase and '%'.toUpperCase both return '%'
               return true;
            }
         }
         return false;
      }
      const pilotName = document.querySelector('input[name=pilotName]');
      const copilotName = document.querySelector('input[name=copilotName]');
      const fuelLevel = document.querySelector('input[name=fuelLevel]');
      const cargoMass = document.querySelector('input[name=cargoMass]');
      if ( // check for empty fields
         !pilotName.value ||
         !copilotName.value ||
         !fuelLevel.value ||
         !cargoMass.value
      ) {
         alert('All fields must have an entry.');
      } else if (isNotAlpha(pilotName.value)) { // check text input for non-letters
         alert('Pilot name must only contain letters in the alphabet.');
      } else if (isNotAlpha(copilotName.value)) {
         alert('Copilot name must only contain letters in the alphabet.');
      } else if (isNaN(fuelLevel.value)) { // check number input for non-numbers
         alert('Fuel level must be a number.');
      } else if (isNaN(cargoMass.value)) {
         alert('Cargo mass must be a number.');
      } else {
         // names are all text, cargoMass/fuelLevel are numbers
         document.getElementById('pilotStatus').innerHTML = `
            Pilot ${pilotName.value} is ready for launch
         `;
         document.getElementById('copilotStatus').innerHTML = `
            Co-pilot ${copilotName.value} is ready for launch
         `;
         // next, check if ready for launch
         const faultyItems = document.getElementById('faultyItems');
         const launchStatus = document.getElementById('launchStatus');
         if (fuelLevel.value < 10000) {
            faultyItems.style.visibility = 'visible';
            document.getElementById('fuelStatus').innerHTML = 'Fuel level too low for launch';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'red';
         } else if (cargoMass.value > 10000) {
            faultyItems.style.visibility = 'visible';
            document.getElementById('cargoStatus').innerHTML = 'Cargo mass too high for launch';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'red';
         } else { // fuel level is high enough, cargo level low enough. let's go!
            launchStatus.innerHTML = 'Shuttle is ready for launch';
            launchStatus.style.color = 'green';
            // making faultyItems hidden again in case user fixed their bad input
            faultyItems.style.visibility = 'hidden';
         }
      }
   });
});