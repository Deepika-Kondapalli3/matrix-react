import React, { Component } from 'react';
import './index.css';

class Matrix extends Component {
    
    state = {
      matrix: Array(3).fill().map(() => Array(3).fill('white')),
      clicks: []
    };
  

  handleClick = (row, col) => {
    const { matrix, clicks } = this.state;

    if (matrix[row][col] === 'green' || clicks.length === 9) return;

    const newMatrix = matrix.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? 'green' : c))
    );

    this.setState({
      matrix: newMatrix,
      clicks: [...clicks, { row, col }]
    }, () => {
      if (this.state.clicks.length === 9) {
        setTimeout(() => {
          this.changeAllToOrange(this.state.clicks);
        }, 1000);
      }
    });
  };

  changeAllToOrange = (clickSequence) => {
    clickSequence.forEach((click, index) => {
      setTimeout(() => {
        this.setState(prevState => {
          const newMatrix = prevState.matrix.map((r, i) =>
            r.map((c, j) => (i === click.row && j === click.col ? 'orange' : c))
          );
          return { matrix: newMatrix };
        });
      }, index * 500);
    });
  };

  render() {
    const { matrix } = this.state;

    return (
      <div className="matrix">
        {matrix.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((color, colIndex) => (
              <div
                key={colIndex}
                className="box"
                style={{ backgroundColor: color }}
                onClick={() => this.handleClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Matrix;
