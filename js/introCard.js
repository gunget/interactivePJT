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
        if (scrollY <= this.actingRange.rngA.start * this.stepHeight) {
          this.card.style.opacity = 1;
          this.card.style.width = `24%`;
        } else if (
          scrollY > this.actingRange.rngA.start * this.stepHeight &&
          scrollY <= this.actingRange.rngA.end * this.stepHeight
        ) {
          //카드1의 시작점일때 0, 끝점일때 76이 되도록 값을 추출. 경과거리/카드1의 전체거리*76
          const tempY =
            ((scrollY - this.stepHeight) /
              (this.stepHeight *
                (this.actingRange.rngA.end - this.actingRange.rngA.start))) *
            76;
          tempY > 0 ? (this.card.style.width = `${24 + tempY}%`) : null;
          this.card.style.zIndex = 4;
        } else if (scrollY > this.actingRange.rngA.end * this.stepHeight) {
          this.card.style.width = `100%`;
        }
      case 2:
        if (scrollY <= this.actingRange.rngA.start * this.stepHeight) {
          this.card.style.opacity = 1;
          this.card.style.left = `25.33%`;
        } else if (
          scrollY > this.actingRange.rngA.start * this.stepHeight &&
          scrollY <= this.actingRange.rngA.end * this.stepHeight
        ) {
          const tempY =
            ((scrollY - this.stepHeight * this.actingRange.rngA.start) /
              (this.stepHeight *
                (this.actingRange.rngA.end - this.actingRange.rngA.start))) *
            25.333;
          tempY > 0 ? (this.card.style.left = `${25.333 - tempY}%`) : null;
          this.card.style.zIndex = 3;
        } else if (scrollY > this.actingRange.rngA.end * this.stepHeight) {
          this.card.style.left = `0%`;
          this.card.style.zIndex = 4;
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
