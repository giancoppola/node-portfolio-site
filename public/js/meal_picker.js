"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is inclusive and the minimum is inclusive
}
// -------------------------------------------------------------------------------------------------------------------------------------
// JS Animation setup for falling food emojis
var emojiArr = ['🍝', '🍜', '🍛', '🍣', '🍱', '🍤', '🍥',
    '🥮', '🥡', '🥟', '🥧', '🥣', '🥗', '🍲',
    '🥘', '🍳', '🧆', '🥙', '🍖', '🍗', '🥩',
    '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮',
    '🌯'];
var emoji = document.createElement('span');
emoji.setAttribute('id', 'emoji');
var bgAnim = document.getElementById("bg-anim");
bgAnim.appendChild(emoji);
var height = 100;
var rotate = 0;
emojiFall();
function emojiFall() {
    height = -20;
    emoji.innerHTML = getRandomEmoji();
    emoji.style.top = height + 'dvh';
    emoji.style.left = getRandomInt(1, 90) + 'dvw';
    emoji.style.transform = "rotate(".concat(rotate, "deg)");
    bgAnim.appendChild(emoji);
}
setInterval(fall, 10);
function fall() {
    // if emoji is below page extent start again
    if (height >= 100) {
        emojiFall();
    }
    height += 0.2;
    rotate += 0.4;
    emoji.style.top = height + 'dvh';
    emoji.style.transform = "rotate(".concat(rotate, "deg)");
}
function getRandomEmoji() {
    var rand = getRandomInt(0, emojiArr.length);
    return emojiArr[rand];
}
// -------------------------------------------------------------------------------------------------------------------------------------
// FORM VALIDATION //
var vegBtn = document.querySelector("#veggie");
var typeAnyBtn = document.querySelector("#Tany");
var meatBtn = document.querySelector("#meat");
var quickBtn = document.querySelector("#quick");
var lengthAnyBtn = document.querySelector("#Lany");
var longBtn = document.querySelector("#long");
var typeBtnArr = [vegBtn, typeAnyBtn, meatBtn];
var lengthBtnArr = [quickBtn, lengthAnyBtn, longBtn];
typeBtnArr.forEach(function (node) {
    node.addEventListener("click", function () {
        activeBtnSelection(node, 'type');
        validationCheck();
    });
});
lengthBtnArr.forEach(function (node) {
    node.addEventListener("click", function () {
        activeBtnSelection(node, 'length');
        validationCheck();
    });
});
function activeBtnSelection(node, type) {
    if (type === "type") {
        node.classList.toggle('active');
        var newArr = [vegBtn, typeAnyBtn, meatBtn];
        var index = newArr.indexOf(node);
        newArr.splice(index, 1);
        newArr.forEach(function (item) {
            item.classList.remove("active");
        });
    }
    else if (type === "length") {
        node.classList.toggle('active');
        var newArr = [quickBtn, lengthAnyBtn, longBtn];
        var index = newArr.indexOf(node);
        newArr.splice(index, 1);
        newArr.forEach(function (item) {
            item.classList.remove("active");
        });
    }
}
var submitBtn = document.querySelector("#submit");
function validationCheck() {
    var typeVal = false;
    var lengthVal = false;
    typeBtnArr.forEach(function (node) {
        if (node.classList.contains("active")) {
            typeVal = true;
        }
    });
    lengthBtnArr.forEach(function (node) {
        if (node.classList.contains("active")) {
            lengthVal = true;
        }
    });
    if (typeVal && lengthVal) {
        submitBtn.classList.add("active");
    }
    else {
        submitBtn.classList.remove("active");
    }
}
var alertMsg = document.querySelector('#alert');
submitBtn.addEventListener("click", function () {
    if (submitBtn.classList.contains("active")) {
        console.log("accepted");
    }
    else {
        console.log("rejected");
    }
});
// -------------------------------------------------------------------------------------------------------------------------------------
