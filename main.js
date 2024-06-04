const header = document.querySelector(".page-title"); 
const startGame = document.querySelector(".start-game"); 
const board = document.querySelector(".board"); 
const decision = document.createElement("p"); 
let matrix = []; 

function generateBoard(){
    const displayBoard = board.setAttribute("data-start", "true"); 
    for(let rows = 0; rows < 3; rows++){
        let matrixItem = {}; 
        for(let cols = 0; cols < 3; cols++){
            const boardItem = document.createElement("button"); 
            boardItem.setAttribute("data-position", `${rows}-${cols}`);
            matrixItem[`${rows}-${cols}`] = ""; 
            board.appendChild(boardItem); 
        }
        matrix.push(matrixItem);
    }
    startGame.remove();  
}


function determinePlayer(event){
    let turns = 0; 
    let player_one = true; 
    let player_two = false; 
    let currentPlayer = "X"; 
    
    board.addEventListener("click", (event) =>{
        event.stopPropagation(); 
        const currPosition = event.target.getAttribute("data-position");
        if(currPosition !== null){

            if(player_one && matrix[`${currPosition}`] !== "o"){
                event.target.style.backgroundImage = "url(images/user-x.svg)"; 
                matrix[`${currPosition}`] = "x"; 
                currentPlayer = "X"; 
                player_two = true; 
                player_one = false; 
                turns++; 
            }else if(player_two && matrix[`${currPosition}`] !== "x"){
                event.target.style.backgroundImage = "url(images/user-o.svg)"; 
                matrix[`${currPosition}`] = "o";
                player_two = false; 
                player_one = true; 
                currentPlayer = "O"; 
                turns++; 

            }
        }

        console.log(turns); 

        const player = determineWinner(currentPlayer); 
        if(player){
            const buttons = document.querySelectorAll(".board > *");
            for(let btn of buttons){
                btn.disabled = true; 
            } 
            decision.textContent = `The winner is ${currentPlayer}`;
            header.appendChild(decision);  
        }else if(!player && turns === 9){ 
            const buttons = document.querySelectorAll(".board > *");
            for(let btn of buttons){
                btn.disabled = true; 
            } 
            decision.textContent = "It is a draw";
            header.appendChild(decision);
        }
    })    
}

function determineWinner(currentPlayer){

    if(matrix["0-0"] === "o" && matrix["0-1"] === "o" && matrix["0-2"] === "o" ||
        matrix["0-0"] === "x" && matrix["0-1"] === "x" && matrix["0-2"] === "x"){
        return true; 
    }

    if(matrix["1-0"] === "o" && matrix["1-1"] === "o" && matrix["1-2"] === "o" ||
    matrix["1-0"] === "x" && matrix["1-1"] === "x" && matrix["1-2"] === "x"){
        return true; 
    } 
    
    if(matrix["2-0"] === "o" && matrix["2-1"] === "o" && matrix["2-2"] === "o" ||
    matrix["2-0"] === "x" && matrix["2-1"] === "x" && matrix["2-2"] === "x"){
        return true; 
    }

    if(matrix["0-0"] === "o" && matrix["1-0"] === "o" && matrix["2-0"] === "o" ||
    matrix["0-0"] === "x" && matrix["1-0"] === "x" && matrix["2-0"] === "x"){
        return true; 
    }

    if(matrix["0-1"] === "o" && matrix["1-1"] === "o" && matrix["2-1"] === "o" ||
    matrix["0-1"] === "x" && matrix["1-1"] === "x" && matrix["2-1"] === "x"){
        return true; 
    }

    if(matrix["0-2"] === "o" && matrix["1-2"] === "o" && matrix["2-2"] === "o" ||
    matrix["2-0"] === "x" && matrix["2-1"] === "x" && matrix["2-2"] === "x"){
        return true; 
    }

    if(matrix["0-0"] === "o" && matrix["1-1"] === "o" && matrix["2-2"] === "o" ||
    matrix["0-0"] === "x" && matrix["1-1"] === "x" && matrix["2-2"] === "x"){
        return true; 
    }

    if(matrix["0-2"] === "o" && matrix["1-1"] === "o" && matrix["2-0"] === "o" ||
    matrix["0-2"] === "x" && matrix["1-1"] === "x" && matrix["2-0"] === "x"){
        return true; 
    }
    
    return false; 

}



startGame.addEventListener("click", generateBoard);
determinePlayer(); 

