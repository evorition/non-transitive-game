import { randomBytes } from "crypto";

export default class Key {
  #secretKey;
  constructor() {
    this.#secretKey = randomBytes(32).toString("hex");
  }

  get secretKey() {
    return this.#secretKey;
  }
}
