// 1. deposit some money
// 2. determine the number of lines to bet on
// 3. collect a bet amount
// 4. spin the slot machine
// 5. check if the user won
// 6. give the user there winning reward
// 7. play again.

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUE = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

const deposit = () => {

    while (true) {

        const depositamount = prompt("Enter a amount to deposit: ");

        const depositnumber = parseFloat(depositamount);

        if (isNaN(depositnumber) || depositnumber <= 0) {
            console.log("Invalid amount try again");
        }
        else {
            return depositnumber;
        }
    }
}

const getlines = () => {

    while (true) {

        const lines = prompt("Enter the number of lines to bet on: ");

        const numberoflines = parseFloat(lines);

        if (isNaN(numberoflines) || numberoflines <= 0 || numberoflines > 3) {
            console.log("Invalid number of lines, try again");
        }
        else {
            return numberoflines;
        }
    }
}

const getbet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the betting amount to bet on per line: ");

        const numberbet = parseFloat(bet);

        if (isNaN(numberbet) || numberbet <= 0 || numberbet > (balance / lines)) {
            console.log("Invalid bet amount, try again")
        }
        else {
            return numberbet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol)
        }
    }

    const reels = [[], [], []];

    for (let i = 0; i < COLS; i++) {
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randonIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randonIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randonIndex, 1);
        }
    }
    return reels;
}


const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";

        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }

        console.log(rowString)
    }
}

// const printRows = (rows) => {
//     for(const row of rows){
//         const rowString = row.join(' | ')
//         console.log(rowString);
//     }
// }

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allsame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allsame = false;
                break;
            }
        }

        if (allsame) {
            winnings += bet * SYMBOL_VALUE[symbols[0]]
        }
    }

    return winnings;
}

const game = () => {
    let balance = deposit();

    while (true) {
        console.log("You have a balance of $" + balance);
        const numberoflines = getlines();
        const numberbet = getbet(balance, numberoflines);
        balance -= numberbet * numberoflines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, numberbet, numberoflines);
        balance += winnings;
        console.log("You won, $" + winnings.toString())

        if(balance <= 0) {
            console.log("You ran out of money");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n) ? ");

        if(playAgain != "y") break;
    }

}

game();


// console.log(rows)
// console.log(reels)
// console.log(rows)

// console.log(balance);
// console.log(numberoflines);
// console.log(numberoflines * numberbet);