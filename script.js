// Write your JavaScript code here!
/*
Here are a list of questions for a TF:
should the missionTarget div get filled out with the JSON data when the page loads,
or when the form is submitted? should it just remain empty until the user hits the
submit button?
*/
function isAlpha(str) {
   for (let i = 0; i < str.length; i++) {
      // found this neat trick online, wish I could take credit for it
      if (str[i].toLowerCase() == str[i].toUpperCase()) {
         return false;
      }
   }
   return true;
}

// Gave event argument a name, even if I may not use it. Is this a good practice?
window.addEventListener('load', function (event) { 
   const launchForm = document.getElementById('launchForm');
   launchForm.addEventListener('submit', function (event) {
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
      }
      if (!isAlpha(pilotName.value)) {
         alert('Pilot name must only contain letters in the alphabet.')
      }
      if (!isAlpha(copilotName.value)) {
         alert('Copilot name must only contain letters in the alphabet.')
      }
      if (isNaN(fuelLevel.value)) {
         alert('Fuel level must be a number.');
      }
      if (isNaN(cargoMass.value)) {
         alert('Cargo mass must be a number.');
      }
      event.preventDefault();
   });
});
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
