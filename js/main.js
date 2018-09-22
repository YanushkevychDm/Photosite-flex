// Навигация
/*http://callmenick.com/post/expanding-search-bar-using-css-transitions*/
(function($) {
    "use strict";
  
    var $navbar = $(".nav"),
        y_pos = $navbar.offset().top,
        height = $navbar.height();

    //scroll top 0 sticky
    $(document).scroll(function() {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > 0) {
          $navbar.addClass("sticky");
        } else {
          $navbar.removeClass("sticky");  
        }
    });
    
    //section sticky
    /*$(document).scroll(function() {
        var scrollTop = $(this).scrollTop();
        if ($(window).height() > scrollTop) {
          $navbar.removeClass("sticky");
        } else {
          $navbar.addClass("sticky");  
        }
    });*/

})(jQuery, undefined);

$(".menu").click(function(){
  $("#nav").toggleClass("open");
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vINCd0LDQstC40LPQsNGG0LjRj1xyXG4vKmh0dHA6Ly9jYWxsbWVuaWNrLmNvbS9wb3N0L2V4cGFuZGluZy1zZWFyY2gtYmFyLXVzaW5nLWNzcy10cmFuc2l0aW9ucyovXHJcbihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICBcclxuICAgIHZhciAkbmF2YmFyID0gJChcIi5uYXZcIiksXHJcbiAgICAgICAgeV9wb3MgPSAkbmF2YmFyLm9mZnNldCgpLnRvcCxcclxuICAgICAgICBoZWlnaHQgPSAkbmF2YmFyLmhlaWdodCgpO1xyXG5cclxuICAgIC8vc2Nyb2xsIHRvcCAwIHN0aWNreVxyXG4gICAgJChkb2N1bWVudCkuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGlmIChzY3JvbGxUb3AgPiAwKSB7XHJcbiAgICAgICAgICAkbmF2YmFyLmFkZENsYXNzKFwic3RpY2t5XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkbmF2YmFyLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vc2VjdGlvbiBzdGlja3lcclxuICAgIC8qJChkb2N1bWVudCkuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykuaGVpZ2h0KCkgPiBzY3JvbGxUb3ApIHtcclxuICAgICAgICAgICRuYXZiYXIucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRuYXZiYXIuYWRkQ2xhc3MoXCJzdGlja3lcIik7ICBcclxuICAgICAgICB9XHJcbiAgICB9KTsqL1xyXG5cclxufSkoalF1ZXJ5LCB1bmRlZmluZWQpO1xyXG5cclxuJChcIi5tZW51XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgJChcIiNuYXZcIikudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpO1xyXG59KTsiXSwiZmlsZSI6Im1haW4uanMifQ==
