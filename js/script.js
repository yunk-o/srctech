document.addEventListener("DOMContentLoaded", () => {
    // 현재 경로 확인 → page 폴더 안이면 ../ , 루트면 .
    let base = location.pathname.includes("/page/") ? ".." : ".";

    // -------------------------------
    // 헤더 불러오기
    // -------------------------------
    fetch(`${base}/header.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;

            // ✅ 헤더가 삽입된 후 이벤트 바인딩
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

            // ✅ 스크롤 이벤트 (헤더 숨김/보임)
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
        })
        .catch(error => console.error("헤더 불러오기 실패:", error));

    // -------------------------------
    // index.html이 아닐 때만 푸터 불러오기
    // -------------------------------
    if (!location.pathname.endsWith("index.html") && !location.pathname.endsWith("/")) {
        fetch(`${base}/footer.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById("footer").innerHTML = data;
            })
            .catch(error => console.error("푸터 불러오기 실패:", error));
    }
});
