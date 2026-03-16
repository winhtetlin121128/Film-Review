const filmlistcontainer = document.getElementsByClassName('film-list')[0];
const aboutcontainer = document.getElementsByClassName('aboutme')[0];
const navbar = document.getElementsByClassName('navbar')[0];
const containerh3 = document.getElementById('container-h3');
const containerinput = document.getElementById('container-input');
const search_box_container = document.getElementsByClassName('search-box-container')[0];
const abouth3 = document.querySelector('.aboutme h3');
const aboutimg = document.querySelector('.aboutme div');
const aboutme = document.querySelector('.aboutme p');
const copyright = document.querySelector('.copy_right');
const producttitle = document.querySelectorAll('.film-list h3');
const author = document.querySelector('.aboutme span');
const filmcount = document.getElementById('count');
const skipcontainer = document.getElementsByClassName('skip')[0];


// Blur and Unblur function
const blurelements = (apply) => {
    const elements = [containerh3, containerinput, navbar, filmlistcontainer, skipcontainer];

    elements.forEach(element => {
        element.style.filter = apply ? 'blur(5px)' : 'none';
    });
};


// create card
const createcard = (story, parentcontainer) => {
    const { imgsrc, title, about, director } = story;

    const parent = document.createElement('li');
    parent.classList.add('parent');

    const parentimg = document.createElement('div');
    parentimg.style.backgroundImage = `url(${imgsrc})`;

    const parenttitle = document.createElement('h3');
    parenttitle.textContent = title;

    const aboutoffilm = document.createElement('p');
    aboutoffilm.textContent = about;

    parent.append(parentimg, parenttitle, aboutoffilm);
    parentcontainer.append(parent);

    parent.addEventListener('click', () => {
        blurelements(true);
        aboutcontainer.style.display = 'block';

        abouth3.textContent = title;
        aboutimg.style.backgroundImage = `url(${imgsrc})`;
        aboutme.textContent = about;
        author.textContent = 'Director: ' + director;
    });
};


// --------------------------------------
// PAGINATION SETUP
// --------------------------------------
let currentPage = 1;
let itemsPerPage = 8;
let filmData = [];

const renderPage = () => {
    filmlistcontainer.innerHTML = "";

    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;

    let pageItems = filmData.slice(start, end);

    pageItems.forEach(story => createcard(story, filmlistcontainer));

    let totalPages = Math.ceil(filmData.length / itemsPerPage);
    filmcount.textContent = `${currentPage}/${totalPages} Pages`;
};


// FETCH DATA
fetch('config.json')
    .then(res => res.json())
    .then(data => {
        filmData = data.sort(() => Math.random() - 0.5);
        renderPage();
    });


// Loading animation
const loading = document.getElementsByClassName('loader')[0];
let counttime = 0;
const loadingtimer = () => {
    setInterval(() => {
        counttime++;

        if (counttime === 1) {
            loading.style.display = 'none';
            filmlistcontainer.style.display = 'flex';
            counttime = 0;
            clearInterval(loadingtimer);
        }
    }, 1000);
};

loadingtimer();


// Detech the switch
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        window.location.reload();
    }
});


// Close About function
const closeabout = () => {
    const aboutVisible = window.getComputedStyle(aboutcontainer).display === 'block';

    if (aboutVisible) {
        blurelements(false);
        aboutcontainer.style.display = 'none';
    }
};


// CLOSE WHEN CLICKING OUTSIDE CARDS
filmlistcontainer.addEventListener('click', (e) => {
    if (!e.target.closest('li')) {
        closeabout();
    }
});

// CLOSE WHEN NAVBAR OR HEADER CLICKED
navbar.addEventListener('click', closeabout);
containerh3.addEventListener('click', closeabout);
search_box_container.addEventListener('click', closeabout);

// Close on Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeabout();
    }
});


// SEARCH BAR FUNCTION
const search = () => {
    const filter = containerinput.value.toUpperCase();

    // Filter filmData by title
    const filteredData = filmData.filter(story => story.title.toUpperCase().includes(filter));

    // Update pagination for filtered results
    currentPage = 1;
    filmlistcontainer.innerHTML = "";

    filteredData.forEach(story => createcard(story, filmlistcontainer));

    // Update page count display
    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    filmcount.textContent = `${currentPage}/${totalPages} Pages`;
};

containerinput.addEventListener('keyup', search);


// NEXT & PREVIOUS BUTTON LOGIC
document.querySelector(".skip button:first-child").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
    }
});

document.querySelector(".skip button:last-child").addEventListener("click", () => {
    let maxPage = Math.ceil(filmData.length / itemsPerPage);

    if (currentPage < maxPage) {
        currentPage++;
        renderPage();
    }
});