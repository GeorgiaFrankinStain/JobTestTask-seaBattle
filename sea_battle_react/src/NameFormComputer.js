import React from 'react';
import ReactDOM from 'react-dom';


class NameFormComputer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'Computer'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form  id="form2" onSubmit={this.handleSubmit}>
        <label>
          <input class="enemy-name" type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}





export default NameFormComputer;

