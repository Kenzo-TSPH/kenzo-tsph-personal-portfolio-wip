// Let's Connect: typing + scroll-triggered reveal animations

const connectSection = document.querySelector('.letUsConnect');
const connectPart1 = document.getElementById('let-us-connect-part1');
const connectPart2 = document.getElementById('letUsConnect');
const connectCursor = document.querySelector('.letUsConnect .featured-cursor');

let connectRevealTriggered = false;

function typeConnectTitle() {
    if (!connectPart1 || !connectPart2) return;

    const parts = ["Let's ", 'Connect!'];
    const targets = [connectPart1, connectPart2];
    let partIndex = 0;
    let charIndex = 0;

    function step() {
        if (partIndex >= parts.length) {
            if (connectCursor) connectCursor.style.display = 'none';
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

function triggerConnectAnimations() {
    if (connectRevealTriggered) return;
    connectRevealTriggered = true;

    typeConnectTitle();

    const bookAChat = document.getElementById('bookAChat');
    if (bookAChat) bookAChat.classList.add('visible');

    const paragraph = document.querySelector('.let-us-connect-paragraph');
    if (paragraph) paragraph.classList.add('visible');
}

const connectObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            triggerConnectAnimations();
            connectObserver.disconnect();
        }
    });
}, { threshold: 0.25 });

if (connectSection) {
    connectObserver.observe(connectSection);
}

//for contact me form

const contactPart1 = document.getElementById('contact-me-part1');
const contactPart2 = document.getElementById('contact-me');
const contactCursor = document.querySelector('.contact-me-section .featured-cursor');

function typeConnectTitle2() {
    if (!contactPart1 || !contactPart2) return;

    const parts = ["Contact ", 'Me!'];
    const targets = [contactPart1, contactPart2];
    let partIndex = 0;
    let charIndex = 0;

    function step() {
        if (partIndex >= parts.length) {
            if (contactCursor) contactCursor.style.display = 'none';
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

typeConnectTitle2();
