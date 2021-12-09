// tags html
const button = document.querySelector(".button");
const money = document.querySelectorAll(".money");
const candy = document.querySelectorAll(".candy");
const ammount = document.querySelector("#ammount span");
const counter = document.querySelector("#button-container .counter");

// variáveis
let word = [];
let ammountMoney = [0];
let candySelected = "";
let candyValue = 0;
let candyQuantity = 0;
let moneyRest = 0;

// adição de evento as tags
button.addEventListener("click", () => triggerButton());
money.forEach((m) => m.addEventListener("click", () => triggerMoney(m)));
candy.forEach((c) => c.addEventListener("click", () => triggerCandy(c)));

// funções
triggerButton = () => {
	// realiza a animação e tira o poder de click do botão (prevenção de clicks rápidos)
	button.style.animation = "animate-button 1000ms ease";
	button.style.pointerEvents = "none";

	// após 1s retira a animação do botão, retorna o click e da a resposta de suas escolhas para o usuário
	setTimeout(() => {
		button.style.animation = "";
		button.style.pointerEvents = "all";

		if (getSelectedCandy()) {
			// coloca como final do alfabeto a "candy" escolhida
			putAtWord(getSelectedCandy().id);

			// realiza o escopo apenas se o total inserido for maior do que o valor da "candy"
			if (getAmmountTotal() >= candyValue) {
				// define o troco que será devolvido
				moneyRest = getAmmountTotal() - candyValue;

				// abre um alert informando o status das escolhas do usuário
				alert(
					`Você resgatou 1 doce ${candySelected}, ${
						moneyRest
							? "obteve R$" + moneyRest + ",00 de troco"
							: "não tem troco"
					} e parou no estado ${getFinalState()}`
				);
				
				// exibe no console o alfabeto enviado pelo usuário
				console.log(word);

				// retorna as variáveis para o valor inicial e desseleciona a "candy"
				resetProgram();
			} else {
				alert("Você não tem dinheiro para resgatar nenhum doce");
			}
		} else {
			alert("Você precisa selecionar um doce para continuar");
		}
	}, 1000);
};

triggerMoney = (m) => {
	// adiciona o valor clicado a palavra do AFD
	putAtWord(m.id);

	// adiciona o valor clicado ao array "ammountMoney"
	ammountMoney.push(parseInt(m.id));

	// exibe o total de dinheiro inserido na tela para que o usuário possa enxergar
	ammount.innerHTML = `R$${getAmmountTotal()},00`;

	if (getSelectedCandy() && getAmmountTotal() >= candyValue) {
		counter.innerHTML = 1;
	}
};

triggerCandy = (c) => {
	// remove a classe "selected" da "candy" anteriormente selecionada
	const selectedCandy = Array.from(candy).find((c) =>
		c.classList.contains("selected")
	);
	if (selectedCandy) {
		selectedCandy.classList.remove("selected");
		selectedCandy.style.animation = "";
	}

	// adiciona a classe "selected" para a última "candy" clicada pelo usuário
	c.classList.add("selected");
	c.style.animation = "animate-candy 750ms linear infinite";

	// acessa a variável local "candyValue" e atualiza o valor dependendo da "candy" escolhida pelo usuário
	candySelected = c.id;
	if (c.id === "A") candyValue = 6;
	if (c.id === "B") candyValue = 7;
	if (c.id === "C") candyValue = 8;

	if (getAmmountTotal() >= candyValue) {
		counter.innerHTML = 1;
	} else {
		counter.innerHTML = 0;
	}
};

putAtWord = (character) => {
	// adiciona o valor como string ao array de caracteres
	word.push(character.toString());
};

getSelectedCandy = () => {
	// retorna a "candy" que possui "selected" na classe
	return Array.from(candy).find((c) => c.classList.contains("selected"));
};

getAmmountTotal = () => {
	// retorna o valor total adicionado pelo usuário
	return ammountMoney.reduce((acc, curr) => (acc += curr));
};

getFinalState = () => {
	let state = "q0";
	const numbers = word.filter((character) => !isNaN(parseInt(character)));
	numbers.forEach((character) => {
		const number = parseInt(character);
		if (
			(state === "q4" && number === 5) ||
			(state === "q5" && number === 5) ||
			(state === "q6" && number === 5) ||
			(state === "q7" && number === 2) ||
			(state === "q7" && number === 5) ||
			(state === "q8" && !!number) ||
			(state === "q9" && !!number)
		) {
			state = "q9";
		} else {
			if (state === "q0" && number === 1) state = "q1";
			else if (state === "q0" && number === 2) state = "q2";
			else if (state === "q0" && number === 5) state = "q5";
			else if (state === "q1" && number === 1) state = "q2";
			else if (state === "q1" && number === 2) state = "q3";
			else if (state === "q1" && number === 5) state = "q6";
			else if (state === "q2" && number === 1) state = "q3";
			else if (state === "q2" && number === 2) state = "q4";
			else if (state === "q2" && number === 5) state = "q7";
			else if (state === "q3" && number === 1) state = "q4";
			else if (state === "q3" && number === 2) state = "q5";
			else if (state === "q3" && number === 5) state = "q8";
			else if (state === "q4" && number === 1) state = "q5";
			else if (state === "q4" && number === 2) state = "q6";
			else if (state === "q5" && number === 1) state = "q6";
			else if (state === "q5" && number === 2) state = "q7";
			else if (state === "q6" && number === 1) state = "q7";
			else if (state === "q6" && number === 2) state = "q8";
			else if (state === "q7" && number === 1) state = "q8";
		}
	});

	const candy = word[word.length - 1];
	if (
		(state === "q7" && candy === "A") ||
		(state === "q8" && candy === "A") ||
		(state === "q9" && candy === "A")
	) {
		state = "ACT";
	} else if (
		(state === "q8" && candy === "B") ||
		(state === "q9" && candy === "B")
	) {
		state = "BCT";
	} else {
		if (state === "q6" && candy === "A") state = "AST";
		else if (state === "q7" && candy === "B") state = "BST";
		else if (state === "q8" && candy === "C") state = "CST";
		else if (state === "q9" && candy === "C") state = "CCT";
	}

	return state;
};

resetProgram = () => {
	word = [];
	ammountMoney = [0];
	candySelected = "";
	candyValue = 0;
	candyQuantity = 0;
	moneyRest = 0;

	const selectedCandy = Array.from(candy).find((c) =>
		c.classList.contains("selected")
	);
	selectedCandy.classList.remove("selected");
	selectedCandy.style.animation = "";

	ammount.innerHTML = "R$0,00";
	counter.innerHTML = 0;
};