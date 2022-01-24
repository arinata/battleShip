const ship = (length) => {
    let shipLength = length;
    let partHitted = [];
    const hit = (hitPart) => {
        if(partHitted.length==shipLength){
            return false;
        }else if((hitPart>0)&&(hitPart<=shipLength)){
            let isHitted = partHitted.find(checkHit = (part) => {return part == hitPart});
            if(isHitted == undefined){
                partHitted.push(hitPart);
            }else{
                false;
            }
        }
    }
    const isSunk = () =>{
        if((shipLength-partHitted.length)==0){
            return true;
        }else{
            return false;
        }
    }
    return {hit,isSunk};
}

const gameBoard = () => {
    let shipLocation = [];
    const boardSize = 10;
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
                        if(locNotOccup(shipLocation,tempLoc)){
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
                        if(locNotOccup(shipLocation,tempLoc)){
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
        shipLocation.forEach(element => {
            let isOccuppied = element.location.find(checkOcc = (part) => {return part == loc});
            if(isOccuppied != undefined){
                return false;
            }
        });
        return true;
    }
    const receiveAttack = (loc) => {
        
    }
    return {placeShip,getBoardSize};
}

exports.ship = ship;
exports.gameBoard = gameBoard;