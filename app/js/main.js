$(document).ready(function () {



    $(function () {
        if (!Modernizr.input.placeholder) {
            $('input').placeholder()
        }
    });




    var myModule = (function () {

        // module initialization
        var init = function () {
            _setUpListeners();
            console.log('module is running');
        };

        var popup1


        // setting up the event listeners
        var _setUpListeners = function () {
            $('.link').on('click', function (ev) {
                ev.preventDefault();
                popup1 = $('.add-project-popup').bPopup({
                    easing: 'easeOutBack',
                    speed: 450,
                    transition: 'slideDown',
                    escClose: true,
                    onClose: function () {
                        $('.add-project-form').trigger('reset');
                    }
                });
            });

            $('.form').on('submit', function (ev) {
                ev.preventDefault();
                _validate();
            });
            $('.form').on('reset', _clearForm);
        };


        // runs form validation process
        var _validate = function () {
            var form = $('form');
            var inputs = form.find('input, textarea').not('input[type="file"]');
            var valid = true;
            inputs.each(function (index, element) {
                if (($(element).val()).length === 0) {
                    _createToolTip($(element));
                    if ((form.find('.error-message-box')).length) {
                        form.find('.error-message-box').show()
                    };
                    $(element).addClass('error');
                    $(element).on('keypress', function () {
                        $(element)
                            .removeClass('error')
                            .addClass('success')
                            .qtip("destroy", true);
                    });
                    valid = false;
                } else {
                    $(element).addClass('success')
                        .qtip("destroy", true);
                }
            });
            if (valid) {
                var _successMessage = $('.success-message').bPopup({
                    easing: 'easeOutBack',
                    speed: 450,
                    transition: 'slideDown',
                    escClose: true,
                    onOpen: function () {
                        popup1.close();
                    }
                });

            };
            return valid;
        };




        // creates  qtup tooltips 
        var _createToolTip = function () {
            var form = $('form');
            var inputs = form.find('input, textarea').not('input[type="file"]');
            inputs.each(function (i, e) {
                if (($(e).val()).length === 0) {
                    $(e).qtip({
                        content: $(e).attr('qtip-content'),
                        position: {
                            my: $(e).attr('my'),
                            at: $(e).attr('at'),
                            target: $(e)
                        },
                        show: true,
                        style: {
                            classes: 'qtip-mystyle'
                        },
                        hide: {
                            event: 'keydown'
                        }
                    });
                };
            });
        };


        // cleares/resettes the form
        var _clearForm = function () {
            var form = $('form');
            var inputs = form.find('input, textarea').not('input[type="file"]');
            inputs.each(function (i, e) {
                form.find('.error-message-box').hide();
                form.find('.success-message-box').hide();
                $(e).removeClass('error')
                    .removeClass('success')
                    .qtip("destroy", true);
                console.log('form is cleared')
            });
        };


        return {
            init: init
        };

    })();


    // runs the module if needed
    if ($('.form').length) {
        myModule.init();
    }




});