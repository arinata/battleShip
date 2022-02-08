import { Player1,Computer,computerAttack,createBoard } from "./gameObjects";

const insertNewElement = (elmntType,elmntId,elmntClass,text,parentElmnt) => {
    const newElmnt = document.createElement(elmntType);
    newElmnt.id = elmntId;
    if(elmntClass!=""){newElmnt.classList.add(elmntClass);}
    newElmnt.textContent = text;
    document.getElementById(parentElmnt).appendChild(newElmnt);
}

const buildGameBoard = (player, parentElmnt, playerBoard, opponentBoard) => {
    for(let i = 0; i<11; i++){
        for(let j = 0; j<11; j++){
            let curLoc = [j,i];
            if(j==0){
                if(i==0){
                    insertNewElement("div", player+"Label", "tilesLabel", "", parentElmnt);
                }
                else if(i==1){
                    insertNewElement("div", player+"Label1", "tilesLabel", "1", parentElmnt);
                }else if(i==2){
                    insertNewElement("div", player+"Label2", "tilesLabel", "2", parentElmnt);
                }else if(i==3){
                    insertNewElement("div", player+"Label3", "tilesLabel", "3", parentElmnt);
                }else if(i==4){
                    insertNewElement("div", player+"Label4", "tilesLabel", "4", parentElmnt);
                }else if(i==5){
                    insertNewElement("div", player+"Label5", "tilesLabel", "5", parentElmnt);
                }else if(i==6){
                    insertNewElement("div", player+"Label6", "tilesLabel", "6", parentElmnt);
                }else if(i==7){
                    insertNewElement("div", player+"Label7", "tilesLabel", "7", parentElmnt);
                }else if(i==8){
                    insertNewElement("div", player+"Label8", "tilesLabel", "8", parentElmnt);
                }else if(i==9){
                    insertNewElement("div", player+"Label9", "tilesLabel", "9", parentElmnt);
                }else if(i==10){
                    insertNewElement("div", player+"Label10", "tilesLabel", "10", parentElmnt);
                }
            }else if(i==0){
                if(j==1){
                    insertNewElement("div", player+"LabelA", "tilesLabel", "A", parentElmnt);
                }else if(j==2){
                    insertNewElement("div", player+"LabelB", "tilesLabel", "B", parentElmnt);
                }else if(j==3){
                    insertNewElement("div", player+"LabelC", "tilesLabel", "C", parentElmnt);
                }else if(j==4){
                    insertNewElement("div", player+"LabelD", "tilesLabel", "D", parentElmnt);
                }else if(j==5){
                    insertNewElement("div", player+"LabelE", "tilesLabel", "E", parentElmnt);
                }else if(j==6){
                    insertNewElement("div", player+"LabelF", "tilesLabel", "F", parentElmnt);
                }else if(j==7){
                    insertNewElement("div", player+"LabelG", "tilesLabel", "G", parentElmnt);
                }else if(j==8){
                    insertNewElement("div", player+"LabelH", "tilesLabel", "H", parentElmnt);
                }else if(j==9){
                    insertNewElement("div", player+"LabelI", "tilesLabel", "I", parentElmnt);
                }else if(j==10){
                    insertNewElement("div", player+"LabelJ", "tilesLabel", "J", parentElmnt);
                }
            }
            else {
                if(playerBoard.board.locNotOccup(curLoc)===true){
                    insertNewElement("div", player+"Tile"+(j-1)+(i-1), "tiles", "", parentElmnt);
                }else{
                    insertNewElement("div", player+"Tile"+(j-1)+(i-1), "tilesOccup", "", parentElmnt);
                }
                document.getElementById(player+"Tile"+(j-1)+(i-1)).addEventListener('click',function(){
                    if(playerBoard.board.isTurn()){
                        let tile = document.getElementById(player+"Tile"+(j-1)+(i-1));
                        if((tile.classList == "tiles")||(tile.classList == "tilesOccup")){
                            let hitStat = playerBoard.board.receiveAttack(curLoc);
                            if(hitStat===true){
                                tile.classList = "shipHit fas fa-times";
                            }else{
                                tile.classList = "missedHit fas fa-times";
                            }
                        }
                        //set turn for the other player
                        playerBoard.board.setTurn();
                        //check if game is finished
                        if(playerBoard.board.isAllSunk()){

                        }else{
                            opponentBoard.board.setTurn();
                        }
                    }else{

                    }
                })
            }
        }
    }
}

export {buildGameBoard};