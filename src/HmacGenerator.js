import { createHmac } from "crypto";

export default class HmacGenerator {
  constructor(secretKey, message) {
    this.secretKey = secretKey;
    this.message = message;
  }

  generateHmac(hashAlgorithm) {
    const hmac = createHmac(hashAlgorithm, this.secretKey);
    hmac.update(this.message);
    return hmac.digest("hex");
  }
}
