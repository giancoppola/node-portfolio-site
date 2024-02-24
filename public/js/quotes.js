$(document).ready(function(){
    $('#grid-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        appendArrows: $('.grid-container-navigation-arrows'),
        appendDots: $('.grid-container-navigation-dots'),
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 800,
                settings: "unslick",
            }
        ]
    });
});

const mobileMedia = window.matchMedia("(max-width: 800px)");
mobileMedia.onchange = (query) => {
    if (query.matches){
        console.log('mobile viewport')
        $('#grid-slider').slick('refresh');
    }
    else{
        // do nothing
    }
}