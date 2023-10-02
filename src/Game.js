import readline from "readline";

import Key from "./Key.js";
import HmacGenerator from "./HmacGenerator.js";
import Rules from "./Rules.js";

export default class Game {
  constructor() {
    this.moves = process.argv.slice(2);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  validateMoves() {
    const movesLength = this.moves.length;
    if (movesLength < 3 || movesLength % 2 === 0) {
      console.error(
        "Please, call the script with an odd number of arguments.\nExample: node index.js Rock Paper Scissors"
      );
      process.exit(1);
    } else if (new Set(this.moves).size !== movesLength) {
      console.error(
        "Please, call the script with non-repeating arguments.\nExample: node index.js A B C D E"
      );
      process.exit(1);
    }
  }

  makeMove() {
    return Math.floor(Math.random() * this.moves.length);
  }

  async getUserInput() {
    return new Promise((resolve) => {
      this.rl.question("Enter your move: ", (userMove) => {
        resolve(userMove);
      });
    });
  }

  showMenu() {
    console.log("Available moves:");
    this.moves.forEach((item, index) => {
      console.log(`${index + 1} - ${item}`);
    });
    console.log("0 - exit");
    console.log("? - help");
  }

  async start() {
    this.validateMoves();

    const keyInstance = new Key();
    const secretKey = keyInstance.secretKey;

    this.cpuIndex = this.makeMove();

    const hmacGenerator = new HmacGenerator(
      secretKey,
      this.moves[this.cpuIndex]
    );
    const hmac = hmacGenerator.generateHmac("sha3-256");
    console.log(`HMAC: ${hmac}`);

    let userIndex;

    this.showMenu();

    do {
      const userMove = await this.getUserInput();

      if (userMove === "0") {
        console.log("Exiting the game.");
        this.rl.close();
        process.exit(0);
      } else if (userMove === "?") {
        // TODO: Show table
      } else {
        userIndex = parseInt(userMove, 10) - 1;
        if (
          isNaN(userIndex) ||
          userIndex < 0 ||
          userIndex >= this.moves.length
        ) {
          console.log(
            "Invalid input. Please choose one of the available options below."
          );
          userIndex = -1;
          this.showMenu();
        }
      }
    } while (userIndex === -1);

    console.log(`Your move: ${this.moves[userIndex]}`);
    console.log(`Computer move: ${this.moves[this.cpuIndex]}`);

    const rules = new Rules(this.moves);
    const result = rules.decideWinner(this.cpuIndex, userIndex);

    console.log(result);
    console.log(`HMAC key: ${secretKey}`);

    this.rl.close();
  }
}
