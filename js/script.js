// Tableau des valeurs de chaque lettre
let valueLetters = [['A', 1], ['B', 3], ["C", 3], ["D", 2], ["E", 1], ["F", 4], ["G", 2], ["H", 4], ["I", 1], ["J", 8], ["K", 5], ["L", 1], ["M", 3], ["N", 1], ["O", 1], ["P", 3], ["Q", 10], ["R", 1], ["S", 1], ["T", 1], ["U", 1], ["V", 4], ["W", 4], ["X", 8], ["Y", 4], ["Z", 10]];

// Permet de vérifier la saisie de l'utilisateur
function userInputChecker(userInput) {
	if(! userInput.match(/^([a-zA-Z ]+)$/))
    	return(0);
    else
    	return(1);
}

function wordPointsCalculator(word) {
	let i = 0;
	let total = 0;
	let j;

	while(i < word.length) {
		j = 0;
		while(j < valueLetters.length) {
			if (word[i].toUpperCase() == valueLetters[j][0])
				total += valueLetters[j][1];
			j++;
		}
		i++;
	}
	return(total);
}

// Solution 1, en utilisant la méthode indexOf
	// La méthode indexOf est une méthode de la classe String. 
	// Elle prend comme paramètres une sous-chaîne de caractères 
	// et cherche la position de cette dernière dans la chaîne. 
	// Elle retourne la position de cette sous-chaîne 
	// ou -1 si elle ne l'a pas trouvée. 
	// Cette méthode est sensible à la casse.
function ocIsContainedV1(word) {
	let position = word.toLowerCase().indexOf("oc");

	if(position == -1)
		return(0);
	else
		return(1);
}

// Solution 2, on fait les choses "à la main"
	// On parcours toute la chaine, et on vérifie
	// s'il y a une occurence de "o", puis de "c"
function ocIsContainedV2(word) {
	let i = 0;

	while(i < word.length - 1) {
		if(word[i].toLowerCase() == "o" && word[i + 1].toLowerCase() == "c")
			return(1);
		i++;
	}
	return(0);
}

// "kayak" est un palindrome
// "Elle"  est un palindrome
// "test"  n'est pas un palindrome
function isItPalindrome(word) {
	let i = 0;
	let j = word.length - 1;

	while(i < j) {
		if (word[i].toLowerCase() != word[j].toLowerCase())
			return(0);
		i++;
		j--;
	}
	return(1);
}

function howManyWords() {
	let NbWords = document.getElementsByClassName("word").length;
	return(NbWords);
}

function getWordsTextContent() {
	let wordsEltsList = document.getElementsByClassName("word");
	let wordsList = [];

	for (let item of wordsEltsList) {
		if (item.getElementsByTagName("input")[0].value)
	    	wordsList.push(item.getElementsByTagName("input")[0].value);
	}

	return(wordsList);
}

function addNewWord() {
	let newWordPosition = howManyWords() + 1;

	const divElt = document.createElement("div");
	divElt.classList.add("word");

	const labelElt = document.createElement("label");
	labelElt.setAttribute("for", "word" + newWordPosition);
	labelElt.textContent = "Mot " + newWordPosition + " :";

	const inputElt = document.createElement("input");
	inputElt.setAttribute("type", "text");
	inputElt.setAttribute("name", "word" + newWordPosition);

	divElt.appendChild(labelElt);
	divElt.appendChild(inputElt);
	document.getElementById("UserInput").appendChild(divElt);
}

function deleteLastWord() {
	const lastWordPosition = howManyWords() - 1;

	if (lastWordPosition > 0)
		document.getElementById("UserInput").removeChild(document.getElementsByClassName("word")[lastWordPosition]);
}

function cleanResultArea() {
	let resultArea = document.getElementById("calculatorResult");

	while (resultArea.firstChild) {
		resultArea.removeChild(resultArea.firstChild);
	}
}

///////////////////
// EVENTLISTENER //
///////////////////

// 
// Ecouter le click du bouton pour ajouter un mot
function clicAdd() {
    addNewWord();
}

let boutonAdd = document.getElementById("add");
boutonAdd.addEventListener("click", clicAdd);



// 
// Ecouter le click du bouton pour supprimer un mot
function clicDelete() {
    deleteLastWord();
}

let boutonDelete = document.getElementById("delete");
boutonDelete.addEventListener("click", clicDelete);



// 
// Ecouter le click du bouton "Calculer les points du / des mot(s)" pour calculer les points du / des mot(s)
function clicValidate() {
	cleanResultArea();

    let wordsList = getWordsTextContent();

    wordsList.forEach(function(item){
  		const pElt = document.createElement("p");
    	let userInput = userInputChecker(item);
    	let wordPoints;
  		
  		if (userInput == 1) { 
  			wordPoints = wordPointsCalculator(item);
			pElt.textContent = "Le mot " + item + " vaut " + wordPoints + " Points";
		} 
		else 
  			pElt.textContent = "Le mot " + item + " est invalide ";

  		document.getElementById("calculatorResult").appendChild(pElt);
	});
}

let boutonValidate = document.getElementById("calculatorValidateBtn");
boutonValidate.addEventListener("click", clicValidate);



// 
// Ecouter le click du bouton "Palindrome ?" pour vérifier si le mot est un palindrome / si les mots sont des palindromes
function clicPalindrome() {
	cleanResultArea();

    let wordsList = getWordsTextContent();

    wordsList.forEach(function(item){
  		const pElt = document.createElement("p");
    	let userInput = userInputChecker(item);
  		let Palindrome = isItPalindrome(item);

  		if (userInput == 1) { 
	  		if (Palindrome == 1)
				pElt.textContent = "Le mot " + item + " est un palindrome";
			else if (Palindrome == 0)
				pElt.textContent = "Le mot " + item + " n'est pas un palindrome";
			else
				pElt.textContent = "Erreur avec la fonction isItPalindrome";
  		}
  		else 
  			pElt.textContent = "Le mot " + item + " est invalide ";

  		document.getElementById("calculatorResult").appendChild(pElt);
	});
}

let boutonPalindrome = document.getElementById("calculatorExtraPalindrome");
boutonPalindrome.addEventListener("click", clicPalindrome);



// 
// Ecouter le click du bouton "OC occurrence ?" pour vérifier s'il y a une occurence "OC" dans le(s) mot(s)
function clicOC() {
	cleanResultArea();

    let wordsList = getWordsTextContent();

    wordsList.forEach(function(item){
		const pElt = document.createElement("p");
    	let userInput = userInputChecker(item);
    	let OC;

    	if (userInput == 1) { 
	  		OC = ocIsContainedV1(item);
	  		// OC = ocIsContainedV2(item);

	  		if (OC == 1)
				pElt.textContent = "L'occurence \"OC\" est présente dans le mot " + item;
			else if (OC == 0)
				pElt.textContent = "L'occurence \"OC\" n'est pas présente dans le mot " + item;
			else
				pElt.textContent = "Erreur avec la fonction ocIsContainedV1";
				// pElt.textContent = "Erreur avec la fonction ocIsContainedV2";
  		}
  		else 
  			pElt.textContent = "Le mot " + item + " est invalide ";

  		document.getElementById("calculatorResult").appendChild(pElt);
	});
}

let boutonOC = document.getElementById("calculatorExtraOC");
boutonOC.addEventListener("click", clicOC);