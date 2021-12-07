import React from 'react';
import Column from './Column.js';
import Slot from './Slot.js';

const xAxis = 7;
const yAxis = 6;
const toWin = 4; // # in a row needed to win
let winner = false;

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
    
    for( let x = 0; x < xAxis; x++ ) {
      
      let newVirtColumn = [];
        
        for( let y = 0; y < yAxis; y++ ) {
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
    
    for( let a = 0; a < xAxis; a++ ) {
      
      let newColumn = [];
        
        for( let b = 0; b < yAxis; b++ ) {
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

    // Loop through main gridModel array where x represents the xAxis.
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

    if( this.checkWinVertical( chipPlacement, this.state.player1 ? 1 : 2 ) === true ) {
      this.showWinner(this.state.player1 ? 'Red' : 'Black');
      console.log( (this.state.player1 ? 'Red' : 'Black') + " WINS!" );
    } else if ( this.checkWinHorizontal( chipPlacement, this.state.player1 ? 1 : 2 ) === true ) {
      this.showWinner(this.state.player1 ? 'Red' : 'Black');
      console.log( (this.state.player1 ? 'Red' : 'Black') + " WINS!" );
    } else if ( this.checkWinDiagDown( chipPlacement, this.state.player1 ? 1 : 2 ) === true ) {
      this.showWinner(this.state.player1 ? 'Red' : 'Black');
      console.log( (this.state.player1 ? 'Red' : 'Black') + " WINS!" );
    } else if ( this.checkWinDiagUp( chipPlacement, this.state.player1 ? 1 : 2 ) === true ) {
      this.showWinner(this.state.player1 ? 'Red' : 'Black');
      console.log( (this.state.player1 ? 'Red' : 'Black') + " WINS!" );
    }
  }

checkWinVertical( position, player ) {

  let diffTotal = 0; // represents slots below of played position
  
  while(true) {
    if( position[1] + diffTotal + 1 === yAxis ) {
      break;
    }
    diffTotal += 1;    
  }
  
  let countdown = 0;
  let consecutive = 0;
  
  while(true) {

    if( this.gridModel[position[0]][position[1] + diffTotal - countdown] === player ) {

      consecutive += 1;

      console.log("vert consec = " + consecutive);

      if( consecutive === toWin ) {
        return true;
      }

    } else {
      consecutive = 0;
    }

    // -1 represents end of array so break or else crash
    if( position[1] + diffTotal - ( countdown + 1 ) === -1 ) {
      break;
    }
    
    countdown += 1;
  }

  return false;
}

checkWinHorizontal( position, player ) {
  let diffTotal = 0; // represents slots right of played position
  
  while(true) {
    if( position[0] + diffTotal + 1 === xAxis ) {
      break;
    }
    diffTotal += 1;
  }

  let countdown = 0;
  let consecutive = 0;

  while(true) {

    if( this.gridModel[position[0] + diffTotal - countdown][position[1]] === player ) {

      consecutive += 1;

      console.log("horiz consec = " + consecutive);

      if( consecutive === toWin ) {
        return true;
      }

    } else {
      consecutive = 0;
    }
    
    // -1 represents end of array so break or else crash
    if( position[0] + diffTotal - ( countdown + 1 ) === -1 ) {
      break;
    }
    
    countdown += 1;
  }
  
  return false;
}

checkWinDiagDown( position, player ) {
  let diffTotal = 0; // represents slots right of played position
  
  while(true) {
    if( position[0] + diffTotal + 1 === xAxis ) {
      break;
    } else if( position[1] + diffTotal + 1 === yAxis) {
      break;
    }
    
    diffTotal += 1;
  }

  let countdown = 0;
  let consecutive = 0;

  while(true) {

      if( this.gridModel[position[0] + diffTotal - countdown][position[1] + diffTotal - countdown] === player ) {
  
        consecutive += 1;
  
        console.log("diag consec = " + consecutive);
  
        if( consecutive === toWin ) {
          return true;
        }
  
      } else {
        consecutive = 0;
      }


    // -1 represents end of array so break or else crash
    if( position[0] + diffTotal - ( countdown + 1 ) === -1 ) {
      break;
    } else if( position[1] + diffTotal - ( countdown + 1 ) === -1 ) {
      break;
    }
    
    countdown += 1;
  }
  
  return false;
}

checkWinDiagUp( position, player ) {
  let diffTotal = 0;
  
  while(true) {
    if( position[0] + diffTotal + 1 === xAxis ) {
      break;
    } else if( position[1] - diffTotal - 1 === -1 ) {
      break;
    }
    
    diffTotal += 1;
  }

  let countdown = 0;
  let consecutive = 0;

  while(true) {

      if( this.gridModel[position[0] + diffTotal - countdown][position[1] - diffTotal + countdown] === player ) {
  
        consecutive += 1;
  
        if( consecutive === toWin ) {
          return true;
        }
  
      } else {
        consecutive = 0;
      }

    // -1 represents end of array so break or else crash
    if( position[0] + diffTotal - ( countdown + 1 ) === -1 ) {
      break;
    } else if( position[1] - diffTotal + ( countdown + 1 ) === yAxis ) {
      break;
    }    
    countdown += 1;
  }
  
  return false;
}

showWinner( player ) {
  this.setState({
    grid: <div><div className="winner">{`${player} wins!`}</div><button onClick={ () => this.buildGameGrid() } className="activate">New Game</button></div>
  })
}

  render() {
    
    const status = "Player's turn: " + (this.state.player1 ? 'Red' : 'Black');
    
    return(
      <>      

      { this.state.gameOn ? <header>{status}</header> : null  }

      <section key={2} id="grid" style={{width: this.props.width + 'px', height: this.props.height + 'px' }}>

      { this.state.gameOn ? this.state.grid : 
        <header>
          <h1>Get 4 in Row!</h1>
          <h2>Try to get four in a row horizontally, vertically, or diagonally.</h2>
          <button onClick={ () => this.buildGameGrid() } className="activate">New Game</button>
        </header>
      }
        
      </section>
      </>
    )
  }
}
