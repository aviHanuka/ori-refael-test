(function ($){
    $(document).ready(function () {
        // consts
        const phonePattern = /^[0-9\-\+\s()]{7,15}$/;
        const _words = {
            'required': 'שדה חובה.',
            'invalid_phone': 'מספר הטלפון אינו תקין',
        };
        let currentIndex = 0;
        let numberOfSlides = 4;
        let numberOfSlidesStep = 0.5;
        const slides = $('.slide');

        $(document).on("click", ".contact_us_btn a", function (e){e.preventDefault();_main_web.go_to( $(this) );});
        $(document).on("click", ".contact_us_btn_mobile a", function (e){e.preventDefault();_main_web.go_to( $(this), true );});
        $(document).on("click", "#nav_mobile_wrap_btn", function (e){e.preventDefault();_main_web.toggle_mobile_menu( $(this));});
        $(document).on("input", "#contact_form_block_form input", function (){ _main_web.toggle_label( $(this) );});
        $(document).on("submit", "#contact_form_block_form", function (e){ _main_web.validate_form(e);});
        $(document).on("click", ".floating_arrow_button", function (e){ _main_web.go_to_top( $(this) );});
        $(document).on("scroll", function (e){ _main_web.toggle_back_to_btn();});

        const _main_web = {
            'init': function () {},
            'go_to': function ( $this, bool = false ) {
                if ( bool === true ) {$("#nav_mobile_wrap_btn").click();}
                $('html, body').animate({
                    scrollTop: $($this.attr('href')).offset().top
                }, 1000,function() {
                    $('#contact_form_block_form input:first').focus();
                });
            },
            'toggle_mobile_menu': function ( $this ) {
                const _target_menu = $($this.attr('data-toggle'));
                if ( _target_menu && _target_menu.length > 0 ) {
                    if ( !$this.hasClass('active') ) {
                        _target_menu.show();
                        $('body').addClass('noOverflow');
                    } else {
                        $('body').removeClass('noOverflow');
                        _target_menu.hide();
                    }
                    $this.toggleClass('active');
                }
                return true;
            },
            'toggle_label': function ( $this, bool = false ) {
                const _target = $("label[for=" + $this.attr('id') + "]");
                if ( _target && _target.length > 0 ) {
                    if ( $this.val() && bool === true || $this.val() ) {
                        _target.addClass('active');
                        this.clear_error( $this );
                    } else {
                        _target.removeClass('active');
                    }
                }
                return true;
            },
            'clear_error': function ( $element ) {
                const _err = $("#" + $element.attr('aria-labelledby'));
                if ( _err && _err.length > 0  ) {_err.html("");}
                return true;
            },
            'validate_form': function ( event ) {
                let isValid = true;
                const _el1 = $("#contact_form_block_form_name");
                const _el2 = $("#contact_form_block_form_tel");
                const _err1 = $("#" + _el1.attr('aria-labelledby'));
                const _err2 = $("#" + _el2.attr('aria-labelledby'));
                if ( _err1 && _err1.length > 0  ) {_err1.html("");}
                if ( _err2 && _err2.length > 0  ) {_err2.html("");}
                if ( _el1.val().trim() === '' ) {
                    if ( _err1 && _err1.length > 0  ) {_err1.text(_words.required);}
                    isValid = false;
                }
                if ( _el2.val().trim() === '' ) {
                    if ( _err2 && _err2.length > 0  ) {_err2.text(_words.required);}
                    isValid = false;
                }
                if ( !phonePattern.test( _el2.val() ) ) {
                    if ( _err2 && _err2.length > 0  ) {_err2.text(_words.invalid_phone);}
                    isValid = false;
                }
                console.log(isValid);
                if ( !isValid ) {event.preventDefault();}
            },
            'go_to_top': function ( $this ) {
                $('html, body').animate({
                    scrollTop: $($this.attr('data-target')).offset().top
                }, 1200);
            },
            'toggle_back_to_btn': function () {
                const _target_btn = $("#floating_arrow");
                if ( $(window).scrollTop() > 300 ) {_target_btn.fadeIn();} else {_target_btn.fadeOut();}
            },
        };
        _main_web.init();


        const _slider = {
            'init': function () {
                let _desktop = 4;
                if ( window.innerWidth > 780 && slides.length === 4 ) {
                    _desktop = 3.5;
                }
                numberOfSlides = window.innerWidth < 780 ? 1 : _desktop;
                numberOfSlidesStep = (numberOfSlides/2);
            },
            'go_to_next_slide': function () {
                if ( currentIndex < (slides.length - numberOfSlidesStep) ) {
                    currentIndex = Math.min(currentIndex + numberOfSlidesStep, slides.length - numberOfSlides);
                    console.log();
                } else {currentIndex = 0;}
                this.update_slider();
            },
            'go_to_prev_slide': function () {
                if ( currentIndex > 0 ) {currentIndex = Math.max(currentIndex - numberOfSlidesStep, 0)} else {currentIndex = slides.length - numberOfSlides;}
                this.update_slider();
            },
            'update_slider': function () {
                const newTransform = -(currentIndex * (100 / numberOfSlides)) + '%';
                $('.slides').css('transform', 'translateX(' + newTransform + ')');
            },
        };
        _slider.init();
        $(document).on("click", ".next", function (e){e.preventDefault();_slider.go_to_next_slide();});
        $(document).on("click", ".prev", function (e){e.preventDefault();_slider.go_to_prev_slide();});
        // $(window).on('resize', _slider.update_slider());

    });
})(jQuery);
