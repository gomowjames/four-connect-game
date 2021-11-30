import React from 'react';

export default class Slot extends React.Component {
  updateColor() {
    
    switch( this.props.color ) {
      
      case 1:
        return <div className="slot color-1"></div>
      
      case 2:
        return <div className="slot color-2"></div>
      
      default:
        return <div className="slot transparent" onClick={() => this.props.handleDrop( this.props.position )}></div>

    }
  }

  render() {
    return this.updateColor();
  }
}
