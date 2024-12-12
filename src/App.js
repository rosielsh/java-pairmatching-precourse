import MatchController from "./controller/MatchController.js";
import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";

class App {
  async run() {
    const views = {
      inputView: InputView,
      outputView: OutputView,
    };

    await new MatchController(views).match();
  }
}

export default App;
