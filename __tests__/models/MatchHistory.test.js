import MatchHistory from "../../src/models/MatchHistory.js";

describe("MatchHistory 클래스 테스트", () => {
  const matchResult = new Map();

  const matchResultArr = [
    ["이브", "월터"],
    ["보노", "제키"],
    ["신디", "로드", "니콜"],
  ];

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

  test("해당 매칭 정보에 대한 매칭 결과가 있는지 없는지 조회할 수 있다", () => {
    const history = new MatchHistory();

    const matchInfo = ["프론트엔드", "레벨1", "자동차경주"];
    history.addHistory(matchInfo, matchResult);

    expect(history.isExistMatchInfo(...matchInfo)).toEqual(true);
  });
});
