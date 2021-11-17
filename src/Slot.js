import React from 'react';

export default function Slot(props) {
  return (
    <button 
      className="slot" 
      onClick={() => props.onClick()}
    >
      {props.value}
      This is a slot.
    </button>
  )
}

/*
export default function Slot(props) {
  return(
    <div className="slot">
      This is a slot.
    </div>
  )
}
*/