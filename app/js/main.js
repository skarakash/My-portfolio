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

        // setting up the event listeners
        var _setUpListeners = function () {
            $('.link').on('click', function (ev) {
                ev.preventDefault();
                _showPopUp();
            });
            $('.form').on('submit', function (ev) {
                ev.preventDefault();
                _validate();
            });
            $('.form').on('reset', _clearForm);
        };


        // starting pop up form
        var _showPopUp = function () {
            $('.add-project-popup').bPopup({
                easing: 'easeOutBack',
                speed: 450,
                transition: 'slideDown',
                onClose: function () {
                    $('.add-project-form').trigger('reset');
                    $('.input')
                        .removeClass('error')
                        .removeClass('success')
                        .qtip("destroy", true);
                }
            });
        };

        // runs form validation process
        var _validate = function () {
            var form = $('form');
            var inputs = form.find('input, textarea').not('input[type="file"]');
            inputs.each(function (index, element) {
                if (($(element).val()).length === 0) {
                    console.log('EMPTY INPUT');
                    _createToolTip($(element));
                    $(element).addClass('error');
                    $(element).on('keypress', function () {
                        $(element)
                            .removeClass('error')
                            .addClass('success')
                            .qtip("destroy", true);
                    });

                } else {
                    $(element).addClass('success')
                        .qtip("destroy", true);
                    console.log('NOT EMPTY INPUT');
                }
            });
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