const ship = (length) => {
    let shipLength = length;
    let partHitted = 0;
    const hit = () => {
        if(partHitted==shipLength){
            return false;
        }else {
            partHitted++;
            return true;
        }
    }
    const isSunk = () =>{
        if(shipLength==partHitted){
            return true;
        }else{
            return false;
        }
    }
    const getPartHitted = () => {
        return partHitted
    }
    return {hit,isSunk,getPartHitted};
}

const gameBoard = () => {
    var shipLocation = [];
    const boardSize = 10;
    var missedShot = [];
    var turn = false;
    const isTurn = () => {
        return turn;
    }
    const setTurn = () => {
        turn = turn ? false : true;
        return turn;
    }
    const getBoardSize = () => {
        return boardSize;
    }
    const placeShip = (shipLength,orientation,startCoordinateX,startCoordinateY,size) => {
        let boardSize = size + 1;
        if(((startCoordinateX>0)&&(startCoordinateX<boardSize))&&((startCoordinateY>0)&&(startCoordinateY<boardSize))){
            let loc = [];
            if(orientation=="horizontal"){
                if(startCoordinateX>(boardSize-shipLength)){
                    return "Board OverRun X";
                }else{
                    for(let i = 0; i<shipLength; i++){
                        let tempLoc = [startCoordinateX+i, startCoordinateY];
                        if(locNotOccup(tempLoc)===true){
                            loc.push(tempLoc);
                        }else{
                            return "Loc Occupied Horizontal ["+tempLoc+"]";
                        }
                    }
                }
            }else if(orientation=="vertical"){
                if(startCoordinateY>(boardSize-shipLength)){
                    return "Board OverRun Y";
                }else{
                    for(let i = 0; i<shipLength; i++){
                        let tempLoc = [startCoordinateX, startCoordinateY+i];
                        if(locNotOccup(tempLoc)===true){
                            loc.push(tempLoc);
                        }else{
                            return "Loc Occupied Vertical ["+tempLoc+"]";
                        }
                    }
                }
            }
            let shipObj = {location: loc, shipId: ship(shipLength)};
            shipLocation.push(shipObj);
            return true;
        }else{
            return false;
        }
    }
    const locNotOccup = (loc) =>{
        for(let i = 0; i<shipLocation.length; i++){
            for(let j = 0; j<shipLocation[i].location.length; j++){
                if((shipLocation[i].location[j][0]==loc[0])&&(shipLocation[i].location[j][1]==loc[1])){
                    return i;
                }
            }
        }
        return true;
        
    }
    const receiveAttack = (loc) => {
        let isHit = locNotOccup(loc);
        if(isHit===true){
            missedShot.push(loc);
            return loc;
        }else{
            shipLocation[isHit].shipId.hit(loc);
            return true;
        }
    }

    const isAllSunk = () => {
        for(let i = 0; i<shipLocation.length; i++){
            if(!shipLocation[i].shipId.isSunk()){
                return false;
            }
        }
        return true;
    }

    const placeCompShip = () => {
        let shipList = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
        for(let i = 0; i<shipList.length; i++){
            let x = Math.floor(Math.random()*10+1);
            let y = Math.floor(Math.random()*10+1);
            let placed = placeShip(shipList[i],"horizontal",x,y,boardSize);
            console.log("urutan: "+i+"||X: "+x+"||Y: "+y+"||overlap: "+placed);
            if(placed!=true){
                i--;
            }
        }
    }

    return {isTurn,setTurn,placeShip,getBoardSize,receiveAttack,isAllSunk,locNotOccup,placeCompShip,shipLocation,missedShot};
}

const createBoard = (boardSize) => {
    let board = [];
    let size = boardSize+1;
    for(let i = 1; i<size; i++){
        for(let j = 1; j<size; j++){
            board.push([i,j]);
        }
    }
    return board;
}

const Player1 = {board: gameBoard()}
const Computer = {board: gameBoard(),
                  attackList: [],
                  freeLoc: []    
                }

const computerAttack = (attackList,freeLoc) => {
    let attackIndex = Math.floor(Math.random() * freeLoc.length);
    let attackLoc = freeLoc[attackIndex];
    attackList.push(attackLoc);
    freeLoc.splice(attackIndex,1);
    return attackLoc;
}

exports.ship = ship;
exports.gameBoard = gameBoard;
exports.computerAttack = computerAttack;
exports.createBoard = createBoard;
exports.Player1 = Player1;
exports.Computer = Computer;