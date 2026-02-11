
const accessKey = 'tDfhx3sO-cHPD39TxIJG1QqpdJJyIz_-fM52yEec06c';
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const imageContainer = document.getElementById('image-container'); // Corrected
const showMore = document.getElementById('show-more');

let keyword = '';
let page = 1;

async function searchRecipe() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        imageContainer.innerHTML = ''; // Clear results on new search
    }

    const results = data.results;

    results.map((result) => {
        // Create the card div
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');

        // Create the image
        const image = document.createElement('img');
        image.src = result.urls.small;

        // Create the overlay
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const photographer = document.createElement('span');
        photographer.classList.add('photographer');
        photographer.innerText = `@${result.user.username}`;

        const downloadBtn = document.createElement('button');
        downloadBtn.classList.add('download-btn');
        downloadBtn.innerHTML = `<i class="fa-solid fa-arrow-down"></i>`;
        downloadBtn.onclick = () => window.open(result.links.html, '_blank');

        // Build the structure
        overlay.appendChild(photographer);
        overlay.appendChild(downloadBtn);
        
        imageCard.appendChild(image);
        imageCard.appendChild(overlay);

        // Append to the gallery grid
        imageContainer.appendChild(imageCard);
    });

    if (results.length > 0) {
        showMore.style.display = 'inline-block';
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchRecipe();
});

showMore.addEventListener('click', () => {
    page++;
    searchRecipe();
});