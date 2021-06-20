const words = Object.keys(localStorage);
const wordsObject = Object.assign({}, localStorage);
const wordSlot = document.querySelector(".word");
const definitionSlot = document.querySelector(".definition");

wordSlot.textContent = words[0];
definitionSlot.textContent = localStorage.getItem(words[0]);
let counter = 0;

const flipButton = document.querySelector(".flip");
flipButton.addEventListener("click", flip);

function flip() {
	wordSlot.classList.toggle("word-hidden");
	definitionSlot.classList.toggle("definition-show");
}

const prevButton = document.querySelector(".prev");
prevButton.addEventListener("click", goBack);

function goBack() {
	if (counter === 0) return;

	const star = document.querySelector(".star");
	const img = star.firstElementChild;
	if (!star.classList.contains("starred")) {
		star.classList.add("starred");
		words.splice(counter, 1);
		img.src = "./star_filled_purple.svg";
		img.alt = "unstar this word";
	}
	counter--;
	wordSlot.textContent = words[counter];
	definitionSlot.textContent = localStorage.getItem(words[counter]);
}

const nextButton = document.querySelector(".next");
nextButton.addEventListener("click", goForward);

function goForward() {
	if (counter === localStorage.length - 1 || !localStorage.length) return;

	const star = document.querySelector(".star");
	const img = star.firstElementChild;
	if (!star.classList.contains("starred")) {
		star.classList.add("starred");
		words.splice(counter, 1);
		counter--;
		img.src = "./star_filled_purple.svg";
		img.alt = "unstar this word";
	}
	counter++;
	wordSlot.textContent = words[counter];
	definitionSlot.textContent = localStorage.getItem(words[counter]);
}

const starButton = document.querySelector(".star");
starButton.addEventListener("click", toggleStar);

function toggleStar(e) {
	const star = e.currentTarget;
	const img = star.firstElementChild;
	const word = words[counter];
	const definition = wordsObject[word];
	star.classList.toggle("starred");

	if (star.classList.contains("starred")) {
		img.src = "./star_filled_purple.svg";
		localStorage.setItem(word, definition);
		img.alt = "unstar this word";
	} else {
		img.src = "./star_border_purple.svg";
		localStorage.removeItem(word);
		img.alt = "star this word";
	}
}
