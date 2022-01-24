const { it, expect } = require('@jest/globals');
const gameObjects = require('./gameObjects.js');

it('Test unhit ship to throw false when asked for isSunk()', () => {
    let shipA = gameObjects.ship(4);
    expect(shipA.isSunk()).toBe(false);
})

it('Test ship with length of 1 to be hit at correct position, and should be Sunk', () => {
    let shipA = gameObjects.ship(1);
    shipA.hit(1);
    expect(shipA.isSunk()).toBe(true);
})

it('Test ship with length of 1 to be hit at wrong position (positive delta), and should not be Sunk', () => {
    let shipA = gameObjects.ship(1);
    shipA.hit(2);
    expect(shipA.isSunk()).toBe(false);
})

it('Test ship with length of 1 to be hit at wrong position (negative delta), and should not be Sunk', () => {
    let shipA = gameObjects.ship(1);
    shipA.hit(0);
    expect(shipA.isSunk()).toBe(false);
})

it('Test ship with length of 4 to be hit two times, and should not be Sunk', () => {
    let shipA = gameObjects.ship(4);
    shipA.hit(1);
    shipA.hit(3);
    expect(shipA.isSunk()).toBe(false);
})

it('Test ship with length of 4 to be hit four times, and should be Sunk', () => {
    let shipA = gameObjects.ship(4);
    shipA.hit(1);
    shipA.hit(3);
    shipA.hit(2);
    shipA.hit(4);
    expect(shipA.isSunk()).toBe(true);
})

it('Place one ship on the center of the gameboard', () => {
    let player = gameObjects.gameBoard();
    expect(player.placeShip(3,'horizontal',5,5)).toBe(true);
})

it('Place one ship on the center of the gameboard', () => {
    let player = gameObjects.gameBoard();
    expect(player.placeShip(3,'vertical',6,4)).toBe(true);
})

it('Place one ship on the far left of the gameboard', () => {
    let player = gameObjects.gameBoard();
    expect(player.placeShip(3,'horizontal',9,3)).toBe("Board OverRun X");
})

it('Place one ship on the far bottom of the gameboard', () => {
    let player = gameObjects.gameBoard();
    expect(player.placeShip(3,'vertical',2,10)).toBe("Board OverRun Y");
})