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

// Кнопка вверх
$(document).ready(function(){
  $('body').append('<a href="#" id="go-top" title="Вверх"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>');
});

$(function() {
 $.fn.scrollToTop = function() {
  $(this).hide().removeAttr("href");
  if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
  var scrollDiv = $(this);
  $(window).scroll(function() {
   if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
   else $(scrollDiv).fadeIn("slow")
  });
  $(this).click(function() {
   $("html, body").animate({scrollTop: 0}, "slow")
  })
 }
});

$(function() {
 $("#go-top").scrollToTop();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vINCd0LDQstC40LPQsNGG0LjRj1xyXG4vKmh0dHA6Ly9jYWxsbWVuaWNrLmNvbS9wb3N0L2V4cGFuZGluZy1zZWFyY2gtYmFyLXVzaW5nLWNzcy10cmFuc2l0aW9ucyovXHJcbihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICBcclxuICAgIHZhciAkbmF2YmFyID0gJChcIi5uYXZcIiksXHJcbiAgICAgICAgeV9wb3MgPSAkbmF2YmFyLm9mZnNldCgpLnRvcCxcclxuICAgICAgICBoZWlnaHQgPSAkbmF2YmFyLmhlaWdodCgpO1xyXG5cclxuICAgIC8vc2Nyb2xsIHRvcCAwIHN0aWNreVxyXG4gICAgJChkb2N1bWVudCkuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGlmIChzY3JvbGxUb3AgPiAwKSB7XHJcbiAgICAgICAgICAkbmF2YmFyLmFkZENsYXNzKFwic3RpY2t5XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkbmF2YmFyLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vc2VjdGlvbiBzdGlja3lcclxuICAgIC8qJChkb2N1bWVudCkuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykuaGVpZ2h0KCkgPiBzY3JvbGxUb3ApIHtcclxuICAgICAgICAgICRuYXZiYXIucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRuYXZiYXIuYWRkQ2xhc3MoXCJzdGlja3lcIik7ICBcclxuICAgICAgICB9XHJcbiAgICB9KTsqL1xyXG5cclxufSkoalF1ZXJ5LCB1bmRlZmluZWQpO1xyXG5cclxuJChcIi5tZW51XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgJChcIiNuYXZcIikudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpO1xyXG59KTtcclxuXHJcbi8vINCa0L3QvtC/0LrQsCDQstCy0LXRgNGFXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgJCgnYm9keScpLmFwcGVuZCgnPGEgaHJlZj1cIiNcIiBpZD1cImdvLXRvcFwiIHRpdGxlPVwi0JLQstC10YDRhVwiPjxpIGNsYXNzPVwiZmEgZmEtYXJyb3ctdXBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9hPicpO1xyXG59KTtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAkLmZuLnNjcm9sbFRvVG9wID0gZnVuY3Rpb24oKSB7XHJcbiAgJCh0aGlzKS5oaWRlKCkucmVtb3ZlQXR0cihcImhyZWZcIik7XHJcbiAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+PSBcIjI1MFwiKSAkKHRoaXMpLmZhZGVJbihcInNsb3dcIilcclxuICB2YXIgc2Nyb2xsRGl2ID0gJCh0aGlzKTtcclxuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpIDw9IFwiMjUwXCIpICQoc2Nyb2xsRGl2KS5mYWRlT3V0KFwic2xvd1wiKVxyXG4gICBlbHNlICQoc2Nyb2xsRGl2KS5mYWRlSW4oXCJzbG93XCIpXHJcbiAgfSk7XHJcbiAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgXCJzbG93XCIpXHJcbiAgfSlcclxuIH1cclxufSk7XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gJChcIiNnby10b3BcIikuc2Nyb2xsVG9Ub3AoKTtcclxufSk7Il0sImZpbGUiOiJtYWluLmpzIn0=
