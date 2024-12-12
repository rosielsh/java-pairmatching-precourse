class InputHandler {
  static async repeatUntilValidInput(callback, outputView) {
    try {
      return await callback();
    } catch (error) {
      outputView.printError(error.message);
      return this.repeatUntilValidInput(callback, outputView);
    }
  }
}

export default InputHandler;
