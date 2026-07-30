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

    const GITHUB_USERNAME = 'TarekMoustafaElsayed';
    const avatarContainer = document.querySelector('.featured-projects .avatars');

    if (avatarContainer) {
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
            .then(res => {
                if (!res.ok) throw new Error('GitHub API error');
                return res.json();
            })
            .then(data => {
                const img = document.createElement('img');
                img.src = data.avatar_url;
                img.alt = GITHUB_USERNAME;
                avatarContainer.appendChild(img);
            })
            .catch(() => {
                avatarContainer.textContent = GITHUB_USERNAME.charAt(0).toUpperCase();
            });
    }
});