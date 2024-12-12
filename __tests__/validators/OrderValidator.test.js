import OrderValidator from "../../src/validators/OrderValidator.js";

describe("OrderValidator 클래스 테스트", () => {
  test("각 과정, 레벨, 미션은 출력된 내용 이외의 것을 입력하면 에러가 발생한다", () => {
    const inputs = [
      ["frontend", "레벨1", "자동차경주"],
      ["프론트엔드", "level2", "장바구니"],
      ["프론트엔드", "레벨2", "점심메뉴추천"],
    ];

    inputs.forEach(([course, level, mission]) => {
      expect(() => OrderValidator.validate(course, level, mission)).toThrow("[ERROR]");
    });
  });

  test("레벨에 맞지 않은 미션을 입력하면 에러가 발생한다", () => {
    const inputs = [
      ["프론트엔드", "레벨2", "점심메뉴추천"],
      ["프론트엔드", "레벨2", "자동차경주"],
      ["프론트엔드", "레벨1", "장바구니"],
    ];

    inputs.forEach(([course, level, mission]) => {
      expect(() => OrderValidator.validate(course, level, mission)).toThrow("[ERROR]");
    });
  });
});
