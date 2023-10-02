const { randomBytes, createHmac } = require("crypto");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const moves = process.argv.slice(2);

if (moves.length < 3 || moves.length % 2 === 0) {
  console.error(
    "Please, call the script with an odd number of arguments.\nExample: node index.js Rock Paper Scissors"
  );
  process.exit(1);
} else if (new Set(moves).size !== moves.length) {
  console.error(
    "Please, call the script with non-repeating arguments.\nExample: node index.js A B C D E"
  );
  process.exit(1);
}

// `randomBytes` as implied by it's name accepts a number of bytes, so 32 bytes equals to 256 bits
const secretKey = randomBytes(32).toString("hex");
const cpuMove = Math.floor(Math.random() * moves.length);
console.log(
  `HMAC: ${createHmac("sha3-256", secretKey)
    .update(moves[cpuMove])
    .digest("hex")}`
);

rl.question("Enter your move:", (answer) => {
  console.log(`Your move: ${moves[+answer - 1]}`);
  console.log(`Computer move: ${moves[cpuMove]}`);
  const diff = (+answer - 1 - cpuMove + moves.length) % moves.length;
  if (diff === 0) {
    console.log("It's a draw!");
  } else if (diff <= Math.floor(moves.length / 2)) {
    console.log("You win!");
  } else {
    console.log("You lose!");
  }
  console.log(`HMAC key: ${secretKey}`);
  rl.close();
});
