document.addEventListener("DOMContentLoaded", () => {

    // Easter egg video behind the header title

    const easterEggTitle = document.getElementById('easterEggTitle');
    const easterEggVideo = document.getElementById('easterEggVideo');
    const canvas = document.getElementById("videoTextCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let animationId = null;

    const titleStyle = getComputedStyle(easterEggTitle);
    const titleText = easterEggTitle.querySelector(".title-text");

    function renderVideoInText() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = "source-over";

        ctx.font =
            `${titleStyle.fontStyle}
         ${titleStyle.fontWeight}
         ${titleStyle.fontSize}
         ${titleStyle.fontFamily}`;

        ctx.fillStyle = "#fff";
        ctx.textBaseline = "alphabetic";
        ctx.textAlign = "left";

        ctx.fillStyle = "white";

        ctx.fillText(
            titleText.textContent,
            0,
            parseFloat(titleStyle.fontSize)
        );

        ctx.globalCompositeOperation = "source-in";

        ctx.drawImage(
            easterEggVideo,
            0,
            0,
            canvas.width,
            canvas.height
        );

        animationId = requestAnimationFrame(renderVideoInText);
    }

    function resizeCanvas() {
        const rect = easterEggTitle.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    document.fonts.ready.then(() => {
        resizeCanvas();
    });

    if (easterEggTitle && easterEggVideo) {
        easterEggTitle.addEventListener('click', () => {
            easterEggVideo.pause();
            easterEggVideo.currentTime = 0;
            easterEggTitle.classList.add('video-playing');
            easterEggVideo.play().then(() => {
                renderVideoInText();
            }).catch(() => { });
        });

        easterEggVideo.addEventListener('ended', () => {

            easterEggTitle.classList.remove("video-playing");

            setTimeout(() => {
                cancelAnimationFrame(animationId);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 700);
        });
    }

});