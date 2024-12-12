class MatchStrategy {
  static shuffle(crews) {
    return crews.sort(() => Math.random() - 0.5);
  }
}

export default MatchStrategy;
