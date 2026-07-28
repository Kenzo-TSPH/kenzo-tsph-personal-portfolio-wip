document.addEventListener('DOMContentLoaded', function () {
    const greetingPart = document.getElementById('greeting-part');
    const namePart = document.getElementById('myName');

    const greetingText = "Greetings, I'm ";
    const nameText = "Tarek Moustafa";

    let charIndex = 0;
    let isTypingName = false;

    function typeWriter() {
        if (!isTypingName) {
            if (charIndex < greetingText.length) {
                greetingPart.textContent += greetingText[charIndex];
                charIndex++;
                setTimeout(typeWriter, 35);
            } else {
                isTypingName = true;
                charIndex = 0;
                setTimeout(typeWriter, 35);
            }
        } else {
            if (charIndex < nameText.length) {
                namePart.textContent += nameText[charIndex];
                charIndex++;
                setTimeout(typeWriter, 50);
            } else {
                document.querySelector('.cursor').style.display = 'none';
            }
        }
    }

    typeWriter();
});

document.addEventListener("DOMContentLoaded", () => {

    const profile = document.querySelector(".profile-leftSide");
    const ring = document.querySelector(".ring-progress");
    const coin = document.querySelector(".coin");
    const frontFace = document.querySelector(".front-face");
    const backFace = document.querySelector(".back-face");

    const radius = 244;
    const circumference = 2 * Math.PI * radius;

    const words = document.querySelectorAll(".highlight-word");
    const paragraph = document.querySelector(".aboutMe-text");

    let isCoolingDown = false;
    let cooldownTimer;

    ring.style.transition = "none";
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;

    requestAnimationFrame(() => {
        ring.style.transition = "stroke-dashoffset 2s linear";
    });

    function startHighlightAnimation() {

        paragraph.classList.add("dimmed");
        paragraph.classList.add("highlighting");

    }

    profile.addEventListener("mouseenter", () => {

        if (isCoolingDown) return;

        ring.style.transition = "stroke-dashoffset 2s linear";

        ring.style.strokeDashoffset = 0;

    });

    ring.addEventListener("transitionend", () => {

        if (ring.style.strokeDashoffset !== "0") return;

        coin.style.animation = "none";

        coin.offsetHeight;

        coin.style.animation = "spin 1.5s ease-in-out forwards";

        frontFace.style.animation = "none";
        backFace.style.animation = "none";

        frontFace.offsetHeight;

        frontFace.style.animation = "swapFront 1.6s linear forwards";
        backFace.style.animation = "swapBack 1.6s linear forwards";

        startHighlightAnimation();

        isCoolingDown = true;
        ring.style.animation = "ringCooldown 10s linear forwards";

        clearTimeout(cooldownTimer);

        cooldownTimer = setTimeout(() => {

            // Everything after 10 seconds

            coin.style.animation = "none";

            coin.offsetHeight;

            coin.style.animation = "spin 1.5s ease-in-out forwards";

            frontFace.style.animation = "none";
            backFace.style.animation = "none";

            frontFace.offsetHeight;

            frontFace.style.animation = "swapBack 1.6s linear forwards";
            backFace.style.animation = "swapFront 1.6s linear forwards";

            paragraph.classList.remove("dimmed");

            paragraph.classList.remove("highlighting");

            ring.style.animation = "none";

            ring.style.stroke = "";

            ring.style.transition = "none";
            ring.style.strokeDashoffset = circumference;

            isCoolingDown = false;

        }, 10000);

    });

    profile.addEventListener("mouseleave", () => {

        if (isCoolingDown) return;

        ring.style.transition = "none";

        ring.style.strokeDashoffset = circumference;

    });

});