$(document).ready(function (){
    $('body').append('<p>chatbot 서비스를 시작합니다.</p>')
    $('.tab-section').hide();
    $('#tabs a').bind('clikc',function (e){
        $('.tab-section:visible').hide();
        $(this.hash).show();
        e.preventDefault;
    })

    externalLinks();
    $('a[href$="mp4"]').addClass('video')
    $('a[href$="pdf"]').addClass('pdf')
    $('a[href$="gif"]').addClass('image')
});

$('#tabs a').bind('click',function (e){
    $('#tabs a.current').removeClass('current');
    $('.tab-section:visible').hide();
    $(this.hash).show();
    $(this).addClass('current');
    e.preventDefault;
}).filter(':first').click();

function externalLinks() {
$('a.new-window').bind('click',function (){
    var location=$(this).attr('href');
    window.open(location);
    e.preventDefault();
});
}
