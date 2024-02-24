// BURGER MENU START -
const burgerMenu = document.querySelector("#burger") as HTMLButtonElement;
const nav = document.querySelector("#nav") as HTMLElement;
/* when clicking the burger menu, add open class to it and nav,
   and disable scrolling on the body */
burgerMenu.addEventListener("click", () => {
    document.querySelectorAll(".line").forEach(element => {
        element.classList.toggle('open');
    });
    nav.classList.toggle("open");
    document.body.classList.toggle("fixed");
})
// when user clicks on a menu link it closes the menu
document.querySelectorAll(".nav-link").forEach(element => {
    element.addEventListener("click", () => {
        nav.classList.remove("open");
        document.body.classList.remove("fixed");
        document.querySelectorAll(".line").forEach(element => {
            element.classList.remove('open');
        });
    });
})
// - BURGER MENU END

// changes the year as you scroll down the experience module, and also scrolls it down with view
const experienceYear = document.querySelector("#year") as HTMLDivElement;
const experienceSection = document.querySelector("#main-experience") as HTMLElement;
const fullPage = document.body.parentElement as HTMLElement;
const experienceDistance = () => { return experienceSection.offsetTop - fullPage.scrollTop };

document.addEventListener("scroll", (event) => {
    let height = experienceDistance();
    if (height < 5 && height > -3790){
        let distance: number = Math.abs(height);
        if (experienceYear != null ){
            if (distance < 5){
                experienceYear.style.top = 0 + "px";
            }
            else{
                experienceYear.style.top = distance + "px";
            }
            const distances: number[] = [114, 264, 364, 464, 564, 1414, 1864, 2864, 3064, 3214, 3364, 3514, 3614, 3714, 3764];
            if (distance < distances[0]){ experienceYear.innerHTML = "2009"; }
            else if (distance > distances[0] && distance < distances[1]){ experienceYear.innerHTML = "2010"; }
            else if (distance > distances[1] && distance < distances[2]){ experienceYear.innerHTML = "2011"; }
            else if (distance > distances[2] && distance < distances[3]){ experienceYear.innerHTML = "2012"; }
            else if (distance > distances[3] && distance < distances[4]){ experienceYear.innerHTML = "2013"; }
            else if (distance > distances[4] && distance < distances[5]){ experienceYear.innerHTML = "2014"; }
            else if (distance > distances[5] && distance < distances[6]){ experienceYear.innerHTML = "2015"; }
            else if (distance > distances[5] && distance < distances[6]){ experienceYear.innerHTML = "2015"; }
            else if (distance > distances[6] && distance < distances[7]){ experienceYear.innerHTML = "2016"; }
            else if (distance > distances[7] && distance < distances[8]){ experienceYear.innerHTML = "2017"; }
            else if (distance > distances[8] && distance < distances[9]){ experienceYear.innerHTML = "2018"; }
            else if (distance > distances[9] && distance < distances[10]){ experienceYear.innerHTML = "2019"; }
            else if (distance > distances[10] && distance < distances[11]){ experienceYear.innerHTML = "2020"; }
            else if (distance > distances[11] && distance < distances[12]){ experienceYear.innerHTML = "2021"; }
            else if (distance > distances[12] && distance < distances[13]){ experienceYear.innerHTML = "2022"; }
            else if (distance > distances[13]){ experienceYear.innerHTML = "2023"; }
            // console.log(distance);
        }
    }
});

// experience slider
// $(document).ready(function(){
//     $('.main-experience-container-roles').slick({
//         speed: 800,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: true,
//         dots: false,
//         appendArrows: $('.main-experience-container-navigation'),
//         adaptiveHeight: true,
//         mobileFirst: true,
//         responsive: [
//             {
//                 breakpoint: 1030,
//                 settings: "unslick",
//             }
//         ]
//     });
// });

// on changing slide on the experience slider, update the year based on current slide
const mobileYear = document.querySelector("#mobile-year") as HTMLDivElement;
$('.main-experience-container-roles').on('afterChange', function(event, slick, currentSlide, nextSlide){
    switch(currentSlide){
        case 0:
            mobileYear.innerHTML = "2009";
            break;
        case 1:
            mobileYear.innerHTML = "2011";
            break;
        case 2:
            mobileYear.innerHTML = "2014";
            break;
        case 3:
            mobileYear.innerHTML = "2014";
            break;
        case 4:
            mobileYear.innerHTML = "2015";
            break;
        case 5:
            mobileYear.innerHTML = "2016";
            break;
        case 6:
            mobileYear.innerHTML = "2016";
            break;
        case 7:
            mobileYear.innerHTML = "2017";
            break;
    }
});

// projects slider
// $(document).ready(function(){
//     $('.main-projects-container-grid').slick({
//         speed: 800,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: true,
//         dots: false,
//         appendArrows: $('.main-projects-container-navigation'),
//         mobileFirst: true,
//         responsive: [
//             {
//                 breakpoint: 800,
//                 settings: "unslick",
//             }
//         ]
//     });
// });

// skillset slider
// $(document).ready(function(){
//     $('.main-skillset-container-grid').slick({
//         speed: 800,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: true,
//         dots: false,
//         appendArrows: $('.main-skillset-container-navigation'),
//         mobileFirst: true,
//         responsive: [
//             {
//                 breakpoint: 800,
//                 settings: "unslick",
//             }
//         ]
//     });
// });

// refreshes slick on crossing the mobile and tablet breakpoints to
// ensure they enable for users changing window / screen size
const mobileMedia = window.matchMedia("(max-width: 800px)");
const tabletMedia = window.matchMedia("(max-width: 1030px)");
mobileMedia.onchange = (query) => {
    if (query.matches){
        console.log('mobile viewport')
        // $('.main-experience-container-roles').slick('refresh');
        // $('.main-projects-container-grid').slick('refresh');
        // $('.main-skillset-container-grid').slick('refresh');
    }
    else{
        // do nothing
    }
}
tabletMedia.onchange = (query) => {
    if (query.matches){
        console.log('tablet viewport')
        // $('.main-experience-container-roles').slick('refresh');
    }
    else{
        // do nothing
    }
}