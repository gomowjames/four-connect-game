import React from 'react';

export default class Column extends React.Component {

  render() {
    return (
      <div className="column">

{//        <button onClick={this.props.handleClick}>&#8681;</button>
}
        {this.props.column}

      </div>
    )
  }
}