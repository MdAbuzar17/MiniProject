let userSeq = [];
let gameSeq = [];
let btns = ["red", "yellow", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("game has started");
        started = true;
    }
    levelUp();
})

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randCol = btns[randIdx];
    let randBtn = document.querySelector(`.${randCol}`);  

    // console.log(randIdx);
    // console.log(randCol);
    // console.log(randBtn);
    gameSeq.push(randCol);
    // console.log(gameSeq);

    gameFlash(randBtn);
}

function checkAns(idx) {
    // console.log("curr level ",level);
    // let idx = level-1;

    if(gameSeq[idx] === userSeq[idx]) {
        if(gameSeq.length === userSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        highScore = Math.max(highScore, level);
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. <br>
        Your Highest Score is ${highScore}.  <br> Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPressed() {
    let btn = this;
    userFlash(btn);
    let userCol = btn.getAttribute("id");
    userSeq.push(userCol);
    // console.log(userSeq);
    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(let btn of allbtns) {
    btn.addEventListener("click", btnPressed);
}

function reset() {
    userSeq = [];
    gameSeq = [];
    started = false;
    level = 0;
}