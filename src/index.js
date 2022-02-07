import { Player1,Computer,computerAttack,createBoard } from "./scripts/gameObjects";
import { buildGameBoard } from "./scripts/pageBuilder";
import "./styles/gameBoard.css"

document.getElementById("contentArea").classList.add("contentArea");
document.getElementById("gameBoard1").classList.add("gameBoard");
//document.getElementById("shipBoard").classList.add("gameBoard");
document.getElementById("gameBoard2").classList.add("gameBoard");

const boardSize = 10;

//Initialize ship position for testing purposes
Player1.board.placeShip(1,"horizontal",2,1,boardSize);
Player1.board.placeShip(1,"vertical",3,3,boardSize);
Player1.board.placeShip(1,"horizontal",6,9,boardSize);
Player1.board.placeShip(1,"vertical",9,9,boardSize);
Player1.board.placeShip(2,"horizontal",5,2,boardSize);
Player1.board.placeShip(2,"vertical",8,6,boardSize);
Player1.board.placeShip(2,"horizontal",9,1,boardSize);
Player1.board.placeShip(3,"vertical",3,7,boardSize);
Player1.board.placeShip(3,"vertical",10,3,boardSize);
Player1.board.placeShip(4,"horizontal",2,5,boardSize);

Computer.board.placeShip(4,"vertical",1,1,boardSize);
Computer.board.placeShip(3,"horizontal",2,6,boardSize);
Computer.board.placeShip(3,"horizontal",8,9,boardSize);
Computer.board.placeShip(2,"horizontal",3,3,boardSize);
Computer.board.placeShip(2,"vertical",4,8,boardSize);
Computer.board.placeShip(2,"vertical",8,2,boardSize);
Computer.board.placeShip(1,"vertical",6,2,boardSize);
Computer.board.placeShip(1,"vertical",6,8,boardSize);
Computer.board.placeShip(1,"vertical",7,5,boardSize);
Computer.board.placeShip(1,"vertical",8,7,boardSize);


//Set up page visualization and layout
buildGameBoard("player1","gameBoard1",Player1,Computer);
buildGameBoard("cmputer","gameBoard2",Computer,Player1);
Player1.board.setTurn();
