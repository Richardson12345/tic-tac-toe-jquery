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

	for (let z = 0; z < boardArr.length; z ++) {
		board.append(`<div class="boardRow" id="row${z}"></div>`)
		let currentRow = boardArr[z]
		let currentRowDiv = $(`#row${z}`)
		for (let k = 0; k < currentRow.length; k ++) {
			let data = currentRow[k]
			currentRowDiv.append(`<div class="boardColumn" data-count="${z}-${k}"></div>`)
		}
	}

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

	function winnerChecker () {
		let xWin = 'XXX'
		let oWin= 'OOO'
		let diagonalOne = `${boardArr[0][0]}${boardArr[1][1]}${boardArr[2][2]}`;
        let diagonalTwo = `${boardArr[0][2]}${boardArr[1][1]}${boardArr[2][0]}`;
		let verticalOne = `${boardArr[0][0]}${boardArr[1][0]}${boardArr[2][0]}`;
        let verticalTwo = `${boardArr[0][1]}${boardArr[1][1]}${boardArr[2][1]}`;
		let verticalThree = `${boardArr[0][2]}${boardArr[1][2]}${boardArr[2][2]}`;
		if (
			verticalOne == xWin ||
            verticalOne == oWin ||
            verticalTwo == xWin ||
            verticalTwo == oWin || 
            verticalThree == xWin ||
            verticalThree == oWin ||
            diagonalOne == xWin ||
            diagonalOne == oWin ||
            diagonalTwo == xWin ||
            diagonalTwo == oWin
		) {
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

		for (let z = 0; z < boardArr.length; z ++) {
            if ( boardArr[z].indexOf('') == -1 ) {
				let currentBoard = boardArr[z]
				let horizontalBoard = boardArr[z].join('')
				if (horizontalBoard == xWin || horizontalBoard == oWin) {
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
			} 
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
