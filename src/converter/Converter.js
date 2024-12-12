class Converter {
  static convertFunctionInput(func) {
    if (func === "Q") return func;
    else return Number(func);
  }

  static convertOrderToArr(order) {
    return order.split(", ");
  }
}

export default Converter;
