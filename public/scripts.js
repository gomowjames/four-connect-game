window.onload = function() {
  let winW = document.documentElement.clientWidth;
  let winH = document.documentElement.clientHeight;
  
console.log( winW + " / " + winH );
  
  let grid = document.getElementById("grid");

console.log(grid.style.width)
  
  grid.style.width = winW;
  grid.style.height = winH;
  
};
