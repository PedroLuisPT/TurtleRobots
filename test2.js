"use strict"
var player = 'P0';
var position = [[0, 0, 'S'], [0, 7, 'N'], [7, 0, 'N'], [7, 7, 'S']];
function main() {

	var sGame = startGame(8, 4, 7)
	$("#changePlayer").click(function () {
		if (player === 'P0') {
			player = 'P1';
		} else if (player === 'P1') {
			player = 'P2';
		} else if (player === 'P2') {
			player = 'P3';
		} else (player = 'P0')
	})

	createGrid(sGame)

	/*----Movimento dos jogadores-----*/

	var UP1 = document.getElementById("UP1");
	UP1.onclick = function () {
		sGame = moveUp(sGame, player);
		console.log(player)
		createGrid(sGame)
	}

	var Down1 = document.getElementById("Down1");
	Down1.onclick = function () {
		sGame = moveDown(sGame, position);
		console.log(sGame)

		createGrid(sGame)
	}

	var Left1 = document.getElementById("Left1");
	Left1.onclick = function () {
		sGame = moveLeft(sGame, position);
		console.log(sGame)

		createGrid(sGame)
	}

	var Right1 = document.getElementById("Right1");
	Right1.onclick = function () {
		sGame = moveRight(sGame, position);
		console.log(sGame)

		createGrid(sGame)
	}

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
	tableOfGame[rowA][columnA] = 'J';
	tableOfGame[rowB][columnB] = 'J';
	tableOfGame[rowA][columnB] = 'J';
	tableOfGame[rowB][columnA] = 'J';
	return tableOfGame
}

/*
*
*
*
*/

function addPlayers(tableOfGame) {
	for (var i = 0; i < position.length; i++) {
		console.log(position[i][0]);
		tableOfGame[position[i][0]][position[i][1]] = 'P' + i;
	}
	console.log(tableOfGame)
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
/*function playerFinder(tableOfGame, player) {
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
*/



function isItAllowed(tableOfGame, position, tag) {
	var row = position[0][0];
	var column = position[0][1];
	var tag = ['mUp', 'mDw', 'mLf', 'mRt']
	if (tag[0]) {
		if (row == 0) {
			return true;
		}
		else if (tableOfGame[row - 1][column] === 'J') {
			alert('You win!')
		}
		else if (tableOfGame[row - 1][column] !== 0) {
			return false;
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
	let row = position[0][0]
	let column = position[0][1]
	//console.log("pos" + table[row][column])
	let control = isItAllowed(tableOfGame, player, "mUp")
	//console.log("control" + control)
	if (control == true) {
		tableOfGame[row][column] = 0;
		tableOfGame[row - 1][column] = player;
	}
	return tableOfGame
}

function moveDown(tableOfGame, player) {
	let row = position[0][0]
	let column = position[0][1]
	//console.log("pos" + table[row][column])
	let control = isItAllowed(tableOfGame, player, "mDw")
	//console.log("control" + control)
	if (control == true) {
		tableOfGame[row][column] = 0;
		tableOfGame[row + 1][column] = player;
	}
	return tableOfGame
}

function moveLeft(tableOfGame, player) {
	var table = tableOfGame;
	/*	let pl = playerFinder(table, player)
		let row = pl[0];
		let column = pl[1];*/
	let row = position[0][0]
	let column = position[0][1]
	//console.log("pos" + table[row][column])
	let control = isItAllowed(tableOfGame, player, "mLf")
	//console.log("control" + control)
	if (control == true) {
		table[row][column] = 0;
		table[row][column - 1] = player;
	}
	return table
}

function moveRight(tableOfGame, player) {
	var table = tableOfGame;
	/*	let pl = playerFinder(table, player)
		let row = pl[0];
		let column = pl[1];*/
	let row = position[0][0]
	let column = position[0][1]
	//console.log("pos" + table[row][column])
	let control = isItAllowed(tableOfGame, player, "mRt")
	//console.log("control" + control)
	if (control == true) {
		table[row][column] = 0;
		table[row][column + 1] = position;
	}
	return table
}


/*--------Fim do movimento----------*/

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
			else if (tableOfGame[i][j] === 'P0') {
				gridImage = document.createElement('img');
				gridImage.src = "./p4.png"
				tableData.appendChild(gridImage)
			}
			else if (tableOfGame[i][j] === 'W') {
				gridImage = document.createElement('img');
				gridImage.src = "./wall1.png"
				tableData.appendChild(gridImage)
			}
			else if (tableOfGame[i][j] === 'J') {
				gridImage = document.createElement('img');
				gridImage.src = "./joia_1.png"
				tableData.appendChild(gridImage)
			}

			tablerow.appendChild(tableData)
		}
	}

	return tableData;
}


document.addEventListener("DOMContentLoaded", function (event) { main() });
