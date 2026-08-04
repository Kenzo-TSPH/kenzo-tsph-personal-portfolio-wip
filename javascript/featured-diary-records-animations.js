const diaryData = [
    {
        date: "Aug 1, 2026",
        title: "The Beginning",
        paragraphs: [
            "Today I started building my portfolio diary and it's so exciting aaaah!!!",
            "I cannot even begin to believe that building it was even possible at this rate :) ahem u can scroll through this diary btw lol",
            "I have always wanted my portfolio to show some form of a great personality ...",
            "And by building this I just am so happy and feel extremely accomplished about it haha!",
            "Hopefully I will keep on building other things in my portfolio site and keep up the good work as well.",
            "Wish me luck everyone and goodbye!",
        ],
    },
    {
        date: "Aug 2, 2026",
        title: "Building the Notebook",
        paragraphs: [
            "Today I made the little notebook that sits on my table.",
            "It took a lot of fiddling to line up the pages with the book art.",
            "The trick was overlaying the text container on top of the book image and tweaking the margins until they matched the paper.",
            "Now it actually feels like the words are written inside the notebook which is so cool!",
            "Next up, I want the pages to feel alive on their own.",
        ],
    },
    {
        date: "Aug 3, 2026",
        title: "Scrolling Diary",
        paragraphs: [
            "I added more posts to the diary and let the readers flip between them with the little arrows.",
            "The left page holds the story and the right page shows off a screenshot.",
            "Anyone can scroll the left page quietly without touching the rest of the site, kind of like flipping a real diary.",
            "I still have tons of ideas for this notebook, so stay tuned for more entries!",
        ],
    },
];

const diaryDate = document.getElementById("diary-date");
const diaryTitle = document.getElementById("diary-title");
const diaryBody = document.getElementById("diary-body");
const diaryImage = document.getElementById("diary-image");
const backBtn = document.querySelector(".diary-back-btn");
const nextBtn = document.querySelector(".diary-next-btn");
const bookContent = document.querySelector(".book-content");
const bookTurnFrame = document.querySelector(".book-turn-frame");

const LEFT_TURN_FRAMES = [];
const RIGHT_TURN_FRAMES = [];
const TOTAL_FRAMES = 14;
const FRAME_INTERVAL = 60;

for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const frame = String(i).padStart(3, "0");
    LEFT_TURN_FRAMES.push(
        `assets/pixelArtToPutOnTheTable/Page Turning Left Animation/Turning_pages_left_${frame}.png`
    );
    RIGHT_TURN_FRAMES.push(
        `assets/pixelArtToPutOnTheTable/Page Turning Right Animation/Turning_pages_right_${frame}.png`
    );
}

function preloadFrames(frames) {
    frames.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
}

let currentIndex = 0;
let isTurning = false;

preloadFrames(LEFT_TURN_FRAMES);
preloadFrames(RIGHT_TURN_FRAMES);

function renderDiary() {
    const post = diaryData[currentIndex];

    diaryDate.textContent = post.date;
    diaryTitle.textContent = post.title;

    diaryBody.innerHTML = "";
    post.paragraphs.forEach((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        diaryBody.appendChild(p);
    });

    if (post.image) {
        diaryImage.src = post.image;
        diaryImage.hidden = false;
    } else {
        diaryImage.removeAttribute("src");
        diaryImage.hidden = true;
    }

    diaryBody.scrollTop = 0;

    updateButtons();
}

function updateButtons() {
    backBtn.hidden = currentIndex === 0;
    nextBtn.hidden = currentIndex === diaryData.length - 1;
}

function playTurnAnimation(frames) {
    if (isTurning) return;
    isTurning = true;

    bookContent.classList.add("is-turning");
    bookTurnFrame.hidden = false;

    let frameIndex = 0;

    const stepFrame = () => {
        bookTurnFrame.src = frames[frameIndex];
        frameIndex++;

        if (frameIndex < frames.length) {
            setTimeout(stepFrame, FRAME_INTERVAL);
        } else {
            setTimeout(finishTurn, FRAME_INTERVAL);
        }
    };

    const finishTurn = () => {
        bookTurnFrame.hidden = true;
        bookContent.classList.remove("is-turning");
        isTurning = false;
        renderDiary();
    };

    stepFrame();
}

backBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        playTurnAnimation(RIGHT_TURN_FRAMES);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < diaryData.length - 1) {
        currentIndex++;
        playTurnAnimation(LEFT_TURN_FRAMES);
    }
});

renderDiary();

const diarySection = document.querySelector('.diary-gamingCards');
const diaryTypedPart1 = document.getElementById('featuredDiary-typed-part1');
const diaryTypedPart2 = document.getElementById('diaryRecords');
const diaryCursor = document.querySelector('.featuredDiaryRecords .featured-cursor');

let diaryRevealTriggered = false;

function typeDiaryTitle() {
    if (!diaryTypedPart1 || !diaryTypedPart2) return;

    const parts = ['Recent', ' Diary Records'];
    const targets = [diaryTypedPart1, diaryTypedPart2];
    let partIndex = 0;
    let charIndex = 0;

    function step() {
        if (partIndex >= parts.length) {
            if (diaryCursor) diaryCursor.style.display = 'none';
            return;
        }

        const part = parts[partIndex];
        if (charIndex < part.length) {
            targets[partIndex].textContent += part[charIndex];
            charIndex++;
            setTimeout(step, 35);
        } else {
            partIndex++;
            charIndex = 0;
            setTimeout(step, 70);
        }
    }

    step();
}

function triggerDiaryAnimations() {
    if (diaryRevealTriggered) return;
    diaryRevealTriggered = true;

    typeDiaryTitle();

    const viewRecordsLink = document.getElementById('viewRecords');
    if (viewRecordsLink) viewRecordsLink.classList.add('visible');
}

const diaryObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            triggerDiaryAnimations();
            diaryObserver.disconnect();
        }
    });
}, { threshold: 0.25 });

if (diarySection) {
    diaryObserver.observe(diarySection);
}

const diaryHeader = document.querySelector('.featuredDiaryRecords');
if (diaryHeader) {
    diaryObserver.observe(diaryHeader);
}