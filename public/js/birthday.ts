interface Weight {
    [key: string]: number;
}

let weighting: Weight = {
    "portugal": 0,
    "italy": 0,
    "england": 0,
    "france": 0
};

interface StringObj {
    [key: string]: string;
}

let winnerText: StringObj = {
    "portugal": "A trip to Lisbon to see Chiara with Ad!",
    "italy": "A trip to Trapani with Ad and Gian!",
    "england": "A trip to the Lake District with the whole gang!",
    "france": "A trip to Paris to see the ballet with Trev!"
}

let winnerTextArr = [
    "A trip to Lisbon to see Chiara with Ad!",
    "A trip to Trapani with Ad and Gian!",
    "A trip to the Lake District with the whole gang!",
    "A trip to Paris to see the ballet with Trev!"
]

let currentStep: string;

const q1Btns = document.querySelectorAll(".q1-btn") as NodeListOf<HTMLLinkElement>;
const q2Btns = document.querySelectorAll(".q2-btn") as NodeListOf<HTMLLinkElement>;
const q3Btns = document.querySelectorAll(".q3-btn") as NodeListOf<HTMLLinkElement>;
const q4Btns = document.querySelectorAll(".q4-btn") as NodeListOf<HTMLLinkElement>;
const q5Btns = document.querySelectorAll(".q5-btn") as NodeListOf<HTMLLinkElement>;

q1Btns.forEach((node) => {
    node.addEventListener("click", () => {
        let key = node.getAttribute("country") as string;
        weighting[key] = weighting[key] + 1;
    })
})
q2Btns.forEach((node) => {
    node.addEventListener("click", () => {
        let key = node.getAttribute("country") as string;
        weighting[key] = weighting[key] + 1;
    })
})
q3Btns.forEach((node) => {
    node.addEventListener("click", () => {
        let key = node.getAttribute("country") as string;
        weighting[key] = weighting[key] + 1;
    })
})
q4Btns.forEach((node) => {
    node.addEventListener("click", () => {
        let key = node.getAttribute("country") as string;
        weighting[key] = weighting[key] + 1;
    })
})
q5Btns.forEach((node) => {
    node.addEventListener("click", () => {
        let key = node.getAttribute("country") as string;
        weighting[key] = weighting[key] + 1;
    })
})

let winner = "";
let highest = 0

const revealContainer = document.querySelector("#reveal-container") as HTMLDivElement;
const revealBtn = document.querySelector("#reveal") as HTMLButtonElement;
revealBtn.addEventListener("click", () => {
    for(let item in weighting){
        if(weighting[item]> highest){
          highest = weighting[item];
          winner = item
        }
      }
    revealBtn?.remove();
    let winText = document.createElement("p");
    winText.setAttribute("id", "win-text");
    winText.innerText = winnerText[winner];
    revealContainer.appendChild(winText);
    let nextBtn = document.createElement("a");
    nextBtn.innerText = 'Not good?';
    nextBtn.addEventListener("click", () => {
        let winText = document.querySelector("#win-text") as HTMLParagraphElement;
        winText.innerHTML = winnerTextArr[Math.floor(Math.random() * 4)];
    })
    revealContainer.appendChild(nextBtn);
})
