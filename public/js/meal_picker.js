"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is inclusive and the minimum is inclusive
}
// -------------------------------------------------------------------------------------------------------------------------------------
// JS Animation setup for falling food emojis
const emojiArr = ['🍝', '🍜', '🍛', '🍣', '🍱', '🍤', '🍥',
    '🥮', '🥡', '🥟', '🥧', '🥣', '🥗', '🍲',
    '🥘', '🍳', '🧆', '🥙', '🍖', '🍗', '🥩',
    '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮',
    '🌯'];
let emoji = document.createElement('span');
emoji.setAttribute('id', 'emoji');
const bgAnim = document.getElementById("bg-anim");
bgAnim.appendChild(emoji);
let height = 100;
let rotate = 0;
emojiFall();
function emojiFall() {
    height = -20;
    emoji.innerHTML = getRandomEmoji();
    emoji.style.top = height + 'dvh';
    emoji.style.left = getRandomInt(1, 90) + 'dvw';
    emoji.style.transform = `rotate(${rotate}deg)`;
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
    emoji.style.transform = `rotate(${rotate}deg)`;
}
function getRandomEmoji() {
    let rand = getRandomInt(0, emojiArr.length);
    return emojiArr[rand];
}
// -------------------------------------------------------------------------------------------------------------------------------------
// FORM VALIDATION //
const vegBtn = document.querySelector("#veggie");
const typeAnyBtn = document.querySelector("#Tany");
const meatBtn = document.querySelector("#meat");
const quickBtn = document.querySelector("#quick");
const lengthAnyBtn = document.querySelector("#Lany");
const longBtn = document.querySelector("#long");
const typeBtnArr = [vegBtn, typeAnyBtn, meatBtn];
const lengthBtnArr = [quickBtn, lengthAnyBtn, longBtn];
typeBtnArr.forEach((node) => {
    node.addEventListener("click", () => {
        activeBtnSelection(node, 'type');
        validationCheck();
    });
});
lengthBtnArr.forEach((node) => {
    node.addEventListener("click", () => {
        activeBtnSelection(node, 'length');
        validationCheck();
    });
});
function activeBtnSelection(node, type) {
    if (type === "type") {
        node.classList.toggle('active');
        let newArr = [vegBtn, typeAnyBtn, meatBtn];
        let index = newArr.indexOf(node);
        newArr.splice(index, 1);
        newArr.forEach((item) => {
            item.classList.remove("active");
        });
    }
    else if (type === "length") {
        node.classList.toggle('active');
        let newArr = [quickBtn, lengthAnyBtn, longBtn];
        let index = newArr.indexOf(node);
        newArr.splice(index, 1);
        newArr.forEach((item) => {
            item.classList.remove("active");
        });
    }
}
const submitBtn = document.querySelector("#submit");
function validationCheck() {
    let typeVal = false;
    let lengthVal = false;
    typeBtnArr.forEach((node) => {
        if (node.classList.contains("active")) {
            typeVal = true;
        }
    });
    lengthBtnArr.forEach((node) => {
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
const alertMsg = document.querySelector('#alert');
submitBtn.addEventListener("click", () => {
    if (submitBtn.classList.contains("active")) {
        console.log("accepted");
    }
    else {
        console.log("rejected");
    }
});
// -------------------------------------------------------------------------------------------------------------------------------------
