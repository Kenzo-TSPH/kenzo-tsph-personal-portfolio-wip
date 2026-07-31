 // Featured projects: typing + scroll-triggered reveal animations

    const featuredSection = document.querySelector('.featured-projects');
    const featuredPart1 = document.getElementById('featured-typed-part1');
    const featuredPart2 = document.getElementById('projects');
    const featuredCursor = document.querySelector('.featured-cursor');

    let revealTriggered = false;

    function typeFeaturedTitle() {
        if (!featuredPart1 || !featuredPart2) return;

        const parts = ['Featured ', 'Projects'];
        const targets = [featuredPart1, featuredPart2];
        let partIndex = 0;
        let charIndex = 0;

        function step() {
            if (partIndex >= parts.length) {
                if (featuredCursor) featuredCursor.style.display = 'none';
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

    function triggerFeaturedAnimations() {
        if (revealTriggered) return;
        revealTriggered = true;

        typeFeaturedTitle();

        document.querySelectorAll('.reveal-fade-right, .card-fade-top, .card-fade-bottom')
            .forEach(el => el.classList.add('visible'));
    }

    const featuredObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerFeaturedAnimations();
                featuredObserver.disconnect();
            }
        });
    }, { threshold: 0.25 });

    if (featuredSection) {
        featuredObserver.observe(featuredSection);
    }