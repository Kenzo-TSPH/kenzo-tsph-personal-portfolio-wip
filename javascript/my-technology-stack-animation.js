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
