import MatchHistory from "../../src/models/MatchHistory.js";

describe("Matcher 클래스 테스트", () => {
  test("4명을 매칭하면 1:1 팀 2개가 편성된다", () => {
    const crews = ["보노", "시저", "쉐리", "신디"];
    const matcher = new Matcher(crews);

    const shuffledCrews = [...crews];
    const matchResult = matcher.match(shuffledCrews);

    expect(matchResult[0].length).toEqual(2);
    expect(matchResult[1].length).toEqual(2);
    expect(matchResult.length).toEqual(2); // 전체 길이는 2
  });

  test("5명을 매칭하면 1:1 팀 1개, 1:1:1 팀 1개가 편성된다", () => {
    const crews = ["보노", "시저", "쉐리", "신디", "다비"];
    const matcher = new Matcher(crews);

    const shuffledCrews = [...crews];
    const matchResult = matcher.match(shuffledCrews);

    expect(matchResult[0].length).toEqual(2);
    expect(matchResult[1].length).toEqual(3);
    expect(matchResult.length).toEqual(2); // 전체 길이는 2
  });

  test("이미 페어가 된 적이 있는 페어로 매칭 된다면 다시 매칭한다", () => {
    const crews = ["보노", "시저", "쉐리", "신디"];
    const matcher = new Matcher(crews);

    const matchResult = new Map();

    const matchResultArr = [
      ["보노", "시저"],
      ["쉐리", "신디"],
    ];

    for (let res of matchResultArr) {
      matchResult.set(res[0], [res[1]]);
      matchResult.set(res[1], [res[0]]);
    }

    const history = new MatchHistory();

    const matchInfo = ["프론트엔드", "레벨1", "자동차경주"];
    history.addHistory(matchInfo, matchResult);

    const shuffledCrews = [...crews];
    expect(matcher.match(shuffledCrews)).toThrow("[ERROR]");
  });
});
