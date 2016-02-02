$(function () {
    if (!Modernizr.input.placeholder) {
        $('input').placeholder()
    }
});


$('.add-project').bind('click', function (e) {
    e.preventDefault();
    $('.add-project-popup').bPopup({
        easing: 'easeOutBack',
        speed: 450,
        transition: 'slideDown'
    });

//    $('.close-window-img').on('click', function () {
//        $(".add-project-popup").css({
//            "display": "none"
//        });
//        $(".b-modal").css({
//            "display": "none"
//        });
//
//    });
});