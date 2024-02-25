"use strict";
// slider for meet our people module
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
// $(document).ready(function(){
//     $('.meet-our-people-content-slider').slick({
//         speed: 800,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: true,
//         dots: true,
//         appendArrows: $('.meet-our-people-content-navigation-arrows'),
//         appendDots: $('.meet-our-people-content-navigation-dots'),
//     });
// });
// card overlay events and functions
var jobCards = ['customer-service', 'information-technology', 'sales-marketing', 'comms-legal', 'product-management'];
var _loop_1 = function (i) {
    (_a = document.getElementById("".concat(jobCards[i], "-card"))) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var overlay = document.getElementById("".concat(jobCards[i], "-overlay"));
        var card = document.getElementById("".concat(jobCards[i], "-card"));
        openOverlay(overlay, card);
    });
    (_b = document.getElementById("".concat(jobCards[i], "-overlay-close"))) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        var overlay = document.getElementById("".concat(jobCards[i], "-overlay"));
        var card = document.getElementById("".concat(jobCards[i], "-card"));
        closeOverlay(overlay, card);
    });
};
for (var i = 0; i < jobCards.length; i++) {
    _loop_1(i);
}
var benefitCards = ['arena-tickets', 'employee-credit', 'community-days', 'personal-development', 'flexible-budget', 'company-pension'];
var _loop_2 = function (i) {
    (_c = document.getElementById("".concat(benefitCards[i], "-card"))) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
        var overlay = document.getElementById("".concat(benefitCards[i], "-overlay"));
        var card = document.getElementById("".concat(benefitCards[i], "-card"));
        openOverlay(overlay, card);
    });
    (_d = document.getElementById("".concat(benefitCards[i], "-overlay-close"))) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
        var overlay = document.getElementById("".concat(benefitCards[i], "-overlay"));
        var card = document.getElementById("".concat(benefitCards[i], "-card"));
        closeOverlay(overlay, card);
    });
};
for (var i = 0; i < benefitCards.length; i++) {
    _loop_2(i);
}
function closeOverlay(overlay, card) {
    if (window.matchMedia("(max-width: 1080px)").matches) {
        overlay.style.animation = 'closeOverlayMobile 0.2s linear';
    }
    else {
        overlay.style.animation = 'closeOverlay 0.2s linear';
    }
    setTimeout(function () { overlay.classList.add('hide'); }, 150);
    card.classList.remove('active');
}
function openOverlay(overlay, card) {
    if (card.classList.contains('active')) {
        closeOverlay(overlay, card);
    }
    else {
        overlay.classList.remove('hide');
        if (window.matchMedia("(max-width: 1080px)").matches) {
            overlay.style.animation = 'openOverlayMobile 0.2s linear';
        }
        else {
            overlay.style.animation = 'openOverlay 0.2s linear';
        }
        card.classList.add('active');
    }
}
// language toggle event and function
var langToggle = document.getElementById('language-toggle');
langToggle.addEventListener('click', function () {
    var active = langToggle.getAttribute('active');
    languageToggle(active);
});
function languageToggle(active) {
    var englishButton = document.getElementById('language-toggle-text-english');
    var germanButton = document.getElementById('language-toggle-text-german');
    var langToggleInner = document.getElementById('language-toggle-inner');
    if (active === 'english') {
        langToggle.setAttribute('active', 'german');
        langToggleInner.style.animation = 'langToGerman 0.2s linear';
        langToggleInner.style.left = '140px';
        englishButton.classList.remove('active');
        englishButton.classList.add('inactive');
        germanButton.classList.remove('inactive');
        germanButton.classList.add('active');
        langChange('german');
    }
    else if (active === 'german') {
        langToggle.setAttribute('active', 'english');
        langToggleInner.style.animation = 'langToEnglish 0.2s linear';
        langToggleInner.style.left = '0px';
        englishButton.classList.add('active');
        englishButton.classList.remove('inactive');
        germanButton.classList.add('inactive');
        germanButton.classList.remove('active');
        langChange('english');
    }
}
//changing language via JSON
var langObj;
var xmlhttp = new XMLHttpRequest;
xmlhttp.onload = function () {
    var obj = JSON.parse(this.responseText);
    langObj = obj;
};
xmlhttp.open("GET", "../JSON/hamburg.json");
xmlhttp.send();
function langChange(lang) {
    if (lang === 'english') {
        var node = void 0;
        for (var items in langObj) {
            node = document.getElementById(items);
            if (node) {
                // node.innerHTML = langObj[items].english;
            }
        }
    }
    else if (lang === 'german') {
        var node = void 0;
        for (var items in langObj) {
            node = document.getElementById(items);
            if (node) {
                // node.innerHTML = langObj[items].german;
            }
        }
    }
}
