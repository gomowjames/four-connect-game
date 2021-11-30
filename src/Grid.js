import React from 'react';
import Column from './Column.js';
import Slot from './Slot.js';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    
    this.gridModel = [];
    this.state = {
      gameOn: false,
      grid: [],
      player1: true,
      color: 0,
    };

//    const columns = new Array(7);
//    const grid = [ columns[0], columns[1], columns[2], columns[3], columns[4], columns[5], columns[6] ];  
  }

  componentDidUpdate() {
    console.log( this.state.grid );
  }

  buildVirtualModel() {
    let newVirtGridModel = [];
    
    for ( let x = 0; x < 7; x++ ) {
      
      let newVirtColumn = [];
        
        for ( let y = 0; y < 6; y++ ) {
          newVirtColumn.push( 0 );
        }

      newVirtGridModel.push( newVirtColumn );
    }
    
    this.gridModel = newVirtGridModel;

//console.log( this.gridModel );
  }

  buildGameGrid() {
    this.buildVirtualModel();
    
    let gameGrid = [];
    
    for ( let a = 0; a < 7; a++ ) {
      
      let newColumn = [];
        
        for ( let b = 0; b < 6; b++ ) {
          newColumn.push( <Slot key={b} color={0} handleDrop={this.handleDrop} position={ [a,b] }></Slot> );
        }

      gameGrid.push( <Column key={a} column={newColumn}></Column> );
    }

    // Set the STATE after both grids are established
    this.setState({
      grid: gameGrid,
      gameOn: true,
    });
  }

  updateGameGrid() {
    let newGameGrid = [];
    
    // Loop through main gridModel array where x represents the columns.
    for ( let x = 0; x < this.gridModel.length; x++ ) {
      
      // Create empty array to be filled with slots
      let newColumn = []; 
      
      // Loop through each column where y represents the slots
      for ( let y = 0; y < this.gridModel[x].length; y++ ) {
        
        // Change slot color by feeding number to Slot switch statement
        if ( this.gridModel[x][y] === 1 ) {
          newColumn.push( <Slot key={y} color={1} handleDrop={this.handleDrop} position={ [x,y] }></Slot> );
          
        } else if ( this.gridModel[x][y] === 2 ) {
          newColumn.push( <Slot key={y} color={2} handleDrop={this.handleDrop} position={ [x,y] }></Slot> );
          
        } else {
          newColumn.push( <Slot key={y} color={0} handleDrop={this.handleDrop} position={ [x,y] }></Slot> );
        }
      }

      // Add updated column to the grid array
      newGameGrid.push( <Column key={x} column={newColumn}></Column> );
    }
    
      // Updated grid is ready to update STATE
      return newGameGrid;
  }

  handleDrop = ( position ) => {    
    // Represents player's dropped chip
    let chipPlacement = [];
    
    // position[0] represents the x, i.e. the column that was clicked
    // position[1] represents the y which is populated by the loop index
    // Loop backwards through this column
    for ( let y = this.gridModel[position[0]].length; y >=0;  y-- ) {

      // Check if slot has a value yet
      if ( this.gridModel[position[0]][y] === 0 ) {

        // Update color value based on whose turn it is
        this.gridModel[position[0]][y] = this.state.player1 ? 1 : 2 

        // Add the slot position to be colored
        chipPlacement.push( position[0], y );
        
        // End the loop
        break;
      } 
    }

    // Update STATE from previous STATE
    this.setState( prevState => {
      return {
        grid: this.updateGameGrid(),
        player1: !prevState.player1,
      }
    })
  }

  render() {
    
    const status = "Player's turn: " + (this.state.player1 ? 'Red' : 'Black');
    
    return (
      <>
      <header key={1} >{status}</header>
      <section key={2} id="grid">
        { this.state.gameOn ? this.state.grid : <button onClick={ () => this.buildGameGrid() } className="activate">New Game</button> }
        
      </section>
      </>
    )
  }
}
