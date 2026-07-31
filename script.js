//Type writer Animation

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

    // My github username , star counts and collaborators if theres any showing up

    const GITHUB_USERNAME = 'TarekMoustafaElsayed';
    const avatarContainer = document.querySelector('.featured-projects .avatars');

    if (avatarContainer) {
        const img = document.createElement('img');
        img.src = `https://github.com/${GITHUB_USERNAME}.png`;
        img.alt = GITHUB_USERNAME;
        img.onerror = () => {
            avatarContainer.textContent = GITHUB_USERNAME.charAt(0).toUpperCase();
        };
        avatarContainer.appendChild(img);
    }

    const repoStars = document.querySelector('.repo-stars');
    if (repoStars) {
        const repo = repoStars.dataset.repo;
        fetch(`https://api.github.com/repos/${repo}`)
            .then(res => {
                if (!res.ok) throw new Error('GitHub API error');
                return res.json();
            })
            .then(data => {
                repoStars.querySelector('.star-count').textContent = data.stargazers_count;
            })
            .catch(() => {
                repoStars.querySelector('.star-count').textContent = '0';
            });
    }
});

document.querySelector('.project-card').addEventListener('click', function (e) {
    if (e.target.closest('a')) return;
    window.location.href = 'html/projectsDetails/kazamasSushi.html';
});