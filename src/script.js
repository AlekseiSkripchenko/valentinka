const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const catComment = document.getElementById("cat-comment");

document.addEventListener('dragstart', (e) => {
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
});


envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});


const hintLine = "Поймай, скажу секрет!;)";
const catLines = [
    hintLine,
    "Ноуп! Я быстрее.",
    "Ты не можешь поймать кнопочку! Или можешь?",
    "У меня лапки.",
    "Ты меня гладишь или ловишь?",
    "Ну почти-почти. Поймаешь - скажу секрет!",
    "Мдааааааа!",
    "Ту слоу, хуман!",
    "Лузер, тупа не ловится!",
    "Я на шаг впереди!",
    "Поймаешь - кое-чё дам... 😼",
    "Респект за попытку.",
    "Кто поймает, тот секрет узнает",
    "Почти, но нет.",
];

let secretRevealed = false;

function setCatComment(msg, ms = 2200){
    if(!catComment) return;
    clearTimeout(setCatComment._t);
    catComment.textContent = msg;
    if(ms > 0){
        setCatComment._t = setTimeout(()=>{
            catComment.textContent = "";
        }, ms);
    }
}

noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.21s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

    const available = secretRevealed ? catLines.filter(l => l !== hintLine) : catLines;
    const line = available[Math.floor(Math.random() * available.length)];
    setCatComment(line, 1800);
});

noBtn.addEventListener("click", (e) => {
    if (secretRevealed) return;
    e.stopPropagation();
    setCatComment("Damn girl, ты поймала меня. Хороший аим.", 3000);
    secretRevealed = true;
    const secret = "Красава, поймала! Маленький подарок ждёт тебя в твоём офисе. Хинт: там любит спать Жефик😸";
    setTimeout(() => alert(secret), 80);
});


yesBtn.addEventListener("click", () => {
    title.textContent = "Свиданочка!";

    if (secretRevealed) {
        setCatComment("Вери найс, вери найс! Хихихи", 0);
    } else {
        setCatComment("А ты сумела найти секрет? Я бы на твоём месте поискал ;)", 0);
    }

    catImg.src = "src/cat_dance.gif";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
});
