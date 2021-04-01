import React from 'react';
import ReactDOM from 'react-dom';


class NewGameHeight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '5'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }



    renderTd(line, column) {
        return (
            <div>
                <div
                    className='box'
                    style={{background:this.state.color}}
                    onClick={this.changeColor}
                >
                    In here already
                </div>
            </div>
        );
    }

   stepPlayer(line, column) {
     alert(line, column);
   }

   renderTableTr(cells) {





        return cells.map((line, column) => {
           return (
                 <td><div onClick={() => this.stepPlayer(line, column)}>></div> </td>
           )
        })
     }




   renderTable() {
      return this.tableArray.map((cells, line) => {
         return (
            <tr key="t">
               {this.renderTableTr(cells)}
            </tr>
         )
      })
   }

   reTable() {
      return (
         <div>
            <table id='students'>
               <tbody>
                  {this.renderTable()}
               </tbody>
            </table>
         </div>
      )
   }

  handleSubmit(event) {
    //TODO: add battlefield
    var width =  document.getElementById("width_battlefield_input").value;
    var height =  document.getElementById("height_battlefield_input").value;
    this.tableArray = [];
    for (var line = 0; line < height; line++) {
      var lineArray = [];
      for (var column = 0; column < width; column++) {
        lineArray[column] = [line, column];
      }
      this.tableArray[line] = lineArray;
    }
    // alert(this.tableArray);
    // alert(this.reTable());

    ReactDOM.render(
      this.reTable(),
      document.getElementById('my_battlefield')
    );
    ReactDOM.render(
      this.reTable(),
      document.getElementById('enemy_battlefield')
    );
    event.preventDefault();
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
            <td colspan="2"><input type="submit" value="Submit" /></td>
          </tr>
        </table>
      </form>
    );
  }
}






export default NewGameHeight;

