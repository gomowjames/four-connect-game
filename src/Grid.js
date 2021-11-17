import React from 'react';
import Slot from './Slot';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: Array(42).fill(null),
      redIsNext: true,
    };
  }

  handleClick(i) {
    const slots = this.state.slots.slice();
    slots[i] = 'X';
    this.setState({
      slots: slots,
      redIsNext: !this.state.redIsNext,
    });
  }

  drawSlot(i) {
    return (
      <Slot
        value={this.state.slots[i]} 
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    
    const status = "Player's turn: " + (this.state.redIsNext ? 'Red' : 'Black');
    
    return (
      <>
      <header>{status}</header>
      <section id="grid">
        <div className="column">
          <button className="selector">&#8681;</button>
          {this.drawSlot(1)}
          {this.drawSlot(2)}
          {this.drawSlot(3)}
          {this.drawSlot(4)}
          {this.drawSlot(5)}
          {this.drawSlot(6)}
        </div>
        <div className="column">
          <button className="selector">&#8681;</button>
          {this.drawSlot(7)}
          {this.drawSlot(8)}
          {this.drawSlot(9)}
          {this.drawSlot(10)}
          {this.drawSlot(11)}
          {this.drawSlot(12)}
        </div>
        <div className="column">
          <button className="selector">&#8681;</button>
          {this.drawSlot(13)}
          {this.drawSlot(14)}
          {this.drawSlot(15)}
          {this.drawSlot(16)}
          {this.drawSlot(17)}
          {this.drawSlot(18)}
        </div>
        <div className="column">
          <button className="selector">&#8681;</button>
          {this.drawSlot(19)}
          {this.drawSlot(20)}
          {this.drawSlot(21)}
          {this.drawSlot(22)}
          {this.drawSlot(23)}
          {this.drawSlot(24)}
        </div>
        <div className="column">
          <button className="selector">&#8681;</button>
          {this.drawSlot(25)}
          {this.drawSlot(26)}
          {this.drawSlot(27)}
          {this.drawSlot(28)}
          {this.drawSlot(29)}
          {this.drawSlot(30)}
        </div>
        <div className="column">
          <button className="selector">&#8681;</button>
          {this.drawSlot(31)}
          {this.drawSlot(32)}
          {this.drawSlot(33)}
          {this.drawSlot(34)}
          {this.drawSlot(35)}
          {this.drawSlot(36)}
        </div>
        <div className="column">
          <button className="selector">&#8681;</button>
          {this.drawSlot(37)}
          {this.drawSlot(38)}
          {this.drawSlot(39)}
          {this.drawSlot(40)}
          {this.drawSlot(41)}
          {this.drawSlot(42)}
        </div>
      </section>
      </>
    )
  }
}

/*
export default function Grid() {
  
  function drawSlot(i) {
    return(
      <Slot value={i} />
    );
  }
}
*/