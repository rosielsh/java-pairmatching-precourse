import { generateError } from "../utils/generateError.js";

class Matcher {
  #matchStrategy;

  constructor(matchStrategy) {
    this.#matchStrategy = matchStrategy;
  }

  match(matchInfo, crews, history) {
    let retryCount = 0;

    while (retryCount < 3) {
      const shuffledArr = this.#matchStrategy.shuffle(crews);

      const matchedCrews = [];

      const totalLen = shuffledArr.length % 2 === 1 ? shuffledArr.length - 1 : shuffledArr.length;
      for (let i = 0; i < totalLen; i += 2) {
        matchedCrews.push([shuffledArr[i], shuffledArr[i + 1]]);
      }

      if (shuffledArr.length % 2 === 1) matchedCrews[matchedCrews.length - 1].push(shuffledArr[shuffledArr.length - 1]);

      let isExistSameLevel = false;
      for (let crews of matchedCrews) {
        if (history.isPairInSameLevel(matchInfo, crews)) {
          isExistSameLevel = true;
          break;
        }
      }

      if (!isExistSameLevel) return matchedCrews;

      retryCount++;
    }

    if (retryCount === 3) {
      generateError("3회 재시도 이후 매칭이 성사되지 않았습니다.");
    }
  }
}

export default Matcher;
