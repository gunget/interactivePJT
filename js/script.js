import { IntroCard } from "./introCard.js";

(function () {
  const mainCT = document.querySelector(".main-container");
  const introImgCT = document.querySelectorAll(".upper");
  const loadingElem = document.querySelector(".loading");

  const sectionIntroElem = document.querySelector(".section-container");
  const introCtgrElems = document.querySelectorAll(".category");
  let scrollPercent;

  //image handling
  const images = [];
  const imgNums = 4;

  //intro - card working range
  const introActingRange = {
    card1: {
      rngA: { start: 2, end: 4 },
      rngB: { start: 4, end: 6 },
      rngC: null,
      rngD: null,
    },
    card2: {
      rngA: { start: 1, end: 2 },
      rngB: { start: 5, end: 6 },
      rngC: { start: 8, end: 9 },
      rngD: null,
    },
    card3: {
      rngA: { start: 2, end: 4 },
      rngB: null,
      rngC: { start: 9, end: 11 },
      rngD: { start: 12, end: 13 },
    },
    card4: {
      rngA: { start: 2, end: 4 },
      rngB: null,
      rngC: null,
      rngD: { start: 13, end: 16 },
    },
  };

  const card = new IntroCard();

  //ani range setting
  const totalSteps = 16;
  const stepHeight = mainCT.offsetHeight / totalSteps;

  for (let index = 0; index < imgNums; index++) {
    getFreePics();
  }

  function getFreePics() {
    fetch("../images/3.jpg") //별도 언급 없으면 get방식 요청. promise객체로 만들어서 전송
      // fetch("https://picsum.photos/350/750") //별도 언급 없으면 get방식 요청. promise객체로 만들어서 전송
      //정상적으로 응답이 완료되면 response를 돌려줌. 안되면 될때까지 pending상태
      .then((res) => {
        if (res.url) {
          let tempHtml = `<img src="${res.url}"/>`;
          return tempHtml;
        }
      })
      .then((data) => {
        images.push(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //초기 로딩화면 후 이미지 다 받아오면 없애기
  const IntervalId = setInterval(() => {
    if (images.length == 4) {
      clearInterval(IntervalId);
      document.body.classList.remove("before-load");
      introImgCT.forEach((elem, idx) => {
        elem.innerHTML = images[idx];
      });
      document.body.removeChild(loadingElem);
    }
  }, 300);

  function getTotalLength() {
    const sectionRealHeight =
      sectionIntroElem.offsetHeight - window.innerHeight;
    const winScrollTop = window.scrollY;
    const scrollRatio = winScrollTop / sectionRealHeight;
    scrollPercent = scrollRatio * 100;
  }
  // console.log(introCtgrElems[0]);

  function introAni(elem) {
    const elemNum = Number(elem.dataset.elnum);
    elem.style.transform = `translateX(-${scrollPercent * elemNum}em)`;
  }

  window.addEventListener("scroll", () => {
    getTotalLength();
    // console.log(`${scrollPercent}%`);
  });
})();
