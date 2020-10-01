const clock = document.getElementById('clock');
const clockHours = document.getElementById('clock-hours');
const hoursHand = document.querySelector('.hours-hand');
const minutesHand = document.querySelector('.minutes-hand');
const secondsHand = document.querySelector('.seconds-hand');
const digitalHours = document.getElementById('digital-hours');
const digitalMinutes = document.getElementById('digital-minutes');
const digitalSeconds = document.getElementById('digital-seconds');
const dayName = document.getElementById('day-name');
const dayNumber = document.getElementById('date-number');
const daysNameArray = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
const darkModeToggler = document.getElementById('darkMode');

setClock();
darkModeToggler.addEventListener('change', toggleDarkMode);

// FUNCTION TO CREATE CLOCK ELEMENTS
(function createClockElements() {
	for (let indexOfHours = 0; indexOfHours < 12; indexOfHours++) {
		createHours(indexOfHours);
	}
	const hours = document.querySelectorAll('.number');
	// FUNCTION TO CREATE 60 ELEMENTS ( SECONDS )
	hours.forEach(function(hour) {
		for (let i = 0; i < 5; i++) {
			createSeconds(i, hour);
		}
		const smallSeconds = document.querySelectorAll('.number-small');
		secondsRotation(smallSeconds);
	});
})();

setInterval(setClock, 1000);
// FUNCTION TO SET THE TIME AND MOVE THE CLOCK HANDS, EVERY SECOND
function setClock() {
	const currentDate = new Date();

	const secondsRatio = currentDate.getUTCSeconds() / 60;
	const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
	const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

	rotationRatio(secondsHand, secondsRatio);
	rotationRatio(minutesHand, minutesRatio);
	rotationRatio(hoursHand, hoursRatio);

	digitalHours.textContent = currentDate.getHours();
	digitalMinutes.textContent = currentDate.getMinutes();
	digitalSeconds.textContent = currentDate.getSeconds();

	dayName.textContent = daysNameArray[currentDate.getDay()];
	dayNumber.textContent = currentDate.getDate();
}

// FUNCTION TO ROTATE THE CLOCK HANDS
function rotationRatio(element, rotationRatio) {
	element.style.setProperty('--rotation', rotationRatio * 360);
}

// FUNCTION TO CREATE 12 ELEMENTS ( HOURS )
function createHours(indexOfHours) {
	const hour = document.createElement('li');
	hour.classList.add('number', `number${indexOfHours + 1}`);
	const line = document.createElement('div');
	line.classList.add('line');
	hour.appendChild(line);
	hour.style.setProperty('--rotation', indexOfHours * 30);

	clockHours.appendChild(hour);
}

// FUNCTION TO CREATE 5 ELEMENTS ( SECONDS ) FOR EACH MINUTE
function createSeconds(index, targetElement) {
	const second = document.createElement('li');
	second.classList.add('number-small');
	const smallLine = document.createElement('div');
	smallLine.classList.add('small-line');
	second.appendChild(smallLine);

	clockHours.insertBefore(second, targetElement);
}

// FUNCTION TO ROTATE EACH SECOND BY 6DEG
function secondsRotation(smallSeconds) {
	for (let indexOfSeconds = 0; indexOfSeconds < smallSeconds.length; indexOfSeconds++) {
		smallSeconds[indexOfSeconds].style.setProperty('--rotation', indexOfSeconds * 6);
	}
}

function toggleDarkMode() {
	document.body.classList.toggle('dark');
	clock.classList.toggle('dark-mode');
}
