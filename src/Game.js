import React, { useState, useEffect } from 'react';
import Grid from './Grid.js';

export default function Game() {

  const [screenSize, getDimension] = useState({
    dynamicWidth: document.documentElement.clientWidth,
    dynamicHeight: document.documentElement.clientHeight - 200
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: document.documentElement.clientWidth,
      dynamicHeight: document.documentElement.clientHeight - 200
    })
  }
  
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])

  return (
    <section id="game">
      <Grid width={screenSize.dynamicWidth} height={screenSize.dynamicWidth}/>
    </section>
  )
};