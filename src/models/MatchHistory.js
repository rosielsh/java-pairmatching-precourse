import { COURSE } from "../constants/Course.js";
import { MISSION } from "../constants/Mission.js";
import { generateError } from "../utils/generateError.js";

class MatchHistory {
  #matchHistory;

  constructor() {
    this.#matchHistory = this.#setMap();
  }

  // 현재 matchInfo에 match 결과 저장
  addHistory(matchInfo, matchResult) {
    const [course, level, mission] = matchInfo;
    const resultFindByKey = this.#getByKey(course, level);

    if (resultFindByKey.get(mission) !== null) {
      generateError("이미 매칭 결과가 등록되어 있습니다.");
    }

    resultFindByKey.set(mission, matchResult);
  }

  isExistMatchInfo(course, level, mission) {
    const resultFindByKey = this.#getByKey(course, level);
    const resultFindByMission = resultFindByKey.get(mission);

    if (resultFindByMission === null) return false;
    return true;
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
