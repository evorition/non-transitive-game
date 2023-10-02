export default class Rules {
  constructor(moves) {
    this.movesLength = moves.length;
  }

  decideWinner(cpuMove, humanMove) {
    const diff = (humanMove - cpuMove + this.movesLength) % this.movesLength;
    if (diff === 0) {
      return "Draw";
    } else if (diff <= Math.floor(this.movesLength / 2)) {
      return "Win";
    } else {
      return "Lose";
    }
  }
}
