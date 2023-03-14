export class IntroCard {
  constructor(element, idx, stepHeight, actingRange, cardPosX) {
    this.card = element;
    this.cardNum = idx + 1;
    this.stepHeight = stepHeight;
    this.actingRange = actingRange;
    this.cardPosX = cardPosX;
  }
  foldingCards(scrollY, scrollPercent) {
    switch (this.cardNum) {
      case 1:
        const rangeA = this.actingRange.rngA;
        if (scrollY <= rangeA.start * this.stepHeight) {
          console.log("not yet");
          this.card.style.opacity = 1;
        } else if (
          scrollY > rangeA.start * this.stepHeight &&
          scrollY <= rangeA.end * this.stepHeight
        ) {
          this.card.style.width = `${scrollY / 20}%`;
          this.card.style.zIndex = 1;
        } else if (scrollY > rangeA.end * this.stepHeight) {
          console.log("stop there");
        }

      default:
        break;
    }
  }
  setFullWidth() {}
  setMinWidth() {}
  test() {
    console.log("class loading success");
  }
}
