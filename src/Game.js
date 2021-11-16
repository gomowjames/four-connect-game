import React from 'react';
import Grid from './Grid.js';

export default function Game() {
  return (
    <section id="game">
      <h1>Let's play!</h1>
      <h2>Try to get four in a row horizontally, vertically, or diagonally.</h2>
      
      <Grid />
    </section>
  )
};