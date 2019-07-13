var objImage= null;
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var moreDots, grid1, grid2, state;

state = {
  gamestart: false,
  x: 1,
  y: 1,
  old_x: 1,
  old_y: 1,
  xLen: 0,
  yLen: 0
};

  function init(){
    objImage=document.getElementById("image1");				
    objImage.style.position='absolute';
    objImage.style.left='200px';
    objImage.style.top='0px';
    objImage.style.backgroundColor ='red';
  }
function getKeyAndMove(e){				
  var key_code=e.which||e.keyCode;
  console.log(key_code)
  switch(key_code){
    case 37: //left arrow key
      moveLeft();
      updateInd(state);
      break;
    case 38: //Up arrow key
      moveUp();
      updateInd(state);
      break;
    case 39: //right arrow key
      moveRight();
      updateInd(state);
      break;
    case 40: //down arrow key
      moveDown();
      updateInd(state);
      break;				
      case 81: // press q
      marker();
      break;
    case 84: // pres t
      grid([40,50])
      state.gamestart = true;
      break;
    case 87: // pres w
      eraser();
      break;
    case 192: // `
      marker(state);
      break;
  }
}


function grid(sizeArray){ //create grid size
  // [3,3]
  var xLen = sizeArray[0];
  var yLen = sizeArray[1];
  state.yLen = sizeArray[0];
  state.xLen = sizeArray[1];
  var gridTempCol = '';
  
  for(let g = 0; g < xLen; g++) {
    gridTempCol+='6px ';
  }

  grid1 = document.getElementById('grid1');
  grid2 = document.getElementById('grid2');
  grid1.style.gridTemplateColumns = gridTempCol;
  grid2.style.gridTemplateColumns = gridTempCol;

  grid2.style.top = '100px';
  grid2.style.left = `${w*0.4}px`;
  for(var y = 0; y < yLen; y++) {
    for(var x = 0; x < xLen; x++) {
      grid1.append(createElement('span', `grid-1-${y+1}-${x+1}`));
      grid2.append(createElement('span', `grid-2-${y+1}-${x+1}`));
    }
  }
}

function createElement(elType, id) {
  var el = document.createElement(elType);
  el.id = id;
  el.className = 'dot';
  return el;
}
function dotCreator(element) {
  moreDots = document.getElementById('moreDots');
  moreDots.append(createElement(element));
}

function moveLeft(){
  archivePos();
  if(state.y - 1 > 0) {
    state.y = state.y - 1;
  }
}
function moveUp(){
  archivePos();
  if(state.x - 1 > 0) {
    state.x = state.x - 1;
  }
}
function moveRight(){
  archivePos();
  if(state.y + 1 <= state.yLen) {
    console.log(state.y, state.y - 1, state.yLen)
    state.y = state.y + 1;
  }
}
function moveDown(){
  archivePos();
  if(state.x + 1 <= state.xLen) {
    state.x = state.x + 1;
  }
}
  window.onload=init;

function marker() {
  if(!state.gamestart) {
    return;
  }
  // highlight position 1-1 invoke indicator function
  updateIndicatorPosition(state, 'start');
}

function eraser() {
  currPosition = dotElement(2,state.x, state.y);
  currPosition.classList.remove('red-mark');
}

function updateIndicatorPosition(state, move){
  let currPosition; 
  let newPosition;
  switch(move) {
    case 'start': {
      currPosition = dotElement(2,state.x, state.y);
      currPosition.classList.add('red-mark');
      break;
    }
  }
}


function updateInd(stateObj){
 let oldPos = dotElement(2, stateObj.old_x, stateObj.old_y);
let newPos = dotElement(2, stateObj.x, stateObj.y);

  // oldPos.style.backgroundColor = 'white';
  oldPos.classList.remove('indicator');
  // removes indicator class
  // newPos.style.backgroundColor = 'red';
  newPos.classList.add('indicator');
  // add indicator class
};

function archivePos(){
  state.old_y = state.y
  state.old_x = state.x
}


function dotElement(grid_no, x, y) {
  return document.getElementById(`grid-${grid_no}-${x}-${y}`);
} 