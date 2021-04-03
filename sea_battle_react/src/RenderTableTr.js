import React from 'react';
import ReactDOM from 'react-dom';


class RenderTableTr extends React.Component {

	constructor(props) {
		super(props);
		this.isMyBatlefield = props.isMyBatlefield;
		this.calling_object = props.calling_object;

		this.line = props.line;
		this.column = props.column;
		this.content_input = props.content_input;

		this.workingShip = "☐";
		this.missContent = "⁕";
		this.destructionShip = "⛝";
	}

    getIdCellDiv() {
        var idCell = "cell_" + this.line + "_" + this.column;
        if (this.isMyBatlefield === true) {
            idCell = "my_" + idCell;
        } else {
            idCell = "enemy_" + idCell;
        }
        return idCell;
    }

    addRedHoverForEnemyBattleField() {
		if (!this.isMyBatlefield) {
			this.possibleClicked = () => this.calling_object.stepPlayer(this.line, this.column);
			this.className = this.className + " red_hover";
		}
    }

    addHiddigClassForDivWithContent() {
        this.classNameData = "";
        if (this.content_input === this.workingShip && !this.isMyBatlefield) {
            this.classNameData = "hidding";
        }
    }

	myRender() {
        this.idCell = this.getIdCellDiv();
		this.className = "cell_div";
		this.addRedHoverForEnemyBattleField();
		this.addHiddigClassForDivWithContent();

		return (
            <td>
                <div class={this.className} onClick={this.possibleClicked}>
                    <div id={this.idCell} class={this.classNameData}>{this.content_input}</div>
                </div>
            </td>
            )
	}
}

export default RenderTableTr;
