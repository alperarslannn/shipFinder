let move = 20;
let score = 0;
let localStorageMax = 'maxScore';
let highestScore;
highestScore =
	localStorage.getItem(localStorageMax) == null
		? 0
		: localStorage.getItem(localStorageMax);
cards = document.getElementsByClassName('grid_member');

for (let i = 0; i < cards.length; i++) {
	cards[i].addEventListener('click', moveAndPointCount);
	cards[i].value = i + 1;
}

cardRows = document.getElementsByClassName('row');
//console.log(cardRows);
//console.log(cardRows[0].children[5].value);

let k = 0;
let shipsArray = [];
for (let i = 0; i < cardRows.length; i++) {
	var shipPicker1 = Math.floor(Math.random() * 6 + 1 + k);
	do {
		var shipPicker2 = Math.floor(Math.random() * 6 + 1 + k);
	} while (shipPicker1 == shipPicker2);
	// Sahip olan kartlara atama
	for (let j = 0; j < cardRows.length; j++) {
		if (cardRows[i].children[j].value == shipPicker2) {
			cardRows[i].children[j].innerHTML = shipPicker2;
			shipsArray.push(shipPicker2);
		}
		if (cardRows[i].children[j].value == shipPicker1) {
			cardRows[i].children[j].innerHTML = shipPicker1;
			shipsArray.push(shipPicker1);
		}
	}
	k = k + 6;
}

function removeStart() {
	document.getElementsByClassName('start-game')[0].style.display = 'none';
}

function restartGame() {
	location.reload();
}

function moveAndPointCount(event) {
	let maxScore = 0;
	this.disabled = true;
	this.style.backgroundColor = '#554053';
	let clickValue = event.target.value;
	move--;
	scorePoints(clickValue);
	document.getElementsByClassName('move-counter')[0].innerHTML =
		'Move Left: ' + move;
	if (move === 0) {
		document.getElementsByClassName('restart-game')[0].style.opacity = '1';
		document.getElementsByClassName('restart-game')[0].style.visibility =
			'visible';
		document.getElementsByClassName('game-head')[0].innerHTML =
			'Ship Finder Game!';
		document.getElementsByClassName('move-counter')[0].innerHTML =
			'Move Left';
		// Storing max score in local storage

		highestScore = Math.max(score, highestScore);
		localStorage.setItem(localStorageMax, highestScore);
		document.getElementById('maxGameScore').innerHTML =
			'Game Max Score: ' + highestScore;
		//console.log(highestScore);
	}
}

function scorePoints(scoreIncreaser) {
	for (const shipPlace of shipsArray) {
		if (scoreIncreaser == shipPlace) {
			score = score + 10;

			document.getElementsByClassName('grid_member')[
				shipPlace - 1
			].style.background =
				'#554053 url(./cruiseshiptransportationlogistictravel_109809.ico) no-repeat center';
			document.getElementsByClassName('grid_member')[
				shipPlace - 1
			].style.backgroundSize = '70px';
			//Remove the found ship from the array
			removeTheElement = shipsArray.indexOf(shipPlace);
			shipsArray.splice(removeTheElement, 1);

			//Show Score on Top
			document.getElementsByClassName('game-head')[0].innerHTML =
				'Success! Score: ' + score;
			break;
		} else {
			document.getElementsByClassName('game-head')[0].innerHTML =
				'Score: ' + score;
		}
	}

	document.getElementById('finalScore').innerHTML = 'Your Score: ' + score;
}
