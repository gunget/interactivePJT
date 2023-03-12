export class IntroCard {
  constructor(element, idx, stepHeight, actingRange, cardPosX, scrollPercent) {
    this.card = element;
    this.cardNum = idx;
    this.stepHeight = stepHeight;
    this.actingRange = actingRange;
    this.cardPosX = cardPosX;
    this.scrollPercent = scrollPercent;
  }
  foldingCards() {}
  setFullWidth() {}
  setMinWidth() {}
  test() {
    console.log("class loading success");
  }
}
