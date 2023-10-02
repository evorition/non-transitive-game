import { table } from "table";

import Rules from "./Rules.js";

export default class Table {
  constructor(moves) {
    this.moves = [...moves];
    this.rules = new Rules(moves);
    this.table = [];
  }

  fillHeader() {
    this.table.push(["v PC\\User >"]);
    for (let i = 0; i < this.moves.length; ++i) {
      this.table[0].push(this.moves[i]);
    }
  }

  fillTable() {
    for (let i = 0; i < this.moves.length; ++i) {
      this.table.push([this.moves[i]]);
      for (let j = 0; j < this.moves.length; ++j) {
        this.table[i + 1].push(this.rules.decideWinner(i, j));
      }
    }
  }

  showTable() {
    this.fillHeader();
    this.fillTable();
    console.log(table(this.table));
  }
}
