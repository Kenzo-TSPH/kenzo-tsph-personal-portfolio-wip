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

let currentIndex = 0;

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

backBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderDiary();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < diaryData.length - 1) {
        currentIndex++;
        renderDiary();
    }
});

renderDiary();