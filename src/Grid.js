import React from 'react';
import Slot from './Slot';

export default function Grid() {
  
  function drawSlot(i) {
    return(
      <Slot />
    );
  }
  
  return(
    <section id="grid">
      <div className="column">
        <button className="selector">&#8681;</button>
        {drawSlot(1)}
        {drawSlot(2)}
        {drawSlot(3)}
        {drawSlot(4)}
        {drawSlot(5)}
        {drawSlot(6)}
      </div>
      <div className="column">
        <button className="selector">&#8681;</button>
        {drawSlot(7)}
        {drawSlot(8)}
        {drawSlot(9)}
        {drawSlot(10)}
        {drawSlot(11)}
        {drawSlot(12)}
      </div>
      <div className="column">
        <button className="selector">&#8681;</button>
        {drawSlot(13)}
        {drawSlot(14)}
        {drawSlot(15)}
        {drawSlot(16)}
        {drawSlot(17)}
        {drawSlot(18)}
      </div>
      <div className="column">
        <button className="selector">&#8681;</button>
        {drawSlot(19)}
        {drawSlot(20)}
        {drawSlot(21)}
        {drawSlot(22)}
        {drawSlot(23)}
        {drawSlot(24)}
      </div>
      <div className="column">
        <button className="selector">&#8681;</button>
        {drawSlot(25)}
        {drawSlot(26)}
        {drawSlot(27)}
        {drawSlot(28)}
        {drawSlot(29)}
        {drawSlot(30)}
      </div>
      <div className="column">
        <button className="selector">&#8681;</button>
        {drawSlot(31)}
        {drawSlot(32)}
        {drawSlot(33)}
        {drawSlot(34)}
        {drawSlot(35)}
        {drawSlot(36)}
      </div>
      <div className="column">
        <button className="selector">&#8681;</button>
        {drawSlot(37)}
        {drawSlot(38)}
        {drawSlot(39)}
        {drawSlot(40)}
        {drawSlot(41)}
        {drawSlot(42)}
      </div>
    </section>
  )
}