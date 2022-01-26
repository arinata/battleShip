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
    const shipLocation = [];
    const boardSize = 10;
    const missedShot = [];
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
                        if(locNotOccup(shipLocation,tempLoc)==true){
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
                        if(locNotOccup(shipLocation,tempLoc)==true){
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
    const locNotOccup = (shipLocation,loc) =>{
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
        let isHit = locNotOccup(shipLocation,loc);
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

    return {placeShip,getBoardSize,receiveAttack,isAllSunk,shipLocation};
}

exports.ship = ship;
exports.gameBoard = gameBoard;