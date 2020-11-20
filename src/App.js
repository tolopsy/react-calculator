import React, {Component} from 'react'
import Button from './components/Button'
import './css/style.css'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      current_result: '',
      previous_results: [],
      lastIsOp: false, //lastIsOp means 'last is operator'
    }
  }

  reset = () => {
    this.setState({
      current_result: '0',
      lastIsOp: false
    });
  }

  addToCurrent = (symbol) => {
    if(['/', '+', '*', '-'].indexOf(symbol) > -1){
      let {previous_results} = this.state;
      previous_results.push(this.state.current_result + symbol)
      this.setState({previous_results, lastIsOp: true});
    }else{
      if((this.state.current_result === "0" && symbol !== ".") || this.state.lastIsOp){
        this.setState({current_result: symbol, lastIsOp: false});
      }else{
        this.setState({
          current_result: this.state.current_result + symbol
        });
      }
      
    }
  }

  calculate = (symbol) => {
    let {current_result, previous_results, lastIsOp} = this.state;
    if(previous_results.length > 0){
      current_result = eval(String(previous_results[previous_results.length - 1] + current_result))
      this.setState({current_result, previous_results: [], lastIsOp: true})
    }
  }

  render(){
    const buttons =[
      {symbol: 'C', cols: 3, action: this.reset},
      {symbol: '/', cols: 1, action: this.addToCurrent},
      {symbol: '7', cols: 1, action: this.addToCurrent},
      {symbol: '8', cols: 1, action: this.addToCurrent},
      {symbol: '9', cols: 1, action: this.addToCurrent},
      {symbol: '*', cols: 1, action: this.addToCurrent},
      {symbol: '4', cols: 1, action: this.addToCurrent},
      {symbol: '5', cols: 1, action: this.addToCurrent},
      {symbol: '6', cols: 1, action: this.addToCurrent},
      {symbol: '-', cols: 1, action: this.addToCurrent},
      {symbol: '1', cols: 1, action: this.addToCurrent},
      {symbol: '2', cols: 1, action: this.addToCurrent},
      {symbol: '3', cols: 1, action: this.addToCurrent},
      {symbol: '+', cols: 1, action: this.addToCurrent},
      {symbol: '0', cols: 2, action: this.addToCurrent},
      {symbol: '=', cols: 1, action: this.calculate},  
    ];
    return (
      <div className="App">
        {this.state.previous_results.length > 0?
          <div className="recent">{this.state.previous_results[this.state.previous_results.length -1]}</div>
          : null
        }
        <input className="result" type="text" value={this.state.current_result} />

        {buttons.map((btn, i) => {
          return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
        })}
      </div>
    )
  }
}


/*
function App() {
  return (
    <div className="App">
      <input className="result" type="text" value={this.state.current_result} />
    </div>
  );
}
*/

export default App;
