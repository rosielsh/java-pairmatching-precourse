import { generateError } from "../utils/generateError.js";

class FunctionNumberValidator {
  static validate(func) {
    this.#validateValue(func);
  }

  static #validateValue(func) {
    const orders = ["1", "2", "3", "Q"];

    if (!orders.includes(func)) {
      generateError("존재하지 않는 기능입니다.");
    }
  }
}

export default FunctionNumberValidator;
