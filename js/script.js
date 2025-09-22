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
                li.classList.toggle("active");
            });
        }
    });

    // -------------------------------
    // 네비게이션 hover 이벤트 (768px 이상에서만)
    // -------------------------------
    const navItems = document.querySelectorAll(".header_nav > .nav_item");
    const header = document.querySelector("header");

    navItems.forEach((item) => {
        const link = item.querySelector(".nav_link");
        const dropdown = item.querySelector(".nav_dropdown");

        // PC hover (769px 이상일 때만 동작)
        item.addEventListener("mouseenter", () => {
            if (window.innerWidth > 768) {
                header.classList.add("on");
                if (dropdown) dropdown.classList.add("on");
            }
        });
        item.addEventListener("mouseleave", () => {
            if (window.innerWidth > 768) {
                header.classList.remove("on");
                if (dropdown) dropdown.classList.remove("on");
            }
        });

        // 모바일 active (768px 이하 아코디언)
        if (dropdown) {
            link.addEventListener("click", (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle("open");
                }
            });
        }
    });

    // -------------------------------
    // 스크롤 이벤트 (헤더 숨김/보임)
    // -------------------------------
    let lastScrollTop = 0;
    window.addEventListener("scroll", () => {
        const st = window.scrollY;
        if (st > lastScrollTop) {
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
        }
        lastScrollTop = st;
    });

    // -------------------------------
    // 모바일 메뉴 버튼 토글
    // -------------------------------
    const navToggle = document.querySelector(".nav_toggle"); // 햄버거 버튼
    const navClose = document.querySelector(".nav_close");   // X 버튼
    const headerNav = document.querySelector(".header_nav"); // 메뉴

    // 처음에는 햄버거 보이고 X 숨김
    navClose.style.display = "none";

    // 햄버거 클릭 → 메뉴 열기 + X 표시
    navToggle.addEventListener("click", () => {
        headerNav.classList.add("header_nav_open");
        navToggle.style.display = "none";
        navClose.style.display = "block";
    });

    // X 클릭 → 메뉴 닫기 + 햄버거 표시
    navClose.addEventListener("click", () => {
        headerNav.classList.remove("header_nav_open");
        navToggle.style.display = "block";
        navClose.style.display = "none";
    });
});

// -------------------------------
// 스와이퍼
// -------------------------------
const totalSlides = 3;
const autoplayDelay = 4000;

const swiper = new Swiper(".mainSwiper", {
    loop: true,
    effect: "fade",
    fadeEffect: { crossFade: true },
    autoplay: { delay: autoplayDelay, disableOnInteraction: false },
    navigation: {
        nextEl: ".custom-pagination .swiper-button-next",
        prevEl: ".custom-pagination .swiper-button-prev"
    },
});

swiper.on("init", () => {
    document.querySelector(".custom-pagination .total").textContent =
        String(totalSlides).padStart(2, "0");
    updatePagination(swiper);
    startProgress();
});

swiper.on("slideChange", () => {
    updatePagination(swiper, true);
    startProgress();
});

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

// -------------------------------
// 검색 오버레이
// -------------------------------
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
