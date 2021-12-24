import React from 'react';
import Column from './Column.js';
import Slot from './Slot.js';
import Header from './Header.js';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const xAxis = 7;
const yAxis = 6;
const toWin = 4; // # in a row needed to win
let scoreRed = 0;
let scoreBlack = 0;

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    
    this.gridModel = [];
    this.state = {
      gameOn: false,
      gameStatus: 0, // 0 = "active" / 1 = "game has been won" / 2 = "game is a draw"
      chipCounter: 0,
      winner: 0,
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
      gameStatus: 0,
      chipCounter: 1,
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
    if ( this.state.gameStatus === 0 ) {
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
    
          // End the loop
          break;
        } 
      }
  
      // Update STATE from previous STATE
      this.setState( prevState => {
        return {
          grid: this.updateGameGrid(),
          player1: !prevState.player1,
          chipCounter: prevState.chipCounter + 1,
        }
      })

      // Check for winner and check for a draw
      if(
          this.checkWinVertical( chipPlacement, this.state.player1 ? 1 : 2 ) === true ||
          this.checkWinHorizontal( chipPlacement, this.state.player1 ? 1 : 2 ) === true ||
          this.checkWinDiagDown( chipPlacement, this.state.player1 ? 1 : 2 ) === true ||
          this.checkWinDiagUp( chipPlacement, this.state.player1 ? 1 : 2 ) === true
        ) {
          this.showWinner( this.state.player1 );
        } else if( this.state.chipCounter >= ( xAxis * yAxis ) ) {
          this.handleDraw();
      }
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
    let winner = player ? 'Red' : 'Black';
    let winningColor = player ? 1 : 2;
    
    if( winningColor === 1 ) {
      scoreRed += 1;
    } else {
      scoreBlack += 1;
    }
  
    this.setState({
      gameStatus: 1,
      winner: winner,
      color: winningColor,
    })
  }
  
  // End game if all spaces are filled with no winner
  handleDraw() {
    this.setState({
      gameStatus: 2,
      color: 3,
    })  
  }

  render() {
    
    const status = (this.state.player1 ? "Red's " : "Black's ") + " turn";
    const textColor = (this.state.player1 ? 1 : 2)
    
    return(
      <>
      { this.state.gameOn ?

        <section>
          <Header
            status={status}
            textColor={textColor}
            scoreRed={scoreRed}
            scoreBlack={scoreBlack}
            winner={this.state.winner}
            color={this.state.color}
            gameStatus={this.state.gameStatus}
          >
            { this.state.gameStatus === 1 || this.state.gameStatus === 2 ?
              <div className={`color-${this.textColor}`} >
                <Button variant="contained" size="large" color="primary" sx={{ mt: 1, mb:2, border:1, bgcolor:"transparent" }} onClick={ () => this.buildGameGrid() } >Start New Game</Button>
              </div>
              : null
            }
          </Header>
  
          <div key={2} id="grid" style={{width: this.props.width + 'px', height: this.props.height + 'px' }}>
            { this.state.grid }
          </div>
        </section>
      :
        <section key={2} id="grid" style={{width: this.props.width + 'px', height: this.props.height + 'px' }}>  
          <header>
            <Typography variant="h2">Classic Connect Four!</Typography>
            <Typography variant="h6" mb={2}>Try to get four in a row horizontally, vertically, or diagonally.</Typography>
            <Button variant="contained" size="large" color="primary" onClick={ () => this.buildGameGrid() } className="">Start New Game</Button>
          </header>
        </section>        
      }
      </>
    )
  }
}
