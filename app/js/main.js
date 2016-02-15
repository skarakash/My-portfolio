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
        };

        var popup1;


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
            var inputs = form.find('input, textarea');
            var valid = true;
            inputs.each(function (index, element) {
                if ($(element).val() === '') {
                    $(element).siblings('.tooltip').show();
                    if ((form.find('.error-message-box')).length) {
                        form.find('.error-message-box').show()
                    };
                    $(element).addClass('error');
                    $(element).on('keypress', function () {
                        $(element)
                            .removeClass('error')
                            .addClass('success')
                            .siblings('.tooltip').hide();
                    });
                    $(element).on('change', function () {
                        $(element)
                            .removeClass('error')
                            .addClass('success')
                            .siblings('.tooltip').hide();
                    });
                    valid = false;
                } else {
                    $(element).addClass('success')
                        .siblings('.tooltip').hide();
                }
            });
            if (valid) {
                popup1.close();
                var _successMessage = $('.success-message').bPopup({
                    easing: 'easeOutBack',
                    speed: 450,
                    transition: 'slideDown',
                    escClose: true,
                });
            };
            return valid;
        };







        // cleares/resettes the form
        var _clearForm = function () {
            var form = $('form');
            var inputs = form.find('input, textarea');
            inputs.each(function (i, e) {
                form.find('.error-message-box').hide();
                form.find('.success-message-box').hide();
                $(e).removeClass('error')
                    .removeClass('success')
                    .siblings('.tooltip').css('display', 'none');
                $('.fake-placeholder').text('Загрузите изображение');
            });
        };


        // creates uploaded file name appearing in input
        $('input[type="file"]').on('change', function () {
            $('input[type="file"]').siblings('.tooltip').css('display', 'none');
            var file = ($('input[type="file"]')).val();
            var fileName = file.split('\\');
            fileName = fileName[fileName.length - 1];
            $('.fake-placeholder').text(fileName);
        });





        return {
            init: init
        };

    })();


    // runs the module if needed
    if ($('.form').length) {
        myModule.init();
    }




});