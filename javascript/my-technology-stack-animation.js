 // My Technology Stack: typing + scroll-triggered reveal animations

    const techStackSection = document.querySelector('.my-technology-stack');
    const techStackPart1 = document.getElementById('myTechStack-typed-part1');
    const techStackPart2 = document.getElementById('myTechStack');
    const techCursor = document.querySelector('.my-technology-stack-title .featured-cursor');

    let techRevealTriggered = false;

    function typeTechStackTitle() {
        if (!techStackPart1 || !techStackPart2) return;

        const parts = ['My ', 'Technology Stack'];
        const targets = [techStackPart1, techStackPart2];
        let partIndex = 0;
        let charIndex = 0;

        function step() {
            if (partIndex >= parts.length) {
                if (techCursor) techCursor.style.display = 'none';
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

    function triggerTechStackAnimations() {
        if (techRevealTriggered) return;
        techRevealTriggered = true;

        typeTechStackTitle();

        techStackSection.querySelectorAll('.stack-fade-right, .stack-fade-left')
            .forEach(el => el.classList.add('visible'));
    }

    function getIconChar(el) {
        const before = getComputedStyle(el, '::before');
        const content = before.content;
        if (!content || content === 'none' || content === 'normal') return '';
        try { const parsed = JSON.parse(content); return typeof parsed === 'string' ? parsed : ''; }
        catch { return ''; }
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

    function pixelateFontIcon(iconEl) {
        const char = getIconChar(iconEl);
        if (!char) return;

        const cs = getComputedStyle(iconEl);
        const fontFamily = cs.fontFamily;
        const normalColor = cs.color;

        const dataUrl = renderPixelIcon(char, fontFamily, normalColor);

        const img = document.createElement('img');
        img.src = dataUrl;
        img.className = iconEl.className + ' pixelated-icon';
        img.draggable = false;

        iconEl.replaceWith(img);
    }

    function pixelateImgIcon(imgEl) {
        fetch(imgEl.src)
            .then(res => res.text())
            .then(svgText => {
                const dataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgText)));
                const loadedImg = new Image();
                loadedImg.onload = () => {
                    const srcCanvas = document.createElement('canvas');
                    srcCanvas.width = 256;
                    srcCanvas.height = 256;
                    const srcCtx = srcCanvas.getContext('2d');
                    srcCtx.drawImage(loadedImg, 0, 0, 256, 256);

                    const PIXEL_SIZE = 30;
                    const pixelCanvas = document.createElement('canvas');
                    pixelCanvas.width = PIXEL_SIZE;
                    pixelCanvas.height = PIXEL_SIZE;
                    const pixelCtx = pixelCanvas.getContext('2d');
                    pixelCtx.imageSmoothingEnabled = false;
                    pixelCtx.drawImage(srcCanvas, 0, 0, PIXEL_SIZE, PIXEL_SIZE);

                    imgEl.src = pixelCanvas.toDataURL();
                    imgEl.classList.remove('tech-stack-icon-img');
                    imgEl.classList.add('pixelated-icon');
                };
                loadedImg.src = dataUrl;
            });
    }

    function initTechStackPixelation() {
        document.querySelectorAll('.tech-stack-grid .tech-stack-item').forEach(item => {
            const iconI = item.querySelector('i');
            const iconImg = item.querySelector('img');

            if (iconI) {
                pixelateFontIcon(iconI);
            } else if (iconImg) {
                pixelateImgIcon(iconImg);
            }
        });
    }

    const techStackObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerTechStackAnimations();
                techStackObserver.disconnect();
            }
        });
    }, { threshold: 0.25 });

    if (techStackSection) {
        techStackObserver.observe(techStackSection);
    }

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(initTechStackPixelation);
    } else {
        initTechStackPixelation();
    }
