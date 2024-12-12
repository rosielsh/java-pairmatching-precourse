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

  test("조회한 매칭 정보를 반환할 수 있다", () => {
    const history = new MatchHistory();

    const expectedResult = [
      ["이브", "월터"],
      ["보노", "제키"],
      ["신디", "로드", "니콜"],
    ];
    const matchInfo = ["프론트엔드", "레벨1", "자동차경주"];
    history.addHistory(matchInfo, matchResult);

    expect(history.getMatchHistory(...matchInfo)).toStrictEqual(expectedResult);
  });

  test("해당 크루가 이전에 같은 레벨에서 페어였던 적이 있는지 확인할 수 있다", () => {
    const matchInfo = ["프론트엔드", "레벨1", "자동차경주"];
    const checkMatchInfo = ["프론트엔드", "레벨1"];
    const crews = ["이브", "월터"];
    const history = new MatchHistory();

    expect(history.isPairInSameLevel(checkMatchInfo, crews)).toEqual(false);

    history.addHistory(matchInfo, matchResult);
    expect(history.isPairInSameLevel(checkMatchInfo, crews)).toEqual(true);
  });
});
