const insertNewElement = (elmntType,elmntId,elmntClass,text,parentElmnt) => {
    const newElmnt = document.createElement(elmntType);
    newElmnt.id = elmntId;
    if(elmntClass!=""){newElmnt.classList.add(elmntClass);}
    newElmnt.textContent = text;
    document.getElementById(parentElmnt).appendChild(newElmnt);
}

const buildGameBoard = (player, parentElmnt) => {
    for(let i = 0; i<10; i++){
        for(let j = 0; j<10; j++){
            insertNewElement("div", player+"Tile"+i+j, "tiles", "", parentElmnt);
        }
    }
}

export {buildGameBoard};