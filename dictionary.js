//Disables transition when the page first loads to prevent modals from flashing.
window.addEventListener("load", () => {
	const body = document.querySelector(".preload");
	body.classList.remove("preload");
});

const wordButtons = document.querySelectorAll(".word-button");
wordButtons.forEach((button) =>
	button.addEventListener("click", openDefinitionModal)
);

function openDefinitionModal(e) {
	const word = e.target.dataset.word;
	const modal = document.querySelector(
		".word-info." + word.split(" ").join("-")
	);
	modal.classList.add("word-info-visible");
}

const exitButtons = document.querySelectorAll(".exit-definition");
exitButtons.forEach((button) => button.addEventListener("click", closeModal));

function closeModal(e) {
	const modal = e.target.parentElement;
	modal.classList.remove("word-info-visible");
}

const submitDefinitionButtons = document.querySelectorAll(".submit-definition");
submitDefinitionButtons.forEach((button) =>
	button.addEventListener("click", handleDefinitionSubmit)
);

function handleDefinitionSubmit(e) {
	e.preventDefault();
	const form = e.target.parentElement;
	const textarea = form.querySelector("textarea");
	const definition = document.createElement("p");
	definition.classList.add("definition");
	definition.textContent = textarea.value;

	const definitions = form.previousElementSibling;
	definitions.append(definition);

	const article = form.parentElement;
	const hidden = article.querySelector(".info-title-hidden");
	if (hidden) hidden.classList.remove("info-title-hidden");
}

const addWordButton = document.querySelector(".add-word");
addWordButton.addEventListener("click", openAddModal);

function openAddModal() {
	const addModal = document.querySelector(".add-form-wrapper");
	addModal.classList.add("add-form-wrapper-visible");
}

const exitAddButton = document.querySelector(".exit-add");
exitAddButton.addEventListener("click", closeAddModal);

function closeAddModal() {
	const addModal = document.querySelector(".add-form-wrapper");
	addModal.classList.remove("add-form-wrapper-visible");
}

const addSubmitButton = document.querySelector(".submit-add");
addSubmitButton.addEventListener("click", addWord);

function addWord(e) {
	e.preventDefault();
	const form = e.target.parentElement;
	const word = form.querySelector("#word").value;
	const context = form.querySelector("#context").value;
	const language = form.querySelector("#language").value;

	const li = document.createElement("li");
	li.classList.add("word");
	const button = document.createElement("button");
	button.classList.add("word-button");
	button.textContent = word;
	button.dataset.word = word;
	li.append(button);

	button.addEventListener("click", openDefinitionModal);

	const dictionary = document.querySelector(".dictionary");
	dictionary.append(li);

	const article = `<article class="word-info ${word}">
  <div class="word-info-bg"></div>
  <div class="word-info-content">
    <h3>${word.split(" ").join("-")}</h3>
    <p class="context">
      <span class="info-title">Context: </span>
      <span class="context-content"
        >${context}</span
      >
    </p>
    <p class="c-language">
      <span class="info-title">Classroom language: </span>English
    </p>
    <p class="p-language">
      <span class="info-title">Preferred language: </span>
      <span class="language-content">${language}</span>
    </p>
    <section class="definitions">
      <p class="info-title info-title-hidden">Definition:</p>
    </section>
    <form class="add-definition">
      <label for="definition"
        ><span class="info-title">Help define this word:</span></label
      >
      <textarea
        name="definition"
        id="definition"
        cols="30"
        rows="3"
      ></textarea>
      <button class="submit-definition" type="submit">Submit</button>
    </form>
    <button type="button" class="star">
      <img
        src="./star_border_white.svg"
        alt="star this word"
      />
    </button>
  </div>
  <button type="button" class="exit-definition">X</button>
</article>
  `;

	const main = document.querySelector(".dictionary-main");
	main.insertAdjacentHTML("beforeend", article);

	const exitButtons = document.querySelectorAll(".exit-definition");
	exitButtons.forEach((button) => button.addEventListener("click", closeModal));

	const submitDefinitionButtons =
		document.querySelectorAll(".submit-definition");
	submitDefinitionButtons.forEach((button) =>
		button.addEventListener("click", handleDefinitionSubmit)
	);

	const stars = document.querySelectorAll(".star");
	stars.forEach((star) => star.addEventListener("click", toggleStar));

	closeAddModal();
}

const stars = document.querySelectorAll(".star");
stars.forEach((star) => {
	star.addEventListener("click", toggleStar);
	const word = star.parentElement.firstElementChild.textContent;
	if (localStorage.getItem(word) !== null) {
		star.firstElementChild.src = "./star_filled_white.svg";
		star.alt = "unstar this word";
		star.classList.add("starred");
	}
});

function toggleStar(e) {
	const star = e.currentTarget;
	const img = star.firstElementChild;
	const word = star.parentElement.firstElementChild.textContent;
	const definitions = star.parentElement.querySelector(".definitions");
	let definition;

	if (definitions.querySelectorAll(".definition").length) {
		definition = Array.from(definitions.querySelectorAll(".definition"))
			.map((node) => node.textContent)
			.join("; ");
	} else {
		definition = "No definition available.";
	}
	star.classList.toggle("starred");

	if (star.classList.contains("starred")) {
		img.src = "./star_filled_white.svg";
		localStorage.setItem(word, definition);
		img.alt = "unstar this word";
	} else {
		img.src = "./star_border_white.svg";
		localStorage.removeItem(word);
		img.alt = "star this word";
	}
}
