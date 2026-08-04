document.addEventListener("DOMContentLoaded", () => {

    const marquees = [

        {
            element: document.querySelector(".upper-icons .icon-track"),
            speed: 1,
            direction: 1
        },

        {
            element: document.querySelector(".lower-icons .icon-track"),
            speed: 1,
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

        // Re-attach hover handlers to cloned pixelated images
        marquee.element.querySelectorAll('img.pixelated-icon').forEach(img => {
            const hoverColor = img.dataset.hoverColor;
            const normalColor = img.dataset.normalColor;
            const char = img.dataset.char;
            const fontFamily = img.dataset.fontFamily;
            if (hoverColor && char && fontFamily) {
                img.addEventListener('mouseenter', () => {
                    img.src = renderPixelIcon(char, fontFamily, hoverColor);
                });
                img.addEventListener('mouseleave', () => {
                    img.src = renderPixelIcon(char, fontFamily, normalColor);
                });
            }
        });

        const containerWidth = marquee.element.parentElement.getBoundingClientRect().width;
        const cycleWidth = marquee.element.getBoundingClientRect().width;
        const targetWidth = containerWidth + cycleWidth;

        while (marquee.element.getBoundingClientRect().width < targetWidth) {

            marquee.templates.forEach(template => {
                marquee.element.appendChild(template.cloneNode(true));
            });

            // Re-attach handlers for newly appended clones too
            marquee.element.querySelectorAll('img.pixelated-icon').forEach(img => {
                const hoverColor = img.dataset.hoverColor;
                const normalColor = img.dataset.normalColor;
                const char = img.dataset.char;
                const fontFamily = img.dataset.fontFamily;
                if (hoverColor && char && fontFamily) {
                    img.addEventListener('mouseenter', () => {
                        img.src = renderPixelIcon(char, fontFamily, hoverColor);
                    });
                    img.addEventListener('mouseleave', () => {
                        img.src = renderPixelIcon(char, fontFamily, normalColor);
                    });
                }
            });
        }

        marquee.cycleWidth = cycleWidth;
        marquee.position = preservePosition
            ? -preservedPhase * marquee.cycleWidth
            : (marquee.direction === 1 ? -marquee.cycleWidth : 0);
        marquee.element.style.transform = `translateX(${Math.round(marquee.position)}px)`;

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

    function getIconChar(el) {
        const before = getComputedStyle(el, '::before');
        const content = before.content;
        if (!content || content === 'none' || content === 'normal') return '';
        try { const parsed = JSON.parse(content); return typeof parsed === 'string' ? parsed : ''; }
        catch { return ''; }
    }

    const hoverColorMap = {
        'fa-github': '#000000',
        'fa-html5': '#CC4622',
        'fa-css3-alt': '#1265A0',
        'fa-square-js': '#DBC218',
        'devicon-tailwindcss-original': '#38BDF8',
        'devicon-flutter-plain': '#014B87',
        'fa-node-js': '#2B852B',
        'devicon-mongodb-plain': '#47A248',
        'fa-figma': '#a259ff',
        'devicon-react-original': '#61DAFB',
        'devicon-vscode-plain': '#007ACC',
    };

    function getHoverColor(classList) {
        for (const cls of classList) {
            if (hoverColorMap[cls]) return hoverColorMap[cls];
        }
        return null;
    }

    function renderPixelIcon(char, fontFamily, color) {
        const srcCanvas = document.createElement('canvas');
        srcCanvas.width = 256;
        srcCanvas.height = 256;
        const srcCtx = srcCanvas.getContext('2d');
        srcCtx.fillStyle = color;
        srcCtx.font = `200px ${fontFamily}`;
        srcCtx.textAlign = 'center';
        srcCtx.textBaseline = 'middle';
        srcCtx.fillText(char, 128, 128);

        const PIXEL_SIZE = 30;
        const pixelCanvas = document.createElement('canvas');
        pixelCanvas.width = PIXEL_SIZE;
        pixelCanvas.height = PIXEL_SIZE;
        const pixelCtx = pixelCanvas.getContext('2d');
        pixelCtx.imageSmoothingEnabled = false;
        pixelCtx.drawImage(srcCanvas, 0, 0, PIXEL_SIZE, PIXEL_SIZE);

        return pixelCanvas.toDataURL();
    }

    function pixelateIcon(iconEl) {
        const char = getIconChar(iconEl);
        if (!char) return;
        const cs = getComputedStyle(iconEl);
        const fontFamily = cs.fontFamily;
        const normalColor = cs.color;
        const hoverColor = getHoverColor(iconEl.classList);

        const dataUrl = renderPixelIcon(char, fontFamily, normalColor);

        const img = document.createElement('img');
        img.src = dataUrl;
        img.style.cssText = 'width:72px;height:72px;flex-shrink:0;';
        img.className = iconEl.className + ' pixelated-icon';
        img.draggable = false;

        // Store metadata for cloned elements
        img.dataset.char = char;
        img.dataset.fontFamily = fontFamily;
        img.dataset.normalColor = normalColor;
        if (hoverColor) img.dataset.hoverColor = hoverColor;

        if (hoverColor) {
            img.addEventListener('mouseenter', () => {
                img.src = renderPixelIcon(char, fontFamily, hoverColor);
            });
            img.addEventListener('mouseleave', () => {
                img.src = renderPixelIcon(char, fontFamily, normalColor);
            });
        }

        iconEl.replaceWith(img);
    }

    function initMarqueeAnimations() {
        document.querySelectorAll('.icon-track i').forEach(pixelateIcon);
        marquees.forEach(marquee => {
            marquee.targetSpeed = marquee.speed;
            marquee.currentSpeed = marquee.speed;
            buildMarquee(marquee);
        });
    }

    let resizeTimer;

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            marquees.forEach(marquee => buildMarquee(marquee, true));
        }, 100);
    });

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(initMarqueeAnimations);
    } else {
        initMarqueeAnimations();
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
