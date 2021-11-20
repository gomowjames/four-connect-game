import React from 'react';
import Slot from './Slot.js';

export default class Column extends React.Component {
  constructor(props) {
    super(props);
  }

  drawSlot(i) {
    
console.log( this.props.index )    
      if ( i === this.props.index ) {
        return (
          <Slot
            className={`slot ${ this.props.className }`}
            
          />
        );
      } else {
        return (
          <Slot
            className="slot"
            
          />
        );
      }
  }

  render() {
    return (
      <div className="column">

        <button onClick={this.props.handleClick}>&#8681;</button>

        {this.drawSlot(0)}
        {this.drawSlot(1)}
        {this.drawSlot(2)}
        {this.drawSlot(3)}
        {this.drawSlot(4)}
        {this.drawSlot(5)}
      </div>
    )
  }
}