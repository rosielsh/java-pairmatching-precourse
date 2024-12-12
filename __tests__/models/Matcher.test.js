import MatchHistory from "../../src/models/MatchHistory.js";
import Matcher from "../../src/models/Matcher.js";

describe("Matcher 클래스 테스트", () => {
  test("4명을 매칭하면 1:1 팀 2개가 편성된다", () => {
    const crews = ["보노", "시저", "쉐리", "신디"];
    const matchStrategy = {
      shuffle: () => [...crews],
    };
    const matchInfo = ["프론트엔드", "레벨1"];

    const matcher = new Matcher(matchStrategy);
    const history = new MatchHistory();

    const matchResult = matcher.match(matchInfo, crews, history);

    expect(matchResult[0].length).toEqual(2);
    expect(matchResult[1].length).toEqual(2);
    expect(matchResult.length).toEqual(2); // 전체 길이는 2
  });

  test("5명을 매칭하면 1:1 팀 1개, 1:1:1 팀 1개가 편성된다", () => {
    const crews = ["보노", "시저", "쉐리", "신디", "다비"];
    const matchStrategy = {
      shuffle: () => [...crews],
    };
    const matchInfo = ["프론트엔드", "레벨1"];

    const history = new MatchHistory();
    const matcher = new Matcher(matchStrategy);
    const matchResult = matcher.match(matchInfo, crews, history);

    expect(matchResult[0].length).toEqual(2);
    expect(matchResult[1].length).toEqual(3);
    expect(matchResult.length).toEqual(2); // 전체 길이는 2
  });

  test("이미 페어가 된 적이 있는 페어로 매칭 된다면 다시 매칭한다", () => {
    const crews = ["보노", "시저", "쉐리", "신디"];
    const matchStrategy = {
      shuffle: () => [...crews],
    };
    const checkMatchInfo = ["프론트엔드", "레벨1"];

    const matcher = new Matcher(matchStrategy);
    const matchResultArr = [
      ["보노", "시저"],
      ["쉐리", "신디"],
    ];

    const history = new MatchHistory();
    const matchInfo = ["프론트엔드", "레벨1", "자동차경주"];
    history.addHistory(matchInfo, matchResultArr);

    expect(() => matcher.match(checkMatchInfo, crews, history)).toThrow("[ERROR]");
  });
});
