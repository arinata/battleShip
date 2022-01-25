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

it('Place one ship crossing another ship horizontally', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'vertical', 5,5,player.getBoardSize());
    expect(player.placeShip(3,'horizontal', 3,7,player.getBoardSize())).toBe("Loc Occupied Horizontal [5,7]")
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
    expect(player.receiveAttack([5,5])).toBe(false);
})

it('Hit a ship at wrong position (2)', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 7,7,player.getBoardSize());
    expect(player.receiveAttack([1,1])).toBe(false);
})

it('Hit a ship until it sunk', () => {
    let player = gameObjects.gameBoard();
    player.placeShip(3,'horizontal', 7,7,player.getBoardSize());
    player.receiveAttack([7,7]);
    player.receiveAttack([8,7]);
    player.receiveAttack([9,7]);
    expect(player.shipLocation[0].shipId.isSunk()).toBe(true);
})