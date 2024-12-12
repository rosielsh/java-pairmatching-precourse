import { Console } from "@woowacourse/mission-utils";
import { MISSION } from "../constants/Mission.js";

class OutputView {
  static printError(message) {
    Console.print(message);
    this.#printEmptyLine();
  }

  static printOrderInfo() {
    Console.print("\n#############################################");
    Console.print(`과정: 백엔드 | 프론트엔드`);
    Console.print("미션:");
    // 레벨 별 미션 출력
    for (let [level, missions] of Object.entries(MISSION)) {
      Console.print(`    - ${level}: ${missions.join(" | ")}`);
    }
    Console.print("#############################################");
  }

  static printMatchResult(matchResult) {
    Console.print("\n페어 매칭 결과입니다.");
    for (let pair of matchResult) {
      Console.print(pair.join(" : "));
    }
    this.#printEmptyLine();
  }

  static printReset() {
    Console.print("\n초기화 되었습니다.\n");
  }

  static #printEmptyLine() {
    Console.print("");
  }
}

export default OutputView;
