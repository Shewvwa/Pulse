$(document).ready(function(){
    $('.carousel_inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="/img/chevron left solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="/img/chevron right solid.png"></button>'
    });
    $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
            $(this)
              .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
              .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
    });
    

    function tuggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog_item_content').eq(i).toggleClass('catalog_item_content_active');
                $('.catalog_item_list').eq(i).toggleClass('catalog_item_list_active');
            });
        });
    };
    tuggleSlide('.catalog_item_link');
    tuggleSlide('.catalog_item_back');

    //modal

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn();

    });
    $('.modal_close').on('click', function(){
        $('.overlay, #consultation, #thank, #order').fadeOut();
    });
    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal_descr').text($('.catalog_item_subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
    })

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thank').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function(){
        if($(this).scrollTop() > 1300) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    new WOW().init();
});
      