import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default class Header extends React.Component {

  updateHeader() {

    switch( this.props.gameStatus ) {
      
      case 0:
        return (
        <header className={`color-${this.props.textColor}`}>
          <Typography variant="h6" pt={1} >{this.props.status}</Typography>
          <Typography variant="h6" id="scorekeep" pt={0}><span className="score color-1">{this.props.scoreRed}</span> – <span className="score color-2">{this.props.scoreBlack}</span></Typography>
        </header>
        )
    
      case 1:
        return (
        <header className={`color-${this.props.color}`}>
          <Typography variant="h2" mb={1}> {`${this.props.winner} wins!`}</Typography>
          <Typography variant="h2" id="scorekeep"><span className="score color-1">{this.props.scoreRed}</span> – <span className="score color-2">{this.props.scoreBlack}</span></Typography>
          {this.props.children}
        </header>
        )  

      case 2:
        return (
        <header className={`color-${this.props.color}`}>
          <Typography variant="h2" mb={1}>Draw! Nobody Wins.</Typography>
          <Typography variant="h2" id="scorekeep"><span className="score color-1">{this.props.scoreRed}</span> – <span className="score color-2">{this.props.scoreBlack}</span></Typography>
          {this.props.children}
        </header>
        )

      default:
        return (
        <header className={`color-${this.props.textColor}`}>
          <Typography variant="h6" pt={1} >{this.props.status}</Typography>
          <Typography variant="h6" id="scorekeep" pt={0}><span className="score color-1">{this.props.scoreRed}</span> – <span className="score color-2">{this.props.scoreBlack}</span></Typography>
        </header>
        )
    }
  }


  render() {
    return this.updateHeader();
  }
}