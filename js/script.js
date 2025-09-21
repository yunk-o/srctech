document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------
    // 카테고리 버튼 토글
    // -------------------------------
    const items = document.querySelectorAll(".category ul li");
    items.forEach((li) => {
        const button = li.querySelector("button");
        if (button) {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                li.classList.toggle("active"); // 누를 때마다 열기/닫기 토글
            });
        }
    });

    // -------------------------------
    // 네비게이션 hover 이벤트
    // -------------------------------
    const navItems = document.querySelectorAll(".header_nav > .nav_item");
    const header = document.querySelector("header");

    navItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            header.classList.add("on");
            const dropdown = item.querySelector(".nav_dropdown");
            if (dropdown) dropdown.classList.add("on");
        });

        item.addEventListener("mouseleave", () => {
            header.classList.remove("on");
            const dropdown = item.querySelector(".nav_dropdown");
            if (dropdown) dropdown.classList.remove("on");
        });
    });

    // -------------------------------
    // 스크롤 이벤트 (헤더 숨김/보임)
    // -------------------------------
    let lastScrollTop = 0;
    window.addEventListener("scroll", () => {
        const st = window.scrollY;

        if (st > lastScrollTop) {
            // 스크롤 내릴 때 → header 숨김
            header.classList.add("hide");
        } else {
            // 스크롤 올릴 때 → header 보임
            header.classList.remove("hide");
        }

        lastScrollTop = st;
    });
});

//스와이퍼
const totalSlides = 3;
const autoplayDelay = 4000;

const swiper = new Swiper(".mainSwiper", {
    loop: true,
    autoplay: {
        delay: autoplayDelay,
        disableOnInteraction: false
    },
    navigation: {
        nextEl: ".custom-pagination .swiper-button-next",
        prevEl: ".custom-pagination .swiper-button-prev"
    },
});


// ✅ init 이벤트
swiper.on("init", () => {
    document.querySelector(".custom-pagination .total").textContent =
        String(totalSlides).padStart(2, "0");
    updatePagination(swiper);
    startProgress();
});

// ✅ slideChange 이벤트
swiper.on("slideChange", () => {
    updatePagination(swiper, true);
    startProgress();
});

// ✅ 숫자 업데이트 (+ 애니메이션)
function updatePagination(swiper, animate = false) {
    const current = swiper.realIndex + 1;
    const currentEl = document.querySelector(".custom-pagination .current");
    currentEl.textContent = String(current).padStart(2, "0");

    if (animate) {
        currentEl.classList.remove("animate");
        void currentEl.offsetWidth;
        currentEl.classList.add("animate");
    }
}

// ✅ 프로그레스바 애니메이션
let progressTimer;
function startProgress() {
    const progressEl = document.querySelector(".custom-pagination .progress");
    if (!progressEl) return;

    progressEl.style.transition = "none";
    progressEl.style.width = "0%";
    clearTimeout(progressTimer);

    setTimeout(() => {
        progressEl.style.transition = `width ${autoplayDelay}ms linear`;
        progressEl.style.width = "100%";
    }, 50);
}


function openSearchBox() {
    const overlay = document.getElementById("searchOverlay");
    overlay.classList.add("active");
    overlay.querySelector("input").focus();
}

function closeSearchBox() {
    document.getElementById("searchOverlay").classList.remove("active");
}

function searchAction(event) {
    event.preventDefault();
    const query = event.target.querySelector("input").value.trim();
    if (query) {
        window.location.href = "/search?q=" + encodeURIComponent(query);
    }
    return false;
}

document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".header_nav .nav_item");

    navItems.forEach((item) => {
        const link = item.querySelector(".nav_link");

        link.addEventListener("click", (e) => {
            if (window.innerWidth <= 1024) { // 모바일일 때만 아코디언
                e.preventDefault();
                item.classList.toggle("open");
            }
        });
    });
});