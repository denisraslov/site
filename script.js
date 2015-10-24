$(document).ready(function() {

    var $homeMoreButton = $('.home__moreButton'),
        $toButton = $('.button_to');

    var animate = function($el, animationClass, callback) {
        animationClass = animationClass || 'animated bounce';

        $el.addClass(animationClass);

        $el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $el.removeClass(animationClass);
            callback && callback($el);
        });
    };

    var skipToButtonOnScroll;

    $('.menu__item').click(function(e) {
        var sectionSelector = $(e.target).attr('href');

        $.magnificPopup.close();

        skipToButtonOnScroll = true;

        if (sectionSelector == 'home') {
            $toButton.hide();
        }

        $(sectionSelector).ScrollTo({
            duration: 300,
            easing: 'linear',
            callback: function() {
                if (sectionSelector != 'home') {
                    $toButton.show();
                }

                skipToButtonOnScroll = false;
            }
        });

        e.stopPropagation();
    });

    $homeMoreButton.click(function() {
        $('.skills').ScrollTo({
            duration: 300,
            easing: 'linear'
        });
    });

    $toButton.click(function() {
        var buttonOffset;

        if (!$toButton.data('up')) {

            buttonOffset = $toButton.offset().top;

            for (var section in offsets) {
                if (buttonOffset <= offsets[section]) {

                    if (section != 'contacts') {
                        setTimeout(function() {
                            animate($toButton);
                        }, 100);
                    }

                    $('.' + section).ScrollTo({
                        duration: 300,
                        easing: 'linear'
                    });

                    break;
                }
            }

            $('.' + section).ScrollTo({
                duration: 300,
                easing: 'linear'
            });

        } else {
            skipToButtonOnScroll = true;
            $toButton.hide();

            $('#home').ScrollTo({
                duration: 300,
                easing: 'linear',
                callback: function() {
                    skipToButtonOnScroll = false;
                }
            });
        }
    });

    $('.home').addClass('visible');

    var offsets = {
        skills: $('.skills').offset().top,
        portfolio: $('.portfolio').offset().top,
        history: $('.history').offset().top,
        contacts: $('.contacts').offset().top
    };

    var checkScrollPosition = function() {
        var scrollTopPosition = $(document).scrollTop(),
            scrollBottomPosition = scrollTopPosition + $(window).height();

        /*
        if ($(document).scrollTop() >= offsets.skills) {
            $('.skills')
                .addClass('animated bounceInDown');
        }
        */

        if (!skipToButtonOnScroll) {

            if (scrollTopPosition < offsets.skills) {
                $toButton.hide();
            } else {
                $toButton.show();
            }

        }

        var $socialLinks = $('.contacts__socialLink'),
            $contactsFormWrap = $('.contacts__formWrap');

        if (scrollBottomPosition >= ($contactsFormWrap.offset().top - 100)) {

            if (!$socialLinks[0].visible) {
                $socialLinks[0].visible = true;
                $socialLinks.css('opacity', 0);

                var animateIcon = function(index) {
                        if (index >= 0) {
                            setTimeout(function() {
                                animate($($socialLinks[index]), 'animated bounceInLeft');
                                $($socialLinks[index]).css('opacity', 1);
                                animateIcon(index - 1);
                            }, index < $socialLinks.length - 1 ? 100 : 0);
                        }
                        if (index == 0) {
                            setTimeout(function() {
                                $contactsFormWrap.addClass('visible');
                                $contactsFormWrap.find('input:first').focus();
                            }, 500);
                        }
                    };

                animateIcon($socialLinks.length - 1);
            }
        }

        if (scrollBottomPosition < $socialLinks.offset().top) {
            $socialLinks[0].visible = false;
            $socialLinks.css('opacity', 0);
            $contactsFormWrap.removeClass('visible');
        }

        //bottom of document
        if (scrollBottomPosition == $(document).height()) {

            $toButton.data('up', '1');

            $toButton.find('.fa')
                .removeClass('fa-arrow-down')
                .addClass('fa-arrow-up');

            animate($toButton, 'animated-roll-fast');

        } else if ($toButton.data('up')) {

            $toButton.data('up', '');

            $toButton.find('.fa')
                .removeClass('fa-arrow-up')
                .addClass('fa-arrow-down');

            animate($toButton, 'animated-roll');
        }
    };

    checkScrollPosition();

    $(document).on('scroll', function(e) {
        checkScrollPosition();
    });

    $('.open-popup-link').magnificPopup({
          type: 'inline',
          midClick: true,
          mainClass: 'mfp-project',
          removalDelay: 300,
          callbacks: {
              beforeOpen: function() {
                  $toButton.hide();
                  $('.button_menu').hide();
              },
              open: function() {
                  this.slider = $('.projectPopup__screens', this.content).bxSlider({
                      mode: 'fade'
                  });

                  $toButton
                      .show()
                      .css('opacity', 0);

                  $('.button_menu')
                      .show()
                      .css('opacity', 0);
              },
              afterClose: function() {
                  this.slider.destroySlider();
                  $toButton.css('opacity', 1);
                  $('.button_menu').css('opacity', 1);
              }
         }
    });

    var isMenuOpening = false;
    var isMenuOpened = false;

    $('.button_menu')
        .css('left', ($(window).width() - 94) + 'px')
        .css('visibility', 'visible');

    $('.button_menu').magnificPopup({
          type: 'inline',
          midClick: true,
          mainClass: 'mfp-menu',
          removalDelay: 200,
          showCloseBtn: false,
          callbacks: {
              beforeOpen: function() {
                  $toButton.hide();

                  animate($('.button_menu'), 'animated-roll');

                  $('.button_menu .fa')
                    .removeClass('fa-bars')
                    .addClass('fa-times');

                    $('.button_menu').addClass('button_menuClose');
              },
              open: function() {
                 isMenuOpening = true;
                 isMenuOpened = true;

                $toButton
                    .show()
                    .css('opacity', 0);
              },
              beforeClose: function() {
                  animate($('.button_menu'), 'animated-roll');

                  $('.button_menu').removeClass('button_menuClose');

                  $('.button_menu .fa')
                    .removeClass('fa-times')
                    .addClass('fa-bars');
              },
              afterClose: function() {
                  isMenuOpened = false;

                  $toButton.css('opacity', 1);
              }
         }
    });

    $('.button_menu').click(function() {
        if (isMenuOpened) {
             if (isMenuOpening) {
                 isMenuOpening = false;
             } else {
                 $.magnificPopup.close();
            }
        }
    });
});
