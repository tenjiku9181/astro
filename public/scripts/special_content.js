function getPostId() {
    const el = document.querySelector('[data-post-id]');
    return el ? Number(el.dataset.postId) : null;
}

function getTokenKey(postId) {
    return `private_content_${postId}`;
}

async function onPageLoad() {
    const postId = getPostId();
    if (!postId) return;

    const tokenKey = getTokenKey(postId);
    const token = localStorage.getItem(tokenKey);

    const contentDiv = document.getElementById('private_content');
    const formDiv = document.getElementById('check_input_btn');

    if (!contentDiv || !formDiv) return;

    if (!token) {
        contentDiv.classList.add('hidden');
        formDiv.classList.remove('hidden');
        return;
    }

    try {
        const response = await fetch('https://it-s-taksh-server.vercel.app/auth/check-access', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.allowed) {
            contentDiv.classList.remove('hidden');
            formDiv.classList.add('hidden');
        } else {
            localStorage.removeItem(tokenKey);
            contentDiv.classList.add('hidden');
            formDiv.classList.remove('hidden');
        }
    } catch {
        localStorage.removeItem(tokenKey);
        contentDiv.classList.add('hidden');
        formDiv.classList.remove('hidden');
    }
}

const checkBtn = document.getElementById('check_private_content');
const usernameInput = document.getElementById('username_input');

checkBtn?.addEventListener('click', async () => {
    const postId = getPostId();
    if (!postId) return;

    const username = usernameInput.value.trim();
    if (!username) {
        alert('Username cannot be empty');
        return;
    }

    const response = await fetch('https://it-s-taksh-server.vercel.app/auth/check-access-or-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, access: postId })
    });

    const data = await response.json();

    if (data.allowed) {
        localStorage.setItem(getTokenKey(postId), data.token);
        onPageLoad();
    } else {
        alert(data.message);
    }
});

const confirmBtn = document.getElementById('confirm');
const denyBtn = document.getElementById('deny');

onPageLoad();