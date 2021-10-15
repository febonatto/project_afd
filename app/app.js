// tags html
const button = document.querySelector(".button");
const money = document.querySelectorAll(".money");
const candy = document.querySelectorAll(".candy");
const ammount = document.querySelector("#ammount span");
const counter = document.querySelector("#button-container .counter");

// variáveis
let ammountMoney = [0];
let candyValue = 0;
let candyQuantity = 0;
let moneyRest = 0;
let timeoutButton;

// adição de evento as tags
button.addEventListener("click", () => triggerButton());
money.forEach((m) => m.addEventListener("click", () => triggerMoney(m)));
candy.forEach((c) => c.addEventListener("click", () => triggerCandy(c)));

// funções
triggerButton = () => {
	// usa o método que retorna qual das "candy" está selecionada
	const selectedCandy = getSelectedCandy();

	// define a cor da "candy" selecionada para geração da resposta
	let color;
	if (selectedCandy) {
		if (selectedCandy.innerHTML === "A") color = "blue";
		if (selectedCandy.innerHTML === "B") color = "yellow";
		if (selectedCandy.innerHTML === "C") color = "green";
	}

	// realiza a animação e tira o poder de click do botão (prevenção de clicks rápidos)
	button.style.animation = "animate-button 1000ms ease";
	button.style.pointerEvents = "none";
	// após 1s retira a animação do botão
	setTimeout(() => {
		button.style.animation = "";
	}, 1000);
	// caso a cor e a quantidade de "candy" estejam setadas ele retorna o click do botão
	if (color && candyQuantity) {
		ammount.innerHTML = `R$${moneyRest},00`;

		timeoutButton = setTimeout(() => {
			button.style.pointerEvents = "all";
		}, 1000);

		ammountMoney = [moneyRest];

		calculate();
	}
};

triggerMoney = (m) => {
	// adiciona o valor clicado ao array "ammountMoney"
	ammountMoney.push(parseInt(m.innerHTML));
	// cria a constante "ammountTotal" que vai receber a quantia total adicionada pelo usuário
	const ammountTotal = getAmmountTotal();
	// exibe esse total na tela para que o usuário possa enxergar
	ammount.innerHTML = `R$${ammountTotal},00`;

	// percorre as minhas tags com a classe "money" e retira a ação de click delas
	money.forEach((m) => (m.style.pointerEvents = "none"));
	// após 1.5s percorre novamente e da a possibilidade de clicar de volta (prevenção de clicks rápidos)
	setTimeout(() => {
		money.forEach((m) => (m.style.pointerEvents = "all"));
	}, 1500);

	calculate();
};

triggerCandy = (c) => {
	// percorre todas as tags com classe "candy" e remove a classe "grow" das que tiverem
	candy.forEach((c) => {
		c.classList.remove("selected");
		c.style.animation = "";
	});
	// adiciona a classe "grow" apenas para a última clicada pelo usuário
	c.classList.add("selected");
	c.style.animation = "animate-candy 750ms linear infinite";

	// acessa a variável local "candyValue" e atualiza o valor dependendo da "candy" escolhida pelo usuário
	if (c.innerHTML === "A") candyValue = 6;
	if (c.innerHTML === "B") candyValue = 7;
	if (c.innerHTML === "C") candyValue = 8;

	calculate();
};

getSelectedCandy = () => {
	// cria a variável "selectedCandy" com o valor inicial null
	let selectedCandy = null;
	// percorre as tags com classe "candy" para ver se alguma esta selecionada
	candy.forEach((c) => {
		if (c.classList.contains("selected")) selectedCandy = c;
	});
	// retorna null caso nenhuma esteja selecionada ou retorna a "candy" selecionada
	return selectedCandy;
};

getAmmountTotal = () => {
	// retorna o valor total adicionado pelo usuário
	return ammountMoney.reduce((acc, curr) => (acc += curr));
};

calculate = () => {
	// cria a constante "ammountTotal" que vai receber a quantia total adicionada pelo usuário
	const ammountTotal = getAmmountTotal();
	// acessa a variável local "candyQuantity" e atualiza seu valor para a quantidade de balas que podem ser compradas a partir da seleção
	candyQuantity = Math.floor(ammountTotal / (candyValue || ammountTotal + 1));
	// acessa a variável local "moneyRest" e atualiza seu valor de troco a partir da bala selecionada
	moneyRest = ammountTotal % (candyValue || ammountTotal + 1);
	// exibe na tela o total de balas que podem ser compradas
	counter.innerHTML = candyQuantity;

	// caso a variável "candyQuantity" seja maior que 0 o botão de retirar se torna clicável, caso contrário não
	if (candyQuantity > 0) {
		button.style.pointerEvents = "all";
	} else {
		button.style.pointerEvents = "none";
	}
	clearTimeout(timeoutButton);
};
