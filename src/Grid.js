import React from 'react';
import Column from './Column.js';
import Slot from './Slot.js';

const rows = 6;
const columns = 7;
const toWin = 4; // # in a row needed to win

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
  }

  componentDidUpdate() {
//console.log( this.state.grid );
  }

  buildVirtualModel() {
    let newVirtGridModel = [];
    
    for( let x = 0; x < columns; x++ ) {
      
      let newVirtColumn = [];
        
        for( let y = 0; y < rows; y++ ) {
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
    
    for( let a = 0; a < columns; a++ ) {
      
      let newColumn = [];
        
        for( let b = 0; b < rows; b++ ) {
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
    let colorValue;

    // Loop through main gridModel array where x represents the columns.
    for ( let x = 0; x < this.gridModel.length; x++ ) {
      
      // Create empty array to be filled with slots
      let newColumn = []; 
      
      // Loop through each column where y represents the slots
      for( let y = 0; y < this.gridModel[x].length; y++ ) {
        
        // Change slot color by feeding number to Slot switch statement
        switch( this.gridModel[x][y] ) {
          case 1: colorValue = 1; break;
          case 2: colorValue = 2; break;
          default: colorValue = 0;
        }

        newColumn.push( <Slot key={y} color={colorValue} handleDrop={this.handleDrop} position={ [x,y] }></Slot> );
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
    for( let y = this.gridModel[position[0]].length; y >=0;  y-- ) {

      // Check if slot has a value yet
      if( this.gridModel[position[0]][y] === 0 ) {

        // Update color value based on whose turn it is
        this.gridModel[position[0]][y] = this.state.player1 ? 1 : 2 

        // Add the slot position to be colored
        chipPlacement.push( position[0], y );

//console.log(chipPlacement);

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
    
    if ( this.checkWinVertical( chipPlacement, this.state.player1 ? 1 : 2 ) === true ) {
      console.log( (this.state.player1 ? 'Red' : 'Black') + " WINS!" );
    }
  }


checkSlots( maxIndex, index, coord, player ) {

  for( let i = index; i > rows - maxIndex; i-- ) {

    if( coord[i] === player )  {

      // start at 1 b/c that is the newly placed gamepiece
      let consecutive = 1;

console.log("coord[" + i + "] = " + coord[i] + " player = " + player);

      // this will loop through the column array backwards
      for( let j = 1; j < toWin; j++ ) {

        let nextIndex = i - j;

//console.log("nextIndex = " + nextIndex);
      
        if( coord[nextIndex] === player ) {
          // if it's a match than add one
          consecutive++
  
  console.log("consec = " + consecutive);
  
          if( consecutive === toWin ){
            console.log("WINNER");
            return true;
          }          
        }
      }
    } else {
      break;
    }
  }
}

  checkWinVertical( position, player ) {

    let maxIndex = rows - ( rows - toWin ); // greater than this row and a win not possible
    let index = rows-1; // index to search the array starting at bottom of column
    let coord = this.gridModel[position[0]]; // user clicked this column on the x axis

    // loop through the column
    for( let x = 0; x < maxIndex-1; x++ ) {

      // check for winning amount in a row
      this.checkSlots( maxIndex, index, coord, player );
      
      // subtract to move up the column
      index--;
    }
  }

  render() {
    
    const status = "Player's turn: " + (this.state.player1 ? 'Red' : 'Black');
    
    return(
      <>
      <header key={1} >{status}</header>
      <section key={2} id="grid">
        { this.state.gameOn ? this.state.grid : <button onClick={ () => this.buildGameGrid() } className="activate">New Game</button> }
        
      </section>
      </>
    )
  }
}
