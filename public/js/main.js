// slick slider for the tech page
$(document).ready(function(){
    $('.tech-slider').slick({
        dots: false,
        appendDots: '#slick-dots',
        arrows: true,
        nextArrow: document.getElementById('next'),
        prevArrow: document.getElementById('prev'),
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        rows: 0,
        responsive: [
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    rows: 0,
                    dots: true,
                    appendDots: '#slick-dots',
                    arrows: true,
                    nextArrow: document.getElementById('next'),
                    prevArrow: document.getElementById('prev')
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    rows: 0,
                    dots: true,
                    appendDots: '#slick-dots',
                    arrows: true,
                    nextArrow: document.getElementById('next'),
                    prevArrow: document.getElementById('prev')
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 0,
                    dots: false,
                    appendDots: '#slick-dots',
                    arrows: true,
                    nextArrow: document.getElementById('next'),
                    prevArrow: document.getElementById('prev')
                }
            }
        ]
    });
});