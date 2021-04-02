import React from 'react';
import ReactDOM from 'react-dom';


class NewGameHeight extends React.Component {

	constructor(props) {
		super(props);
		this.state = { value: '5' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.workingShip = "☐";
		this.missContent = "⁕";
		this.destructionShip = "⛝";

	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}



	stepPlayer(line, column, isAttakMyBatlefield = false) {
		if (this.game_over) {
			return;
		}




		var idCell;
		if (!isAttakMyBatlefield) {
			idCell = "enemy_cell_" + line + "_" + column;
		} else {
			idCell = "my_cell_" + line + "_" + column;
		}
		var is_selected_cell_of_enemy_battlefield_is_EMPTY =
			0 === document.getElementById(idCell).innerHTML.length;
		if (is_selected_cell_of_enemy_battlefield_is_EMPTY) {
			document.getElementById(idCell).innerHTML = this.missContent;
			if (!isAttakMyBatlefield) {
				this.incrementCountSteps();
			}
		}

		
		var is_working_cell_of_ship = this.workingShip === document.getElementById(idCell).innerHTML;

		if (is_working_cell_of_ship) {
			document.getElementById(idCell).innerHTML = this.destructionShip;
            document.getElementById(idCell).className = "";

			if (!isAttakMyBatlefield) {
				this.enemy_working_cells_of_ships--;
			} else {
				this.my_working_cells_of_ships--;
			}


			if (!isAttakMyBatlefield) {
				this.incrementCountSteps();
			}




			var is_player_wins = this.enemy_working_cells_of_ships === 0;
			if (is_player_wins) {
				this.game_over = true;
				alert("Player wins");
			}

			var is_computer_wins = this.my_working_cells_of_ships === 0;
			if (is_computer_wins) {
				this.game_over = true;
				alert("Computer wins");
			}
		}


		if (!isAttakMyBatlefield) {
			this.stepComputer();
		}
	}

	incrementCountSteps() {

		var count_moves_made = document.getElementById("number_takes_step").innerHTML;
		count_moves_made++;
		document.getElementById("number_takes_step").innerHTML = count_moves_made;
	}

	stepComputer() {



		var x = getRandomInt(0, +this.width);
		var y = getRandomInt(0, +this.height);


		while (true) {

			var idCell = "my_cell_" + x + "_" + y;

			var is_already_visited = this.missContent === document.getElementById(idCell).innerHTML
				|| this.destructionShip === document.getElementById(idCell).innerHTML;
			if (is_already_visited) {
				x = getRandomInt(0, +this.width);
				y = getRandomInt(0, +this.height);
			} else {
				break;
			}
		}




		var isAttakMyBatlefield = true;
		this.stepPlayer(x, y, isAttakMyBatlefield);

	}

	showGameOver() {
		alert("good");
		//FIXME
	}

	renderTableTr(cells, isMyBatlefield) {


		return cells.map(obj => {

			var line = obj[0];
			var column = obj[1];
			var content_input = obj[2];
			// return (
			//       <td>
			//          <div line="2" column="3" id="{line}" class="cell_div" onClick={() => this.stepPlayer(line, column)}>{content_input}</div>
			//        </td>
			// )

			var idCell = "cell_" + line + "_" + column;
			if (isMyBatlefield === true) {
				idCell = "my_" + idCell;
			} else {
				idCell = "enemy_" + idCell;
			}

			var className = "cell_div";
			if (!isMyBatlefield) {
				var possibleClicked = () => this.stepPlayer(line, column)
				className = className + " red_hover";
			}

            var classNameData = "";
            if (content_input === this.workingShip && !isMyBatlefield) {
                classNameData = "hidding";
            }

			return (
                <td>
                    <div class={className} onClick={possibleClicked}>
                        <div id={idCell} class={classNameData}>{content_input}</div>
                    </div>
                </td>
                )



			// return divBlock;
		})
	}




	renderTable(isMyBatlefield) {
		return this.tableArray.map((cells, line) => {
			return (
				<tr key="t">
					{this.renderTableTr(cells, isMyBatlefield)}
				</tr>
			)
		})
	}

	reTable(isMyBatlefield) {
		return (
			<div>
				<table class="table-battlefield">
					<tbody>
						{this.renderTable(isMyBatlefield)}
					</tbody>
				</table>
			</div>
		)
	}

	resetTableArray() {
		var width = document.getElementById("width_battlefield_input").value;
		var height = document.getElementById("height_battlefield_input").value;
		this.width = width;
		this.height = height;
		this.tableArray = [];
		for (var line = 0; line < height; line++) {
			var lineArray = [];
			for (var column = 0; column < width; column++) {
				lineArray[column] = [line, column];
			}
			this.tableArray[line] = lineArray;
		}


		var listShips = [
			// [4, 1],
			// [3, 2],
			[2, 2]
			// [1, 4]
		];

		var sum = 0;
		listShips.map(obj => {
			sum = +sum + (+obj[1] * +obj[0]);
			return true;
		});

		this.enemy_working_cells_of_ships = sum;
		this.my_working_cells_of_ships = sum;
		document.getElementById('number_takes_step').innerHTML = 0;
		document.getElementById('min_possible').innerHTML = this.enemy_working_cells_of_ships;


		listShips.map(obj => {

			var size_ships = obj[0];
			var count_ships = obj[1];
			for (var i = 0; i < count_ships; i++) {

				var position = this.tryFindCoordinats(size_ships, width, height);
				this.writeShipInValidCoodrinate(position, size_ships);


			}
			return "true";
		});
	}

	handleSubmit(event) {
		//TODO: add battlefield


		this.game_over = false;
		document.getElementById("step_deteminate").innerHTML = "ходит:";




		this.resetTableArray();






		var isMyBatlefield = true;
		ReactDOM.render(
			this.reTable(isMyBatlefield),
			document.getElementById('my_battlefield')
		);

		this.resetTableArray();
		isMyBatlefield = false;
		ReactDOM.render(
			this.reTable(isMyBatlefield),
			document.getElementById('enemy_battlefield')
		);
		event.preventDefault();
	}

	tryFindCoordinats(size_ships, width, height) {
		var count_try = 0;
		var xCoordinate;
		var yCoordinate;
		var orientatino;
		while (count_try < 100000) {
			xCoordinate = getRandomInt(0, +width);
			yCoordinate = getRandomInt(0, +height);
			orientatino = getRandomInt(0, 2);

			if (this.isValidPositionShip(orientatino, xCoordinate, yCoordinate, width, height, size_ships)) {
				break;
			}
		}
		return [xCoordinate, yCoordinate, orientatino];
	}

	writeShipInValidCoodrinate(cooridnate, size_ships) {
		var xCoordinate = cooridnate[0];
		var yCoordinate = cooridnate[1];
		var orientatino = cooridnate[2];


		var isRight = orientatino === 0;
		var isBottom = orientatino === 1;

		for (var z = 0; z < size_ships; z++) {

			var line = yCoordinate;
			var column = xCoordinate;

			this.tableArray[line][column][2] = this.workingShip;
			if (isRight) {
				xCoordinate++;
			} else if (isBottom) {
				yCoordinate++;
			} else {
				alert("bad_branch")
				console.assert("bad vetka: " + false);
			}
		}
	}



	isValidPositionShip(orientatino, xCoordinate, yCoordinate, width, height, size_ships) {



		var isRight = orientatino === 0;
		var isBottom = orientatino === 1;
		for (var z = 0; z < size_ships; z++) {
			if (isRight) {
				if (this.isValidPosition(xCoordinate, yCoordinate, width, height)) {
					xCoordinate++;
				} else {
					return false;
				}
			} else if (isBottom) {
				if (this.isValidPosition(xCoordinate, yCoordinate, width, height)) {
					yCoordinate++;
				} else {
					return false;
				}
			} else {
				alert("bad_branch")
				console.assert("bad vetka: " + false);
			}
		}
		return true;
	}

	isValidPosition(xCoordinate, yCoordinate, width, height) {
		var line = yCoordinate;
		var column = xCoordinate;
		var yInclude = 0 <= yCoordinate && yCoordinate <= height;
		var xInclude = 0 <= xCoordinate && xCoordinate <= width;
		var isEmptyCell = (this.workingShip !== this.tableArray[line][column][2]);
		return xInclude && yInclude && isEmptyCell;
	}

	render() {
		return (
			<form id="new_game_form_height" onSubmit={this.handleSubmit}>
				<table>
					<tr>
						<td>
							Высота поля:
            </td>
						<td>
							<label>
								<input class="size_battlefield_input" id="height_battlefield_input" type="number" value={this.state.value} onChange={this.handleChange} />
							</label>
						</td>
					</tr>
					<tr>
						<td>
							Ширина поля:
            </td>
						<td>
							<label>
								<input class="size_battlefield_input" id="width_battlefield_input" type="number" value={this.state.value} onChange={this.handleChange} />
							</label>
						</td>
					</tr>
					<tr>
						<td colspan="2"><input type="submit" value="Начать новую игру" /></td>
					</tr>
				</table>
			</form>
		);
	}
}



function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}



export default NewGameHeight;

