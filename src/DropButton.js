import React from 'react';

export default function DropButton(props) {
  return (
    <button 
      className={props.className} 
      onClick={props.onClick}
    >
      &#8681;
    </button>
  )
}