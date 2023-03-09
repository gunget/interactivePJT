(function () {
  class CardFlipOnScroll {
    constructor(wrapper, sticky) {
      this.wrapper = wrapper;
      this.sticky = sticky;
      this.cards = this.sticky.querySelectorAll(".card");
      //각카드에 동일한 효과 주기위해 묶음으로 불러옴
      this.length = this.cards.length;

      this.start = 0;
      this.end = 0;
      this.step = 0;
    }
    init() {
      //최초 애니메이션 구간을 잡기 위해 scroll 기준값 세팅하기
      //offsetTop은 부모 엘러먼트(relative)를 기준으로 떨어진 값이 측정됨
      //relative 설정된 부모가 없으면 dom전체를 기준으로, 즉 절대좌표가 구해짐
      this.start = this.wrapper.offsetTop;

      //videoElemTop = videoElem.getBoundingClientRect().top + windowScrollTop;
      //이렇게 하면 viewPort기준으로 절대값이 구해짐.
      //스크롤 중간에도 절대값이 구해지므로 이게 더 바람직한 방법이긴 함

      this.end =
        this.wrapper.offsetTop +
        this.wrapper.offsetHeight -
        window.innerHeight * 1.2; //마지막이 살짝 길어지게 1.2곱함
      // this.wrapper.offsetTop + this.wrapper.offsetHeight - window.innerHeight;
      this.step = (this.end - this.start) / (this.length * 2);
      //애니메이션 구간에서 여러가지 변화가 생겨야 하므로 이를 미세 스텝으로 나눠서
      //계산을 편하게 만듦.더 세밀하게 컨트롤 하기위해 구간을 더 잘게 쪼겜(2곱하기)
    }
    animate() {
      //각 카드에 구간(조건)에 따라 행동할 값 지정해주기
      this.cards.forEach((card, i) => {
        //s는 각 카드의 애니가 지작되는 스크롤값, e는 끝나는 스크롤값
        //4개가 쭈르륵 나오다 마지막에 뒤집어짐. 그림 참조
        const s = this.start + this.step * i;
        const e = s + this.step * (this.length + 1);
        // const e = s + (4개의 스텝 + 1개의 스텝). 1개의 스텝은 회전하기 위한 구간
        if (scrollY <= s) {
          //구간 밖에 있을 때. 화면 밖에 있어야 한다.
          card.style.transform = `perspective(100vw) translateX(100vw) rotateY(180deg)`;
        } else if (scrollY >= s && scrollY < e - this.step) {
          //이동구간 진입 but 회전구간 미진입. translateX값만 바꿔주면 된다.
          //임이의 스크롤 값 구하기 위해 부분/전체*환산자 활용. 100vw 이동한 것이므로 환산자는 100.
          //반대로 이동해야 하므로 100에서 부터 이만큼을 빼줌
          card.style.transform = `perspective(100vw) translateX(${
            100 - ((scrollY - s) / (e - s)) * 100
          }vw) rotateY(180deg)`;
        } else if (scrollY > e - this.step && scrollY <= e) {
          //이동과 회전이 동시에 일어나는 구간
          //이동은 똑같고 회전도 개념은 똑같은데 환산자가 각도 이므로 180.
          card.style.transform = `perspective(100vw) translateX(${
            100 - ((scrollY - s) / (e - s)) * 100
          }vw) rotateY(${
            180 - ((scrollY - (e - this.step)) / this.step) * 180
          }deg)`;
        } else if (scrollY > e) {
          //구간을 벗어났을 때 값
          card.style.transform = `perspective(100vw) translateX(0vw) rotateY(0deg)`;
        }
      });
    }
  }
  const mainContent1 = document.querySelector(".main-content-1");
  const sticky = document.querySelector(".sticky");
  const cardFlipOnScroll = new CardFlipOnScroll(mainContent1, sticky);
  cardFlipOnScroll.init();
  window.addEventListener("scroll", () => {
    cardFlipOnScroll.animate();
  });
  window.addEventListener("resize", () => {
    cardFlipOnScroll.init();
  });
})();
