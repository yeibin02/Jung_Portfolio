window.onload = function () {
  AOS.init();

  // 스크롤 기능
  // 스크롤바의 상단위치
  let scy = 0;
  let scActive = 50;
  scy = window.document.documentElement.scrollTop;
  let header = document.querySelector(".header");
  header.addEventListener("mouseenter", function () {
    header.classList.add("header-active");
  });
  header.addEventListener("mouseleave", function () {
    if (scy < scActive) {
      header.classList.remove("header-active");
    }
  });
  // 새로고침시
  if (scy > scActive) {
    header.classList.add("header-active");
  }
  window.addEventListener("scroll", function () {
    scy = window.document.documentElement.scrollTop;
    // console.log("스크롤:" + scy);
    if (scy > scActive) {
      header.classList.add("header-active");
    } else {
      header.classList.remove("header-active");
    }
  });
  // 클릭스크롤
  const navbar = document.querySelectorAll(".header-right > div");
  const goPortfolio = document.querySelector(".vmw");
  navbar.forEach((navbarItem) =>
    navbarItem.addEventListener("click", (e) => {
      link = e.currentTarget.dataset.link;
      scrollIntoView(link);
    })
  );
  goPortfolio.addEventListener("click", () => {
    scrollIntoView(goPortfolio.dataset.link);
  });
  //스킬 툴 스크롤 감지
  const SNT = document.querySelector(".snt-box");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animatedProgressSpans = document.querySelectorAll(
          ".animated-progress span"
        );
        animatedProgressSpans.forEach(function (span) {
          const dataProgress = span.getAttribute("data-progress");
          span.style.width = dataProgress + "%";
          span.textContent = dataProgress + "%";
          const duration = 1000;
          const start = performance.now();
          const end = start + duration;
          function animate() {
            const now = performance.now();
            const timeFraction = (now - start) / duration;
            if (timeFraction > 1) {
              span.style.width = dataProgress + "%";
              return;
            }
            const progress = timeFraction;
            span.style.width = progress * dataProgress + "%";
            requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        });
      }
    });
  });
  observer.observe(SNT);
  //   console.log(SNT);
  // // 스크롤 이동 함수
  function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
  }
  // 위로가기 스크롤바 구현
  const gotop = document.querySelector(".gotop");
  gotop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  // gotop
  let waypoint_footer = new Waypoint({
    element: document.querySelector(".footer"),
    handler: function (direction) {
      // console.log(direction);
      if (direction === "down") {
        gotop.classList.add("active-footer");
      } else {
        gotop.classList.remove("active-footer");
      }
    },
    offset: "95%",
  });

  let waypoint_service = new Waypoint({
    element: document.querySelector(".visual"),
    handler: function (direction) {
      // console.log(direction);
      if (direction === "down") {
        gotop.classList.add("active");
      } else {
        gotop.classList.remove("active");
      }
    },
    offset: "80%",
  });
  // json파일 로드 및 데이터 출력
  // json파일 로드 및 데이터 출력
  fetch("ha.json")
    .then((response) => response.json())
    .then((data) => {
      const portfolioItems = data.portfolioItems; //json에서 포트폴리오 항목 데이터를 가져옴
      const dataVisual = document.getElementById("data-visual");
      portfolioItems.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
         <div class="project">
           <div class="pj-img">
               <img src="${item.src}" class"stx-gif"/>
           </div>
           <div class="study-project">
               <h2 class="pp">${item.h}</h2>
               <h1>${item.title}</h1>
               <p>${item.date}</p>
               <span>
                   제작 인원: ${item.contributors} <br />
                   사용 프로그램: ${item.technologies}
               </span>
               <div class="swiper-btn">
               <a href="${
                 item.link.Work || item.link.Notion
               }" target="_blank">${item.link.workLabel}</a>
               <a href="${
                 item.link.Github || item.link.GitHub
               }" target="_blank">${item.link.githubLabel}</a>
               <a href="${
                 item.link.Origin || item.link.Origin
               }" target="_blank">${item.link.originLabel}</a>
               </div>
           </div>
         </div>
         `;
        dataVisual.appendChild(slide);
      });
      // Swiper 슬라이더 초기화 코드 추가
      new Swiper(".swVisual", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        },
        // 추가적인 Swiper 설정을 여기에 추가할 수 있습니다.
      });
    })
    .catch((error) => {
      console.error("JSON 파일 로드 중 오류 발생:", error);
    });
};
