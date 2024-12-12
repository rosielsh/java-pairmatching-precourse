import { Console } from "@woowacourse/mission-utils";

class OutputView {
  static printError(message) {
    Console.print(message);
    this.#printEmptyLine();
  }

  static printOrderInfo() {
    Console.print("#############################################");
    Console.print(`과정: 백엔드 | 프론트엔드`);
    Console.print("미션:");
    // 레벨 별 미션 출력
    Console.print("#############################################");
  }

  static printMatchResult(matchResult) {
    Console.print("페어 매칭 결과입니다.\n");
  }

  static printReset() {
    Console.print("초기화 되었습니다.");
  }

  static #printEmptyLine() {
    Console.print("");
  }
}

export default OutputView;
