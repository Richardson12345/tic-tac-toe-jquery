// JavaScript Document
$(document).ready(function() {
	let x = "X"
	let o = "O"
	let turn = 1;
	let x_win = 0;
	let o_win = 0;
	let boardArr = [['','',''], ['','',''], ['','','']]
	let board = $("#board")
	let xScore = $('#X-win')
	let oScore = $('#O-win')
	let player = $('#playerTurn')
	player.append(x)
	xScore.append(x_win)
	oScore.append(o_win)
 	function createBoard () {
		for (let z = 0; z < boardArr.length; z ++) {
			board.append(`<div class="boardRow" id="row${z}"></div>`)
			let currentRow = boardArr[z]
			let currentRowDiv = $(`#row${z}`)
			for (let k = 0; k < currentRow.length; k ++) {
				let data = currentRow[k]
				currentRowDiv.append(`<div class="boardColumn" data-count="${z}-${k}"></div>`)
			}
		}
	}
 	createBoard ();
 	$(".boardColumn").click(function (e) {
		let currentBox = e.currentTarget
		let position = currentBox.dataset.count.split('-')
		let row = position[0]
		let column = position[1]
		if (currentBox.innerText == '') {
			if (turn == 1) {
				boardArr[+row][+column] = x
				currentBox.append(x)
				winnerChecker()
				turn ++
				player.text(o)
			} else {
				boardArr[+row][+column] = o
				currentBox.append(o)
				winnerChecker()
				turn = 1
				player.text(x)
			}
		}
	})
 	$("#restart").click(function (e) {
		clearBoard()
	})
 	$("#reset").click(function (e) {
		window.location.reload()
	})
 	function clearBoard () {
		boardArr = [['','',''], ['','',''], ['','','']]
		let columns = $(".boardColumn")
		columns.empty()
	}
 	function displayWinner () {
		if (turn == 1) {
			swal('congrats', 'player X won!', 'success')
			x_win ++
			xScore.text(x_win)
			clearBoard()
		} else {
			swal('congrats', 'player O won!', 'success')
			o_win ++
			oScore.text(o_win)
			clearBoard()
		}
	}
 	function winnerChecker () {
		let xWin = ''
		let oWin = ''
 		for (let z = 0; z < boardArr.length; z++) {
			xWin += 'X'
			oWin += 'O	'
		}
 		let diagonalLeft = '';
		let diagonalRight = '';
 		for (let z = 0; z < boardArr.length; z++) {
			let length = boardArr.length - 1
			let horrizontal = boardArr[z].join('')
			let verticalArr = ''
			diagonalLeft += boardArr[z][length - z]
			diagonalRight += boardArr[z][z]
			for (let k = 0; k < boardArr.length; k++) {
				verticalArr += boardArr[k][z]
			}
			if (horrizontal == xWin || horrizontal == oWin || verticalArr == xWin || verticalArr == oWin) {
				displayWinner()
				break;
			}
		}
 		if (diagonalLeft == xWin || diagonalLeft == oWin || diagonalRight == xWin || diagonalRight == oWin) {
			displayWinner()
		}
 		checkDraw()
	}
 	function checkDraw () {
		let reset = true
		boardArr.forEach((row) => {
			if (row.indexOf('') !== -1) {
				reset = false
			}
		})
		if (reset == true) {
			swal('Draw', 'The Board Will Reset, Please resume playing', 'info')
			clearBoard()
		}
	}
});
