import { COURSE } from "../constants/Course.js";
import { LEVEL } from "../constants/Level.js";
import { MISSION } from "../constants/Mission.js";
import { generateError } from "../utils/generateError.js";

class OrderValidator {
  static validate(course, level, mission) {
    this.#validateCourse(course);
    this.#validateLevel(level);
    this.#validateMission(level, mission);
  }

  static #validateCourse(course) {
    if (!COURSE.includes(course)) {
      generateError("존재하지 않는 과정입니다.");
    }
  }

  static #validateLevel(level) {
    if (!LEVEL.includes(level)) {
      generateError("존재하지 않는 레벨입니다.");
    }
  }

  static #validateMission(level, mission) {
    const missions = MISSION[level];
    if (!missions.includes(mission)) {
      generateError("입력한 레벨에 존재하지 않는 미션입니다.");
    }
  }
}

export default OrderValidator;
