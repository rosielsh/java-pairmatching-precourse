import { COURSE } from "../constants/Course.js";
import { MISSION } from "../constants/Mission.js";
import { generateError } from "../utils/generateError.js";

class MatchHistory {
  #matchHistory;

  constructor() {
    this.#matchHistory = this.#setMap();
  }

  // 현재 matchInfo에 match 결과 저장
  addHistory(matchInfo, matchResultArr) {
    const [course, level, mission] = matchInfo;
    const resultFindByKey = this.#getByKey(course, level);

    if (resultFindByKey.get(mission) !== null) {
      generateError("이미 매칭 결과가 등록되어 있습니다.");
    }

    const matchResult = new Map();

    for (let res of matchResultArr) {
      // 만약 매칭 정보가 1:1
      if (res.length === 2) {
        matchResult.set(res[0], [res[1]]);
        matchResult.set(res[1], [res[0]]);
      }
      // 매칭이 1:1:1
      else {
        matchResult.set(res[0], [res[1], res[2]]);
        matchResult.set(res[1], [res[0], res[2]]);
        matchResult.set(res[2], [res[0], res[1]]);
      }
    }

    resultFindByKey.set(mission, matchResult);
  }

  resetCurrentResult(matchInfo) {
    const [course, level, mission] = matchInfo;
    const resultFindByKey = this.#getByKey(course, level);

    resultFindByKey.set(mission, null);
  }

  isExistMatchInfo(course, level, mission) {
    const resultFindByMission = this.#getByKey(course, level).get(mission);

    if (resultFindByMission === null) return false;
    return true;
  }

  getMatchHistory(course, level, mission) {
    const matchResult = [];
    const resultFindByMission = this.#getByKey(course, level).get(mission);

    if (resultFindByMission === null) {
      return null;
    }

    const set = new Set();

    for (let [key, value] of resultFindByMission) {
      if (set.has(key)) continue;

      set.add(key);

      for (let pair of value) {
        set.add(pair);
      }

      matchResult.push([key, ...value]);
    }

    return matchResult;
  }

  isPairInSameLevel(matchInfo, crews) {
    const resultFindByKey = this.#getByKey(matchInfo[0], matchInfo[1]);

    for (let [_, pairInfo] of resultFindByKey) {
      if (pairInfo === null) continue;

      // 1:1 페어
      if (crews.length === 2) {
        if (pairInfo.has(crews[0])) {
          const pairs = pairInfo.get(crews[0]);

          if (pairs.includes(crews[1])) return true;
        }
      }

      // 1:1:1 페어
      else {
        if (pairInfo.has(crews[0])) {
          const pairs = pairInfo.get(crews[0]);

          if (pairs.includes(crews[1]) || pairs.includes(crews[2])) return true;
        }
      }
    }

    return false;
  }

  initializeMap() {
    this.#matchHistory = this.#setMap();
  }

  #setMap() {
    const map = new Map();

    for (let course of COURSE) {
      for (let [level, missions] of Object.entries(MISSION)) {
        const subMap = new Map();

        for (let mission of missions) {
          subMap.set(mission, null);
        }

        map.set(`${course}&${level}`, subMap);
      }
    }

    return map;
  }

  #getByKey(course, level) {
    return this.#matchHistory.get(`${course}&${level}`);
  }
}

export default MatchHistory;

// Map(10) {
//   '백엔드&레벨1' => Map(3) { '자동차경주' => null, '로또' => null, '숫자야구게임' => null },
//   '백엔드&레벨2' => Map(3) { '장바구니' => null, '결제' => null, '지하철노선도' => null },
//   '백엔드&레벨3' => Map(0) {},
//   '백엔드&레벨4' => Map(2) { '성능개선' => null, '배포' => null },
//   '백엔드&레벨5' => Map(0) {},
//   '프론트엔드&레벨1' => Map(3) { '자동차경주' => null, '로또' => null, '숫자야구게임' => null },
//   '프론트엔드&레벨2' => Map(3) { '장바구니' => null, '결제' => null, '지하철노선도' => null },
//   '프론트엔드&레벨3' => Map(0) {},
//   '프론트엔드&레벨4' => Map(2) { '성능개선' => null, '배포' => null },
//   '프론트엔드&레벨5' => Map(0) {}
// }
