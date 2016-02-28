$(document).ready(function() {

    var $homeMoreButton = $('.home__moreButton'),
        $toButton = $('.button_to'),
        $menuButton = $('.button_menu'),
        skipToButtonOnScroll;

    var offsets;

    //--------------------- methods --------------------------------

    var run = function() {
        prepareOffsets();
        checkScrollPosition();
        $toButton.css('visibility', 'visible');
        $('.home').addClass('visible');

        bindHandlers();
        bindProjectPopup();
        bindMenuPopup();
    };

    var prepareOffsets = function() {
        offsets = {
           skills: $('.skills').offset().top,
           portfolio: $('.portfolio').offset().top,
           history: $('.history').offset().top,
           contacts: $('.contacts').offset().top
       };
   };

    var bindHandlers = function() {

        $('input, textarea').focus(function(e) {
            $(e.target).removeClass('input_error');
        });

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

        $('.contants__sendMessage').click(function() {
            sendMail();
        });

        $('.contacts__writeAgain').click(function() {
            var $contactsFormWrap = $('.contacts__formWrap');

            $('.contacts__successEmailMessage')
                .css('visibility', 'hidden')
                .removeClass('visible');

            $('.contacts__successEmailMessageText').removeClass('visible');

            $contactsFormWrap.css('height', 'auto');
            $contactsFormWrap.children().show();
            $contactsFormWrap.addClass('visible');
        });

        $(document).on('scroll', function(e) {
            checkScrollPosition();
        });

        $(window).on('resize', function(e) {
            setMenuButtonPosition();
            prepareOffsets();
        });
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
                                //$contactsFormWrap.find('input:first').focus();
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

    var bindProjectPopup = function() {
        $('.open-popup-link').magnificPopup({
              type: 'inline',
              midClick: true,
              mainClass: 'mfp-project',
              removalDelay: 300,
              callbacks: {
                  beforeOpen: function() {
                      $toButton.hide();
                      $menuButton.hide();
                  },
                  open: function() {
                      this.slider = $('.projectPopup__screens', this.content).bxSlider({
                          mode: 'fade'
                      });

                      $toButton
                          .show()
                          .css('opacity', 0);

                      $menuButton
                          .show()
                          .css('opacity', 0);
                  },
                  afterClose: function() {
                      this.slider.destroySlider();
                      $toButton.css('opacity', 1);
                      $menuButton.css('opacity', 1);
                  }
             }
        });
    };

    var setMenuButtonPosition = function() {
        var windowWidth = $(window).width();

        $menuButton
            .css('left', (windowWidth - (windowWidth > 1000 ? 94 : 70)) + 'px')
            .css('visibility', 'visible');
    }

    var bindMenuPopup = function() {
        var isMenuOpening = false;
        var isMenuOpened = false;

        setMenuButtonPosition();

        $menuButton.magnificPopup({
              type: 'inline',
              midClick: true,
              mainClass: 'mfp-menu',
              removalDelay: 200,
              showCloseBtn: false,
              callbacks: {
                  beforeOpen: function() {
                      $toButton.hide();

                      animate($menuButton, 'animated-roll');

                      $menuButton.find('.fa')
                        .removeClass('fa-bars')
                        .addClass('fa-times');

                        $menuButton.addClass('button_menuClose');
                  },
                  open: function() {
                     isMenuOpening = true;
                     isMenuOpened = true;

                    $toButton
                        .show()
                        .css('opacity', 0);
                  },
                  beforeClose: function() {
                      animate($menuButton, 'animated-roll');

                     $menuButton.removeClass('button_menuClose');

                      $menuButton.find('.fa')
                        .removeClass('fa-times')
                        .addClass('fa-bars');
                  },
                  afterClose: function() {
                      isMenuOpened = false;

                      $toButton.css('opacity', 1);
                  }
             }
        });

        $menuButton.click(function() {
            if (isMenuOpened) {
                 if (isMenuOpening) {
                     isMenuOpening = false;
                 } else {
                     $.magnificPopup.close();
                }
            }
        });
    }

    var animate = function($el, animationClass, callback) {
        animationClass = animationClass || 'animated bounce';

        $el.addClass(animationClass);

        $el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $el.removeClass(animationClass);
            callback && callback($el);
        });
    };

    var sendMail = function()
    {
        var $contactsFormWrap = $('.contacts__formWrap'),
            $contactsForm = $('.contacts__form'),
            $nameInput = $contactsForm.find('input[name="name"]'),
            $emailInput = $contactsForm.find('input[name="email"]'),
            $messageTextarea = $contactsForm.find('textarea[name="message"]'),
            message;

        if ($nameInput.val() && $emailInput.val() && $messageTextarea.val()) {

            message = $nameInput.val() + ' - ' + $emailInput.val() + ' - ' + $messageTextarea.val();

            $nameInput.attr('disabled', 'true');
            $emailInput.attr('disabled', 'true');
            $messageTextarea.attr('disabled', 'true');

            $.ajax({
                url: 'mail.php',
                type: 'POST',
                data: {
                    message: message
                },
                success: function() {
                    $contactsFormWrap.height($contactsFormWrap.height());
                    $contactsFormWrap.children().hide();
                    $contactsFormWrap.removeClass('visible');

                    $('.contacts__successEmailMessage')
                        .css('visibility', 'visible')
                        .addClass('visible')
                        .one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function() {
                            $('.contacts__successEmailMessageText').addClass('visible');
                        });

                    $nameInput.removeAttr('disabled');
                    $emailInput.removeAttr('disabled');
                    $messageTextarea.removeAttr('disabled');

                    $nameInput.val('');
                    $emailInput.val('');
                    $messageTextarea.val('');
                }
            });
        } else {
            if (!$nameInput.val()) {
                $nameInput.addClass('input_error');
            }
            if (!$emailInput.val()) {
                $emailInput.addClass('input_error');
            }
            if (!$messageTextarea.val()) {
                $messageTextarea.addClass('input_error');
            }
        }
    };

    run();
});
