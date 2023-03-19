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
          this.card.style.opacity = 1;
          this.card.style.width = `24%`;
        } else if (
          scrollY > rangeA.start * this.stepHeight &&
          scrollY <= rangeA.end * this.stepHeight
        ) {
          //카드1의 시작점일때 0, 끝점일때 76이 되도록 값을 추출. 경과거리/카드1의 전체거리*76
          const tempY =
            ((scrollY - this.stepHeight) / (this.stepHeight * 3)) * 76;
          tempY > 0 ? (this.card.style.width = `${24 + tempY}%`) : null;
          this.card.style.zIndex = 1;
        } else if (scrollY > rangeA.end * this.stepHeight) {
          this.card.style.width = `100%`;
        }
      // case 2:
      //   if (scrollY <= rangeA.start * this.stepHeight) {
      //     this.card.style.opacity = 1;
      //     this.card.style.width = `24%`;
      //   } else if (
      //     scrollY > rangeA.start * this.stepHeight &&
      //     scrollY <= rangeA.end * this.stepHeight
      //   ) {
      //     const tempY =
      //       ((scrollY - this.stepHeight) / (this.stepHeight * 2)) * 25.333;
      //     tempY > 0 ? (this.card.style.left = `-${25.333 - tempY}%`) : null;
      //   } else if (scrollY > rangeA.end * this.stepHeight) {
      //     this.card.style.left = `0%`;
      //   }

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
