function scroll_news() {
$(function() {
    $('#dvmq ul').eq(0).fadeOut('slow', function() {
    $(this).clone().appendTo($(this).parent()).fadeIn('slow');
    $(this).remove();
        });
    });
}
setInterval('scroll_news()', 5000);
 







