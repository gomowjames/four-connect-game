import './App.css';

import Game from './Game.js';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme} className="App">
    
      <Game />
    
    </ThemeProvider>
  );
}

export default App;
