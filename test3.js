"use strict"
var player = 'P1';
var playerList = ['P1', 'P2', 'P3', 'P4']

function main() {

	var sGame = startGame(8, 4, 7)
	$("#changePlayer").click(function () {
		if (player === 'P1') {
			alert('PURPLE')
			player = 'P2';
		} else if (player === 'P2') {
			alert('GREEN')
			player = 'P3';
		} else if (player === 'P3') {
			alert('BLUE')
			player = 'P4';
		} else (
			alert('RED'),
			player = 'P1')
	});

	createGrid(sGame)



	/*----Movimento dos jogadores-----*/

	$("#UP1").click(function () {
		sGame = moveUp(sGame, player);
		createGrid(sGame)
	});

	$("#Down1").click(function () {
		sGame = moveDown(sGame, player);
		createGrid(sGame)
	});

	$("#Left1").click(function () {
		sGame = moveLeft(sGame, player);
		createGrid(sGame)
	});
	$("#Right1").click(function () {
		sGame = moveRight(sGame, player);
		createGrid(sGame)
	});

}

/*-------Tabuleiro de Jogo------*/
function createTurtleBoard(boardSize) {
	let tabuleiro = [boardSize];
	for (let row = 0; row < boardSize; row++) {
		tabuleiro[row] = [boardSize];
		for (let column = 0; column < boardSize; column++) {
			tabuleiro[row][column] = 0;
		}
	}
	return tabuleiro;
}


function jewelsInsert(tableOfGame) {
	let rowA = (tableOfGame.length) / 2;
	let rowB = (tableOfGame.length) / 2 - 1;
	let columnA = (tableOfGame.length) / 2;
	let columnB = (tableOfGame.length) / 2 - 1;
	tableOfGame[rowA][columnA] = 'J1';
	tableOfGame[rowB][columnB] = 'J2';
	tableOfGame[rowA][columnB] = 'J3';
	tableOfGame[rowB][columnA] = 'J4';
	return tableOfGame
}


function addPlayers(tableOfGame, numPlayers) {
	let position = tableOfGame.length - 1;
	switch (numPlayers) {
		case 1:
			tableOfGame[0][0] = 'P1';
			break;
		case 2:
			tableOfGame[0][0] = 'P1';
			tableOfGame[position][0] = 'P2';
			break;
		case 3:
			tableOfGame[0][0] = 'P1';
			tableOfGame[position][0] = 'P2';
			tableOfGame[position][position] = 'P3';
			break;
		default:
			tableOfGame[0][0] = 'P1';
			tableOfGame[position][0] = 'P2';
			tableOfGame[position][position] = 'P3';
			tableOfGame[0][position] = 'P4';
			break;
	}
	return tableOfGame
}


function wallInsert(tableOfGame, numWall) {
	let size = tableOfGame.length - 1;
	let count = 0;
	while (count < numWall) {
		let column = Math.floor((Math.random() * size))
		let row = Math.floor((Math.random() * size))
		if (tableOfGame[row][column] === 0) {
			tableOfGame[row][column] = 'W'
			count++
		}
	}
	return tableOfGame
}


function startGame(boardSize, numPlayers, numWall) {
	let board = createTurtleBoard(boardSize);
	board = jewelsInsert(board);
	board = addPlayers(board, numPlayers);
	board = wallInsert(board, numWall);

	return board;
}
/*--------Fim do tabuleiro-------*/


/*--------Posição do Jogador-------- */
function playerFinder(tableOfGame, player) {
	let len = tableOfGame.length;
	for (let row = 0; row <= len; row++) {
		for (let column = 0; column <= len; column++) {
			if (tableOfGame[row][column] == player) {
				console.log([row, column])
				return [row, column];
			}
		}
	}
}

/*----------Possivel jogar-----------*/
function isItAllowed(tableOfGame, player, tag) {
	let pl = playerFinder(tableOfGame, player)
	let row = pl[0];
	let column = pl[1];
	var tag = ['mUp', 'mDw', 'mLf', 'mRt']
	if (tag[0]) {
		if (row == 0) {
			return true;
		}
		else if (tableOfGame[row - 1][column] === 'J') {
			alert('You win!')
		}
		else if (tableOfGame[row - 1][column] !== 0) {
			return true;
		}
		else { return true }
	}

	else if (tag[1]) {
		if (row == tableOfGame.length - 1) {
			alert("You can't make that move!")
			return false
		}
		else if (tableOfGame[row + 1][column] === 'J') {
			alert('You win!')
		}
		else if (tableOfGame[row + 1][column] !== 0) {
			return false;
		}
		else { return true }
	}

	else if (tag[2]) {
		if (column == 0) {
			alert("You can't make that move!")
			return false
		}
		else if (tableOfGame[row][column - 1] === 'J') {
			alert('You win!')
		}
		else if (tableOfGame[row][column - 1] !== 0) {
			return false;
		}
		else { return true }
	}

	else if (tag[3]) {
		if (column == tableOfGame.length - 1) {
			alert("You can't make that move!")
			return false
		}
		else if (tableOfGame[row][column + 1] === 'J') {
			alert('You win!')
		}
		else if (tableOfGame[row][column + 1] !== 0) {
			return false;
		}
		else { return true }
	}
	return tableOfGame
}

/*--------Movimento do Jogador--------*/

function moveUp(tableOfGame, player) {
	var table = tableOfGame;
	let pl = playerFinder(table, player)
	let row = pl[0];
	let column = pl[1];
	console.log("pos" + table[row][column])
	let control = isItAllowed(table, player, "mUp")
	console.log("control" + control)
	if (control == true) {
		table[row][column] = 0;
		table[row - 1][column] = player;
	}
	return table
}

function moveDown(tableOfGame, player) {
	var table = tableOfGame;
	let pl = playerFinder(table, player)
	let row = pl[0];
	let column = pl[1];
	console.log("pos" + table[row][column])
	let control = isItAllowed(table, player, "mDw")
	console.log("control" + control)
	if (control == true) {
		table[row][column] = 0;
		table[row + 1][column] = player;
	}
	return table
}

function moveLeft(tableOfGame, player) {
	var table = tableOfGame;
	let pl = playerFinder(table, player)
	let row = pl[0];
	let column = pl[1];
	console.log("pos" + table[row][column])
	let control = isItAllowed(table, player, "mLf")
	console.log("control" + control)
	if (control == true) {
		table[row][column] = 0;
		table[row][column - 1] = player;
	}

	return table
}

function moveRight(tableOfGame, player) {
	var table = tableOfGame;
	let pl = playerFinder(table, player)
	let row = pl[0];
	let column = pl[1];
	console.log("pos" + table[row][column])
	let control = isItAllowed(table, player, "mRt")
	console.log("control" + control)
	if (control == true) {
		table[row][column] = 0;
		table[row][column + 1] = player;
	}
	return table
}

function rotateTurtle() {
	var img = document.getElementById('P1');
	img.rotate(90 * Math.PI / 180);
}



/*--------Fim do movimento----------*/

/*--------Imagem no tabuleiro--------*/
function createGrid(tableOfGame) {
	var table = document.getElementById("gridOfGame");
	table.innerHTML = '';
	var n = tableOfGame.length;
	for (let i = 0; i < n; i++) {
		var tablerow = document.createElement("tr");
		var tableData;
		table.appendChild(tablerow)
		for (let j = 0; j < n; j++) {
			tableData = document.createElement("td");
			tableData.innerHTML = (tableOfGame[i][j]);
			tableData.innerHTML = '';
			tablerow.appendChild(tableData);
			if (tableOfGame[i][j] === 'P1') {
				var gridImage = document.createElement('img');
				gridImage.src = "./p1.png"
				tableData.appendChild(gridImage)
			}
			else if (tableOfGame[i][j] === 'P2') {
				gridImage = document.createElement('img');
				gridImage.src = "./p2.png"
				tableData.appendChild(gridImage)
			}
			else if (tableOfGame[i][j] === 'P3') {
				gridImage = document.createElement('img');
				gridImage.src = "./p3.png"
				tableData.appendChild(gridImage)
			}
			else if (tableOfGame[i][j] === 'P4') {
				gridImage = document.createElement('img');
				gridImage.src = "./p4.png"
				tableData.appendChild(gridImage)
			}
			else if (tableOfGame[i][j] === 'W') {
				gridImage = document.createElement('img');
				gridImage.src = "./wall1.png"
				tableData.appendChild(gridImage)
			}
			else if (tableOfGame[i][j] === 'J1') {
				gridImage = document.createElement('img');
				gridImage.src = "./joia1.png"
				tableData.appendChild(gridImage)
			}
			else if (tableOfGame[i][j] === 'J2') {
				gridImage = document.createElement('img');
				gridImage.src = "./joia2.png"
				tableData.appendChild(gridImage)
			}
			else if (tableOfGame[i][j] === 'J3') {
				gridImage = document.createElement('img');
				gridImage.src = "./joia3.png"
				tableData.appendChild(gridImage)
			}
			else if (tableOfGame[i][j] === 'J4') {
				gridImage = document.createElement('img');
				gridImage.src = "./joia4.png"
				tableData.appendChild(gridImage)
			}


			tablerow.appendChild(tableData)
		}
	}

	return tableData;
}


document.addEventListener("DOMContentLoaded", function (event) { main() });