(function () {
  const introImgCT = document.querySelectorAll(".upper");
  const loadingElem = document.querySelector(".loading");

  const sectionIntroElem = document.querySelector(".section-container");
  const introCtgrElems = document.querySelectorAll(".category");
  let scrollPercent;

  const images = [];
  const imgNums = 4;

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
  // console.log(introCtgrElems);

  function introAni(elem) {
    const elemNum = Number(elem.dataset.elnum);
  }
  introAni(introCtgrElems[0]);
  window.addEventListener("scroll", () => {
    getTotalLength();
    // console.log(`${scrollPercent}%`);
  });
})();
