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

        // PC hover
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

        // 모바일 아코디언
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

    if (navToggle && navClose && headerNav) {
        navClose.style.display = "none";

        navToggle.addEventListener("click", () => {
            headerNav.classList.add("header_nav_open");
            navToggle.style.display = "none";
            navClose.style.display = "block";
        });

        navClose.addEventListener("click", () => {
            headerNav.classList.remove("header_nav_open");
            navToggle.style.display = "block";
            navClose.style.display = "none";
        });
    }

    // -------------------------------
    // Swiper
    // -------------------------------
    const totalSlides = document.querySelectorAll(".mainSwiper .swiper-slide:not(.swiper-slide-duplicate)").length;
    const autoplayDelay = 4000;

    const swiper = new Swiper(".mainSwiper", {
        loop: true,
        effect: "fade",
        fadeEffect: { crossFade: true },
        autoplay: {
            delay: autoplayDelay,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: ".custom-pagination .swiper-button-next",
            prevEl: ".custom-pagination .swiper-button-prev"
        },
        on: {
            init: function () {
                document.querySelector(".custom-pagination .total").textContent =
                    String(totalSlides).padStart(2, "0");
                updatePagination(this);
                startProgress();
                restartZoom(this);
            },
            slideChangeTransitionEnd: function () {
                updatePagination(this);
                startProgress();
                restartZoom(this);
            }
        }
    });

    function updatePagination(swiper) {
        const current = swiper.realIndex + 1;
        const currentEl = document.querySelector(".custom-pagination .current");
        currentEl.textContent = String(current).padStart(2, "0");
    }

    function startProgress() {
        const progressEl = document.querySelector(".custom-pagination .progress");
        if (!progressEl) return;
        progressEl.style.transition = "none";
        progressEl.style.width = "0%";
        requestAnimationFrame(() => {
            progressEl.style.transition = `width ${autoplayDelay}ms linear`;
            progressEl.style.width = "100%";
        });
    }

    function restartZoom(swiper) {
        swiper.slides.forEach(slide => {
            const img = slide.querySelector("img");
            if (img) img.classList.remove("zoom");
        });
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (activeSlide) {
            const img = activeSlide.querySelector("img");
            if (img) {
                void img.offsetWidth;
                img.classList.add("zoom");
            }
        }
    }

    // -------------------------------
    // 검색 오버레이
    // -------------------------------
    window.openSearchBox = function () {
        const overlay = document.getElementById("searchOverlay");
        overlay.classList.add("active");
        overlay.querySelector("input").focus();
    };

    window.closeSearchBox = function () {
        document.getElementById("searchOverlay").classList.remove("active");
    };

    window.searchAction = function (event) {
        event.preventDefault();
        const query = event.target.querySelector("input").value.trim();
        if (query) {
            window.location.href = "/search?q=" + encodeURIComponent(query);
        }
        return false;
    };
});
