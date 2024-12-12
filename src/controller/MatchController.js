import Converter from "../converter/Converter.js";
import MatchHistory from "../models/MatchHistory.js";
import MatchStrategy from "../models/MatchStrategy.js";
import Matcher from "../models/Matcher.js";
import InputHandler from "../utils/InputHandler.js";
import { generateError } from "../utils/generateError.js";
import { getDataFromFile } from "../utils/getDataFromFile.js";
import FunctionNumberValidator from "../validators/FunctionNumberValidator.js";
import OrderValidator from "../validators/OrderValidator.js";

class MatchController {
  #inputView;
  #outputView;

  constructor({ inputView, outputView }) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  async match() {
    const frontendCrews = (await getDataFromFile("public", "frontend-crew.md")).trim().split(" ");
    const backendCrews = (await getDataFromFile("public", "backend-crew.md")).trim().split(" ");

    const history = new MatchHistory();
    const matcher = new Matcher(MatchStrategy);

    while (true) {
      const functionNumber = await InputHandler.repeatUntilValidInput(
        () => this.#getFunctionNumber(),
        this.#outputView
      );

      if (functionNumber === "Q") break;

      // 페어 매칭
      if (functionNumber === 1) {
        this.#outputView.printOrderInfo();

        let isMatched = false;
        let matchResult;
        let matchInfo;

        while (!isMatched) {
          matchInfo = await InputHandler.repeatUntilValidInput(() => this.#getOrderInfo(), this.#outputView);

          if (history.isExistMatchInfo(...matchInfo)) {
            const answer = await InputHandler.repeatUntilValidInput(() => this.#getRematch(), this.#outputView);

            if (answer === "네") {
              history.resetCurrentResult(matchInfo);

              if (matchInfo[0] === "프론트엔드") {
                matchResult = matcher.match([matchInfo[0], matchInfo[1]], frontendCrews, history);
                isMatched = true;
                continue;
              }

              matchResult = matcher.match([matchInfo[0], matchInfo[1]], backendCrews, history);
              isMatched = true;
              continue;
            }
          }

          if (matchInfo[0] === "프론트엔드") {
            matchResult = matcher.match([matchInfo[0], matchInfo[1]], frontendCrews, history);
            isMatched = true;
            continue;
          }

          matchResult = matcher.match([matchInfo[0], matchInfo[1]], backendCrews, history);
          isMatched = true;
        }

        history.addHistory(matchInfo, matchResult);
        this.#outputView.printMatchResult(matchResult);
        continue;
      }

      // 페어 조회
      if (functionNumber === 2) {
        this.#outputView.printOrderInfo();
        const matchInfo = await InputHandler.repeatUntilValidInput(() => this.#getOrderInfo(), this.#outputView);

        const result = history.getMatchHistory(...matchInfo);

        if (result === null) {
          this.#outputView.printNoMatch();
          continue;
        }

        this.#outputView.printMatchResult(result);
        continue;
      }

      // 페어 초기화
      if (functionNumber === 3) {
        history.initializeMap();
        this.#outputView.printReset();
      }
    }
  }

  async #getFunctionNumber() {
    const functionNumber = await this.#inputView.readFunctionNumber();
    FunctionNumberValidator.validate(functionNumber);
    const convertedFunctionNumber = Converter.convertFunctionInput(functionNumber);
    return convertedFunctionNumber;
  }

  async #getOrderInfo() {
    const orderInfo = await this.#inputView.readOrderInfo();
    const convertedOrder = Converter.convertOrderToArr(orderInfo);
    OrderValidator.validate(...convertedOrder);
    return convertedOrder;
  }

  async #getRematch() {
    const rematch = await this.#inputView.readRematch();

    if (!["네", "아니오"].includes(rematch)) {
      generateError("잘못된 입력입니다.");
    }

    return rematch;
  }
}

export default MatchController;
