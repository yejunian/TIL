import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
    <Square
      key={i} // Idea 3
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />);
  }

  // Idea 3
  // NOTE: Can make it immutable? (without using Array.prototype.push())
  renderSquares() {
    let rows = [];
    for (let r = 0; r < 3; r += 1) {
      let row = [];
      for (let c = 0; c < 3; c += 1) {
        row.push(this.renderSquare(r * 3 + c));
      }
      rows.push(<div key={r} className="board-row">{row}</div>);
    }
    return rows;
  }

  render() {
    return (
      <div>
        {/* Idea 3 */}
        {this.renderSquares()}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coord: null // Idea 1
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); // copy by .slice() for immutability
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        coord: [Math.floor(i / 3), i % 3] // Idea 1
      }]), // .concat() returns a new array without changing the existing arrays
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0 // even number -> true
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // Array.prototype.map()의 callback의 매개 변수
    // 1. 처리할 현재 요소
    // 2. 처리할 현재 요소의 인덱스
    // 3. map()을 호출한 배열(복사본이 아니라 동일한 배열)
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {/* Idea 2 */}
            {move === this.state.stepNumber ? <b>{desc}</b> : desc}
          </button>
          {/* Idea 1 */}
          {!step.coord ? '' : ` (${step.coord[0]},${step.coord[1]})`}
        </li>
      )
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
