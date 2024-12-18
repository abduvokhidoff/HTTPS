const statusMessage = document.getElementById('statusMessage');
const cardContainer = document.getElementById('cardContainer');
const form = document.getElementById('addContactForm');

let accounts = [];

const showMessage = (msg, error = false) => {
    statusMessage.textContent = msg;
    statusMessage.className = error ? 'error' : '';
};

const renderCards = () => {
    cardContainer.innerHTML = accounts.length
        ? accounts.map((a, i) => `
            <div class="card">
                <img src="${a.imgURL}" alt="${a.title}">
                <p>${a.title}</p>
                <p>${a.number}</p>
                <button onclick="editCard(${i})">✏️</button>
                <button onclick="deleteCard(${i})">🗑️</button>
            </div>`).join('')
        : '<p>No contacts available.</p>';
};

const addCard = (title, number, imgURL) => {
    accounts.push({ title, number, imgURL });
    renderCards();
    showMessage('Contact added!');
};

const deleteCard = (i) => {
    accounts.splice(i, 1);
    renderCards();
    showMessage('Contact deleted!');
};

const editCard = (i) => {
    const a = accounts[i];
    accounts[i] = {
        title: prompt('Edit Title:', a.title) || a.title,
        number: prompt('Edit Number:', a.number) || a.number,
        imgURL: prompt('Edit Image URL:', a.imgURL) || a.imgURL
    };
    renderCards();
    showMessage('Contact updated!');
};

form.addEventListener('submit', e => {
    e.preventDefault();
    addCard(form.titleInput.value, form.numberInput.value, form.imgInput.value);
    form.reset();
});

fetch('db.json')
    .then(response => response.json())
    .then(data => {
        accounts = data.accounts || [];
        renderCards();
    })
    .catch(() => showMessage('Failed to load data', true));
