import { Random } from "@woowacourse/mission-utils";

class MatchStrategy {
  static shuffle(crews) {
    return Random.shuffle(crews);
  }
}

export default MatchStrategy;
