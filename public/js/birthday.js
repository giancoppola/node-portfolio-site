"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var weighting = {
    "portugal": 0,
    "italy": 0,
    "england": 0,
    "france": 0
};
var winnerText = {
    "portugal": "A trip to Lisbon to see Chiara with Ad!",
    "italy": "A trip to Trapani with Ad and Gian!",
    "england": "A trip to the Lake District with the whole gang!",
    "france": "A trip to Paris to see the ballet with Trev!"
};
var winnerTextArr = [
    "A trip to Lisbon to see Chiara with Ad!",
    "A trip to Trapani with Ad and Gian!",
    "A trip to the Lake District with the whole gang!",
    "A trip to Paris to see the ballet with Trev!"
];
var currentStep;
var q1Btns = document.querySelectorAll(".q1-btn");
var q2Btns = document.querySelectorAll(".q2-btn");
var q3Btns = document.querySelectorAll(".q3-btn");
var q4Btns = document.querySelectorAll(".q4-btn");
var q5Btns = document.querySelectorAll(".q5-btn");
q1Btns.forEach(function (node) {
    node.addEventListener("click", function () {
        var key = node.getAttribute("country");
        weighting[key] = weighting[key] + 1;
    });
});
q2Btns.forEach(function (node) {
    node.addEventListener("click", function () {
        var key = node.getAttribute("country");
        weighting[key] = weighting[key] + 1;
    });
});
q3Btns.forEach(function (node) {
    node.addEventListener("click", function () {
        var key = node.getAttribute("country");
        weighting[key] = weighting[key] + 1;
    });
});
q4Btns.forEach(function (node) {
    node.addEventListener("click", function () {
        var key = node.getAttribute("country");
        weighting[key] = weighting[key] + 1;
    });
});
q5Btns.forEach(function (node) {
    node.addEventListener("click", function () {
        var key = node.getAttribute("country");
        weighting[key] = weighting[key] + 1;
    });
});
var winner = "";
var highest = 0;
var revealContainer = document.querySelector("#reveal-container");
var revealBtn = document.querySelector("#reveal");
revealBtn.addEventListener("click", function () {
    for (var item in weighting) {
        if (weighting[item] > highest) {
            highest = weighting[item];
            winner = item;
        }
    }
    revealBtn === null || revealBtn === void 0 ? void 0 : revealBtn.remove();
    var winText = document.createElement("p");
    winText.setAttribute("id", "win-text");
    winText.innerText = winnerText[winner];
    revealContainer.appendChild(winText);
    var nextBtn = document.createElement("a");
    nextBtn.innerText = 'Not good?';
    nextBtn.addEventListener("click", function () {
        var winText = document.querySelector("#win-text");
        winText.innerHTML = winnerTextArr[Math.floor(Math.random() * 4)];
    });
    revealContainer.appendChild(nextBtn);
});
