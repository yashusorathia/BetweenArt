(function($) {
  "use strict";

  var varWindow = $(window);

  // Css Function Js
    const bgSelector = $("[data-bg-img]");
    bgSelector.each(function (index, elem) {
      let element = $(elem),
        bgSource = element.data('bg-img');
      element.css('background-image', 'url(' + bgSource + ')');
    });
    
    const Bgcolorcl = $("[data-bg-color]");
    Bgcolorcl.each(function (index, elem) {
      let element = $(elem),
        Bgcolor = element.data('bg-color');
      element.css('background-color', Bgcolor);
    });

  // Menu Activeion Js
    var cururl = window.location.pathname;
    var curpage = cururl.substr(cururl.lastIndexOf('/') + 1);
    var hash = window.location.hash.substr(1);
    if((curpage === "" || curpage === "/" || curpage === "admin") && hash === "")
      {
      } else {
        $(".header-navigation li").each(function()
      {
        $(this).removeClass("active");
      });
      if(hash != "")
        $(".header-navigation li a[href='"+hash+"']").parents("li").addClass("active");
      else
      $(".header-navigation li a[href='"+curpage+"']").parents("li").addClass("active");
    }

  // Offcanvas Nav Js
    var $offcanvasNav = $("#offcanvasNav a");
    $offcanvasNav.on("click", function () {
      var link = $(this);
      var closestUl = link.closest("ul");
      var activeLinks = closestUl.find(".active");
      var closestLi = link.closest("li");
      var linkStatus = closestLi.hasClass("active");
      var count = 0;

      closestUl.find("ul").slideUp(function () {
        if (++count == closestUl.find("ul").length)
          activeLinks.removeClass("active");
      });

      if (!linkStatus) {
        closestLi.children("ul").slideDown();
        closestLi.addClass("active");
      }
    });

  // Swiper Default Slider JS
    var mainlSlider = new Swiper('.hero-slider-container', {
      slidesPerView : 1,
      slidesPerGroup: 1,
      loop: true,
      speed: 700,
      spaceBetween: 0,
      effect: 'fade',
      autoHeight: true, //enable auto height
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: '.hero-slider-pagination',
        type: 'fraction',
        formatFractionCurrent: function (number) {
            return '0' + number;
        },
        formatFractionTotal: function (number) {
            return '0' + number;
        }
      },
    });

  // Swiper Default Slider JS
    var mainlSlider2 = new Swiper('.hero-two-slider-container', {
      slidesPerView : 1,
      slidesPerGroup: 1,
      loop: true,
      speed: 700,
      spaceBetween: 0,
      effect: 'fade',
      autoHeight: true, //enable auto height
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".hero-two-slider-pagination",
        clickable: true,
      },
    });

  // Brand Logo Slider Js
    var brandLogoSlider = new Swiper('.brand-logo-slider-container', {
      autoplay: {
        delay: 5000,
      },
      loop: true,
      slidesPerView : 4,
      slidesPerGroup: 1,
      spaceBetween: 62,
      speed: 500,
      breakpoints: {
        1200: {
          slidesPerView : 4,
        },
        768: {
          slidesPerView : 4,
        },
        576: {
          slidesPerView : 3,
        },
        480: {
          slidesPerView : 2,
        },
        0: {
          slidesPerView : 1,
        },
      }
    });

  // Related Product Slider Js
    var productSliderCol4 = new Swiper('.related-product-slide-container', {
      slidesPerView : 3,
      slidesPerGroup: 1,
      allowTouchMove: false,
      spaceBetween: 30,
      speed: 600,
      breakpoints: {
        1200: {
          slidesPerView : 3,
          allowTouchMove: true,
          autoplay: {
            delay: 5000,
          },
        },
        992: {
          slidesPerView : 3,
          allowTouchMove: true,
          autoplay: {
            delay: 5000,
          },
        },
        576: {
          slidesPerView : 2,
          allowTouchMove: true,
          autoplay: {
            delay: 5000,
          },
        },
        0: {
          slidesPerView : 1,
          allowTouchMove: true,
          autoplay: {
            delay: 5000,
          },
        },
      }
    });

  // Product Quantity JS
    var proQty = $(".pro-qty");
    proQty.append('<div class= "dec qty-btn">-</div>');
    proQty.append('<div class="inc qty-btn">+</div>');
    $('.qty-btn').on('click', function (e) {
      e.preventDefault();
      var $button = $(this);
      var oldValue = $button.parent().find('input').val();
      if ($button.hasClass('inc')) {
        var newVal = parseFloat(oldValue) + 1;
      } else {
        // Don't allow decrementing below zero
        if (oldValue > 1) {
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 1;
        }
      }
      $button.parent().find('input').val(newVal);
    });

  // Select Js
    $('select').niceSelect();

  // Review Form Rating Function
    var reviewFormRatingSelect = $('#product-review-form-rating-select'),
      reviewFormRatingStar = $("#product-review-form-rating"),
      reviewFormRatingVal = 1;
    reviewFormRatingStar.css('width', (20 * reviewFormRatingVal) + '%')
    $('#product-review-form-rating-select').on('change', function () {
      reviewFormRatingVal = Number($(this)[0].value)
      reviewFormRatingStar.css('width', (20 * reviewFormRatingVal) + '%')
    })

  // Ajax Contact Form JS
    var form = $('#contact-form');
    var formMessages = $('.form-message');
    $(form).submit(function(e) {
      e.preventDefault();
      var formData = form.serialize();
      $.ajax({
        type: 'POST',
        url: form.attr('action'),
        data: formData
      }).done(function(response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('alert alert-danger');
        $(formMessages).addClass('alert alert-success fade show');

        // Set the message text.
        formMessages.html("<button type='button' class='btn-close' data-bs-dismiss='alert'>&times;</button>");
        formMessages.append(response);

        // Clear the form.
        $('#contact-form input,#contact-form textarea').val('');
      }).fail(function(data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('alert alert-success');
        $(formMessages).addClass('alert alert-danger fade show');

        // Set the message text.
        if (data.responseText === '') {
          formMessages.html("<button type='button' class='btn-close' data-bs-dismiss='alert'>&times;</button>");
          formMessages.append(data.responseText);
        } else {
          $(formMessages).text('Oops! An error occurred and your message could not be sent.');
        }
      });
    });

  // scrollToTop Js
    function scrollToTop() {
    var $scrollUp = $('#scroll-to-top'),
      $lastScrollTop = 0,
      $window = $(window);
      $window.on('scroll', function () {
      var st = $(this).scrollTop();
        if (st > $lastScrollTop) {
            $scrollUp.removeClass('show');
            $('.sticky-header').removeClass('sticky-show');
        } else {
          if ($window.scrollTop() > 250) {
            $scrollUp.addClass('show');
            $('.sticky-header').addClass('sticky-show');
          } else {
            $scrollUp.removeClass('show');
            $('.sticky-header').removeClass('sticky-show');
          }
        }
        $lastScrollTop = st;
    });
    $scrollUp.on('click', function (evt) {
      $('html, body').animate({scrollTop: 0}, 50);
      evt.preventDefault();
    });
  }
  scrollToTop();
  varWindow.on('scroll', function(){
    if($('.sticky-header').length){
      var windowpos = $(this).scrollTop();
      if (windowpos >= 250) {
        $('.sticky-header').addClass('sticky');
      } else {
        $('.sticky-header').removeClass('sticky');
      }
    }
  });

})(window.jQuery);