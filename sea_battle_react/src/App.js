import NameForm from './NameForm';
import './App.css';



function App() {
  return (
<div class="container" id='container-id'>
  <table class="table-battlefield">
    <tr>
      <td><div class="title-battlefield myname" id="name_player"><NameForm /></div></td>
      <td><div class="title-battlefield enemy-name" id="name_computer"><NameForm /></div></td>
    </tr>
    <tr>
      <td>
        <div class="battlefield">
          <table class="battlefield2">
            <tr>
              <td><div class="killed_ally">X</div></td>
              <td class="ally-td"><div class="ally">☐</div></td>
            </tr>
            <tr>
              <td></td>
              <td class="ally-td">1</td>
            </tr>
          </table>
        </div>
      </td>
      <td class="td_with_enemy_map">
        <div class="battlefield">
          <table class="battlefield2">
            <tr>
              <td><div class="killed_enemy">✔</div></td>
              <td>1</td>
            </tr>
            <tr>
              <td>2</td>
              <td>3</td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>    
  <table class="data_about_game">
    <tr class="number_steps">
      <td class="title-number-steps">(number of steps taken)</td>
      <td class="number-steps">15</td>
      <td rowspan="2" class="td_whose_turn"><div class="whose_turn">GFS<br/><span class="lowel_signature">move</span></div></td>
    </tr>
    <tr class="min_possible_number_steps_for_win">
      <td class="title-number-steps">(minimum number of steps to win)</td>
      <td class="number-steps">5</td>
    </tr>
  </table>
</div>
  );
}


export default App;
