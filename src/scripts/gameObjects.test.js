const { it, expect } = require('@jest/globals');
const gameObjects = require('./gameObjects.js');

it('Test unhit ship to throw false when asked for isSunk()', () => {
    let shipA = gameObjects.ship(4);
    expect(shipA.isSunk()).toBe(false);
})

it('Test ship with length of 1 to be hit at correct position, and should be Sunk', () => {
    let shipA = gameObjects.ship(1);
    shipA.hit();
    expect(shipA.isSunk()).toBe(true);
})

it('Test ship with length of 4 to be hit two times, and should not be Sunk', () => {
    let shipA = gameObjects.ship(4);
    shipA.hit();
    shipA.hit();
    expect(shipA.isSunk()).toBe(false);
})

it('Test ship with length of 4 to be hit four times, and should be Sunk', () => {
    let shipA = gameObjects.ship(4);
    shipA.hit();
    shipA.hit();
    shipA.hit();
    shipA.hit();
    expect(shipA.isSunk()).toBe(true);
})

it('Place one ship on the center of the gameboard', () => {
    let player = gameObjects.gameBoard();
    expect(player.placeShip(3,'horizontal',5,5,player.getBoardSize())).toBe(true);
})

it('Place one ship on the center of the gameboard', () => {
    let player = gameObjects.gameBoard();
    expect(player.placeShip(3,'vertical',6,4,player.getBoardSize())).toBe(true);
})

it('Place one ship on the far left of the gameboard', () => {
    let player = gameObjects.gameBoard();
    expect(player.placeShip(3,'horizontal',9,3,player.getBoardSize())).toBe("Board OverRun X");
})

it('Place one ship on the far bottom of the gameboard', () => {
    let player = gameObjects.gameBoard();
    expect(player.placeShip(3,'vertical',2,10,player.getBoardSize())).toBe("Board OverRun Y");
})

it('Place one ship on top of another ship vertically', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'vertical', 5,5,player.getBoardSize());
    expect(player.placeShip(3,'vertical', 5,5,player.getBoardSize())).toBe("Loc Occupied Vertical [5,5]")
})

it('Place one ship on top of another ship horizontally', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 5,5,player.getBoardSize());
    expect(player.placeShip(3,'horizontal', 5,5,player.getBoardSize())).toBe("Loc Occupied Horizontal [5,5]")
})

it('Place one ship crossing another ship vertically', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 5,5,player.getBoardSize());
    expect(player.placeShip(3,'vertical', 6,3,player.getBoardSize())).toBe("Loc Occupied Vertical [6,5]")
})

it('Place one ship crossing another ship horizontally (1)', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'vertical', 5,5,player.getBoardSize());
    expect(player.placeShip(3,'horizontal', 3,7,player.getBoardSize())).toBe("Loc Occupied Horizontal [5,7]")
})

it('Place one ship crossing another ship horizontally(2)', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(1,'horizontal', 4,6,player.getBoardSize());
    player.placeShip(1,'horizontal', 8,3,player.getBoardSize());
    player.placeShip(1,'horizontal', 6,8,player.getBoardSize());
    player.placeShip(1,'horizontal', 8,8,player.getBoardSize());
    player.placeShip(2,'horizontal', 5,1,player.getBoardSize());
    player.placeShip(2,'horizontal', 1,2,player.getBoardSize());
    player.placeShip(2,'horizontal', 6,2,player.getBoardSize());
    player.placeShip(3,'horizontal', 4,9,player.getBoardSize());
    player.placeShip(3,'horizontal', 8,6,player.getBoardSize());
    expect(player.placeShip(4,'horizontal', 5,3,player.getBoardSize())).toBe("Loc Occupied Horizontal [8,3]")
})

it('Hit a ship at the right position (1)', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'vertical', 5,5,player.getBoardSize());
    expect(player.receiveAttack([5,6])).toBe(true);
})

it('Hit a ship at the right position (2)', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'vertical', 3,8,player.getBoardSize());
    expect(player.receiveAttack([3,10])).toBe(true);
})

it('Hit a ship at wrong position (1)', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'vertical', 3,2,player.getBoardSize());
    expect(player.receiveAttack([5,5])).toStrictEqual([5,5]);
})

it('Hit a ship at wrong position (2)', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 7,7,player.getBoardSize());
    expect(player.receiveAttack([1,1])).toStrictEqual([1,1]);
})

it('Hit a ship until it sunk', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 7,7,player.getBoardSize());
    player.receiveAttack([7,7]);
    player.receiveAttack([8,7]);
    player.receiveAttack([9,7]);
    expect(player.shipLocation[0].shipId.isSunk()).toBe(true);
})

it('Hit a ship 3 times, one of it wil be missed', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 7,7,player.getBoardSize());
    player.receiveAttack([7,7]);
    player.receiveAttack([8,5]);
    player.receiveAttack([9,7]);
    expect(player.shipLocation[0].shipId.isSunk()).toBe(false);
})

it('Hit a ship 6 times, shoot at same location twice', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 7,7,player.getBoardSize());
    player.receiveAttack([7,7]);
    player.receiveAttack([8,7]);
    player.receiveAttack([9,7]);
    player.receiveAttack([7,7]);
    player.receiveAttack([8,7]);
    player.receiveAttack([9,7]);
    expect(player.shipLocation[0].shipId.isSunk()).toBe(true);
})

it('Hit two ship, second ship must be sunk as well', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 7,7,player.getBoardSize());
    player.placeShip(3,'horizontal', 7,2,player.getBoardSize());
    player.receiveAttack([7,7]);
    player.receiveAttack([8,7]);
    player.receiveAttack([9,7]);
    player.receiveAttack([7,2]);
    player.receiveAttack([8,2]);
    player.receiveAttack([9,2]);
    expect(player.shipLocation[1].shipId.isSunk()).toBe(true);
})

it('Check wether all ships are sunk or not. Not all ships are sunk and no ship hitted', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 7,7,player.getBoardSize());
    player.placeShip(3,'horizontal', 1,1,player.getBoardSize());
    expect(player.isAllSunk()).toBe(false);
})

it('Check wether all ships are sunk or not. Not all ships are sunk and one ship has sunk', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 7,7,player.getBoardSize());
    player.placeShip(3,'horizontal', 1,1,player.getBoardSize());
    player.receiveAttack([7,7]);
    player.receiveAttack([8,7]);
    player.receiveAttack([9,7]);
    expect(player.isAllSunk()).toBe(false);
})

it('Check wether all ships are sunk or not. Not all ships are sunk and one ship has sunk', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 5,7,player.getBoardSize());
    player.placeShip(3,'horizontal', 3,1,player.getBoardSize());
    player.receiveAttack([3,1]);
    player.receiveAttack([4,1]);
    player.receiveAttack([5,1]);
    expect(player.isAllSunk()).toBe(false);
})

it('Check wether all ships are sunk or not. All ship have sunk', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 3,1,player.getBoardSize());
    player.receiveAttack([3,1]);
    player.receiveAttack([4,1]);
    player.receiveAttack([5,1]);
    expect(player.isAllSunk()).toBe(true);
})

it('Check wether all ships are sunk or not. All ship have sunk', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 3,1,player.getBoardSize());
    player.placeShip(3,'horizontal', 7,7,player.getBoardSize());
    player.receiveAttack([3,1]);
    player.receiveAttack([4,1]);
    player.receiveAttack([5,1]);
    player.receiveAttack([7,7]);
    player.receiveAttack([8,7]);
    player.receiveAttack([9,7]);
    expect(player.isAllSunk()).toBe(true);
})