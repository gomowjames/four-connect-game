import React from 'react';
import Column from './Column.js';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    
    const columns = new Array(7);
    for ( let i = 0; i < columns.length; i++ ) { columns[i] = new Array(6).fill( null ); }
    
    this.state = {
      columns: columns,
      redIsNext: true,
      color: 'Empty',
      index: null,
    };
  }

/*
  handleClick(i) {
    const slots = this.state.slots.slice();

    if ( slots[i] ) {
      return;
    }

    slots[i] = this.state.redIsNext ? 'red' : 'black';
    this.setState({
      slots: slots,
      redIsNext: !this.state.redIsNext,
    });
  }
*/

  handleClick(i) {
    const columns = this.state.columns.slice();

    this.setState({
      columns: columns,
      redIsNext: !this.state.redIsNext,
      color: this.state.redIsNext ? 'Red' : 'Black',
    });

//     columns[i] = this.state.redIsNext ? 'Red' : 'Black';
    
    for ( let x = columns[i].length - 1; x >= 0; x-- ) {
      if ( !columns[i][x] ) {
        columns[i][x] = this.state.redIsNext ? 'Red' : 'Black';
        
        this.setState({
          index: x,          
        })
        return;
      }
    }

    return;
  }

  renderColumn(i) {
    return (
      <Column
        key={i}
        className={this.state.color}
        redIsNext={this.state.redIsNext}
        index={this.state.index}
        handleClick={ () => this.handleClick(i) }
      />
    );
  }

  render() {
    
    const status = "Player's turn: " + (this.state.redIsNext ? 'Red' : 'Black');
    
    return (
      <>
      <header>{status}</header>
      <section id="grid">
        {this.renderColumn(0)}
        {this.renderColumn(1)}
        {this.renderColumn(2)}
        {this.renderColumn(3)}
        {this.renderColumn(4)}
        {this.renderColumn(5)}
        {this.renderColumn(6)}
      </section>
      </>
    )
  }
}
