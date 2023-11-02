const  boxes = document.querySelectorAll(".box");
const  gameInfo = document.querySelector(".game-info");
const  newGameBtn = document.querySelector(".btn");

const xwin = document.querySelector("[data-xwin]");
const ywin = document.querySelector("[data-ywin]");
const nowin = document.querySelector("[data-tie]");

let xwinning =0 ;
let ywinning = 0 ;
let tiematch = 0 ;

let currentPlayer;
let gameGrid;

const winningPosition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
];
// let's create a function for start the game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.innerHTML ="";
        boxes[index].style.pointerEvents = "all";
        // remove winning color
        box.classList = `box box${index + 1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current Player - ${currentPlayer}`;

}
initGame();

boxes.forEach((box, index) =>{
        box.addEventListener("click", () =>{
            handleClick(index);
        })
});
function handleClick(index){
   if(gameGrid[index] === ""){
    boxes[index].innerText = currentPlayer; 
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    // swap turn 
    swapTurn();
    // check  game win
    chechGameOver();
   }
}

function swapTurn(){
    if(currentPlayer === "X")
    currentPlayer = "0";
    else
    currentPlayer ="X"

    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

function chechGameOver(){

    let answer ="";

    winningPosition.forEach((position) => {

        // this if condition show that all 3 boxes should not be and has same value
        if((gameGrid[position[0]] !== "" ||gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && ( gameGrid[position[0]] === gameGrid[position[1]] ) && ( gameGrid[position[1]] === gameGrid[position[2]]) )
        {
            // check winner is x
            if(gameGrid[position[0]] ==="X") answer = "X";
            else answer ="0";

            
            
            // Disable pointer Event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none" 
        })

            // Now we know x/0  is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
       
    });
    if( answer !== "")
    {
    newGameBtn.classList.add("active");
    gameInfo.innerText = `Winner - ${currentPlayer}`;
    if( answer === "X")
        {
            xwinning++; score();
        }
        else if( answer === "0"){
            ywinning++;
            score();
        }
        else{
            tiematch++;
            score();
        }
    return; 
     }
     // let's  check here there is a winnner or not

     let fullcount =0;
     gameGrid.forEach((box) =>{
        if(box !== "")
        fullcount++;
     });
     if( fullcount === 9){
        gameInfo.innerHTML = "Game Tie !";
        newGameBtn.classList.add("active");
     }

}

newGameBtn.addEventListener("click", initGame);

// score board 

    function score()
    {
        xwin.innerHTML = xwinning;
        ywin.innerHTML = ywinning;
        nowin.innerHTML = tiematch;
    }






