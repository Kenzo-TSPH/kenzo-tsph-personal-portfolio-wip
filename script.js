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

    // Star counts for every card (Shields.io - no GitHub rate limits)

    document.querySelectorAll('.repo-stars').forEach(repoStars => {
        const repo = repoStars.dataset.repo;
        const countEl = repoStars.querySelector('.star-count');
        if (!repo || !countEl) return;

        fetch(`https://img.shields.io/github/stars/${repo}.json`)
            .then(res => {
                if (!res.ok) throw new Error('Shields error');
                return res.json();
            })
            .then(data => {
                countEl.textContent = data.value;
            })
            .catch(() => {
                countEl.textContent = '0';
            });
    });

    // Contributor avatars + count (cards with data-contributors-repo)

    document.querySelectorAll('.project-card[data-contributors-repo]').forEach(card => {
        const repo = card.dataset.contributorsRepo;
        const avatarsContainer = card.querySelector('.avatars');
        const countEl = card.querySelector('.contributors-count');

        fetch(`https://img.shields.io/github/contributors/${repo}.json`)
            .then(res => {
                if (!res.ok) throw new Error('Shields error');
                return res.json();
            })
            .then(data => {
                countEl.textContent = `${data.value} contributors`;
            })
            .catch(() => {
                countEl.textContent = '0 contributors';
            });

        if (avatarsContainer) {
            fetch(`https://api.github.com/repos/${repo}/contributors?per_page=5`)
                .then(res => {
                    if (!res.ok) throw new Error('GitHub API error');
                    return res.json();
                })
                .then(list => {
                    list.forEach(contributor => {
                        const img = document.createElement('img');
                        img.src = contributor.avatar_url;
                        img.alt = contributor.login;
                        avatarsContainer.appendChild(img);
                    });
                })
                .catch(() => {
                    // Leave avatars empty if the API fails
                });
        }
    });

    // Owner avatar for cards without a contributors repo

    const GITHUB_USERNAME = 'TarekMoustafaElsayed';

    document.querySelectorAll('.project-card:not([data-contributors-repo]) .avatars').forEach(avatarContainer => {
        const img = document.createElement('img');
        img.src = `https://github.com/${GITHUB_USERNAME}.png`;
        img.alt = GITHUB_USERNAME;
        img.onerror = () => {
            avatarContainer.textContent = GITHUB_USERNAME.charAt(0).toUpperCase();
        };
        avatarContainer.appendChild(img);
    });

    // Card navigation

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.closest('a')) return;
            const link = card.dataset.link;
            if (link) {
                window.location.href = link;
            }
        });
    });
});
