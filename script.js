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

document.addEventListener("DOMContentLoaded", () => {

    const marquees = [

        {
            element: document.querySelector(".upper-icons .icon-track"),
            speed: 0.9,
            direction: 1
        },

        {
            element: document.querySelector(".lower-icons .icon-track"),
            speed: 0.9,
            direction: -1
        },

        {
            element: document.querySelector(".text-slide.left"),
            speed: 1.2,
            direction: -1
        },

        {
            element: document.querySelector(".text-slide.right"),
            speed: 1.2,
            direction: 1
        }

    ].filter(marquee => marquee.element);

    function getCyclePhase(marquee) {

        if (!marquee.cycleWidth) return 0;

        const phase = (-marquee.position / marquee.cycleWidth) % 1;

        return phase < 0 ? phase + 1 : phase;

    }

    function buildMarquee(marquee, preservePosition = false) {

        const preservedPhase = preservePosition ? getCyclePhase(marquee) : null;

        if (!marquee.templates) {
            marquee.templates = Array.from(marquee.element.children).map(child => child.cloneNode(true));
        }

        marquee.element.innerHTML = "";

        marquee.templates.forEach(template => {
            marquee.element.appendChild(template.cloneNode(true));
        });

        const containerWidth = marquee.element.parentElement.getBoundingClientRect().width;
        const cycleWidth = marquee.element.getBoundingClientRect().width;
        const targetWidth = containerWidth + cycleWidth;

        while (marquee.element.getBoundingClientRect().width < targetWidth) {

            marquee.templates.forEach(template => {
                marquee.element.appendChild(template.cloneNode(true));
            });

        }

        marquee.cycleWidth = cycleWidth;
        marquee.position = preservePosition
            ? -preservedPhase * marquee.cycleWidth
            : (marquee.direction === 1 ? -marquee.cycleWidth : 0);
        marquee.element.style.transform = `translateX(${marquee.position}px)`;

    }

    function wrapMarqueePosition(marquee) {

        const cycleWidth = marquee.cycleWidth;

        if (!cycleWidth) return;

        if (marquee.direction === -1) {

            while (marquee.position <= -cycleWidth) {
                marquee.position += cycleWidth;
            }

            return;
        }

        while (marquee.position >= 0) {
            marquee.position -= cycleWidth;
        }

    }

    marquees.forEach(marquee => {

        marquee.targetSpeed = marquee.speed;
        marquee.currentSpeed = marquee.speed;
        buildMarquee(marquee);

    });

    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            marquees.forEach(marquee => buildMarquee(marquee, true));

        }, 100);

    });

    if (document.fonts && document.fonts.ready) {

        document.fonts.ready.then(() => {

            marquees.forEach(marquee => buildMarquee(marquee, true));

        });

    }

    function animate() {

        marquees.forEach(marquee => {

            marquee.currentSpeed +=
                (marquee.targetSpeed - marquee.currentSpeed) * 0.08;

            marquee.position +=
                marquee.currentSpeed * marquee.direction;

            wrapMarqueePosition(marquee);

            marquee.element.style.transform =
                `translateX(${marquee.position}px)`;

        });

        requestAnimationFrame(animate);

    }

    animate();

    const upperIcons = document.querySelector(".upper-icons");
    const lowerIcons = document.querySelector(".lower-icons");
    const textRows = document.querySelectorAll(".text-row");

    upperIcons.addEventListener("mouseenter", () => {
        marquees[0].targetSpeed = 0;
    });

    upperIcons.addEventListener("mouseleave", () => {
        marquees[0].targetSpeed = marquees[0].speed;
    });

    lowerIcons.addEventListener("mouseenter", () => {
        marquees[1].targetSpeed = 0;
    });

    lowerIcons.addEventListener("mouseleave", () => {
        marquees[1].targetSpeed = marquees[1].speed;
    });

    textRows[0].addEventListener("mouseenter", () => {
        marquees[2].targetSpeed = 0;
    });

    textRows[0].addEventListener("mouseleave", () => {
        marquees[2].targetSpeed = marquees[2].speed;
    });

    textRows[1].addEventListener("mouseenter", () => {
        marquees[3].targetSpeed = 0;
    });

    textRows[1].addEventListener("mouseleave", () => {
        marquees[3].targetSpeed = marquees[3].speed;
    });

});
