// $(document).ready(function () {
//     // nav item hover 시 dropdown 열기/닫기
//     $('.header_nav > .nav_item').hover(function () {
//         $(this).children('.nav_dropdown').toggleClass('on');
//     });
//
//     // 모바일 메뉴 열기
//     $('.header_menu').click(function () {
//         $('.header_nav').addClass('on');
//     });
//
//     // 모바일 메뉴 닫기
//     $('.header_nav .btn_close').click(function () {
//         $('.header_nav').removeClass('on');
//     });
// });

$(document).ready(function () {
    $('.header_nav > .nav_item').hover(
        function () {
            $('header').addClass('on');
            $(this).children('.nav_dropdown').addClass('on');
        },
        function () {
            $('header').removeClass('on');
            $(this).children('.nav_dropdown').removeClass('on');
        }
    );
});

let lastScrollTop = 0;

$(window).on("scroll", function () {
    const st = $(this).scrollTop();

    if (st > lastScrollTop) {
        // 스크롤 내릴 때 → header 숨김
        $(".header").addClass("hide");
    } else {
        // 스크롤 올릴 때 → header 보임
        $(".header").removeClass("hide");
    }

    lastScrollTop = st;
});