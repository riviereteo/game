function start(url, type) {
    let wait = 0;
    if (type === "game") {
        let index = link.indexOf(url);
        const imgs = document.querySelectorAll('.imgGame');
        imgs.forEach(imga => {
            if (imga.src === img[index]) {
                imga.style.boxShadow = '3px 3px 4px 0 rgb(103, 103, 103)';
                imga.parentElement.animate([
                    { transform: 'translateX(0) translateY(0)' },
                    { transform: 'translateX(1px) translateY(3px)' },
                    { transform: 'translateX(0) translateY(0)' }
                ], {
                    duration: 300,
                    iterations: 1,
                });
                wait = 300;
            }
        });
    }
    setTimeout(() => {
        let href = window.location.href;
        href = href.substring(0, href.lastIndexOf('/'));
        window.location.href = href + '/' + url;
    }, wait);
}

let intervalOfCarouselSlide;

document.addEventListener("DOMContentLoaded", function () {
    let gameUpdatesFound = 0; // Variable pour suivre le nombre de mises à jour de jeu trouvées
    const apiUrl = `https://api.github.com/repos/riviereteo/game/commits`;
    const carrouselNews = document.getElementById('carrouselNews');
    const carrouselNavigator = document.getElementById('carrouselNavigator');
    const close = document.createElement('div');
    close.id = 'closeCarrousel';
    close.innerHTML = '<span class="material-symbols-outlined">close</span>';
    close.addEventListener('click', () => {
        const menuNews = document.getElementById('menuNews');
        menuNews.click();
    });
    close.style.top = carrouselNews.offsetTop + 4 + 'px';
    close.style.right = carrouselNews.offsetLeft + 4 + 'px';
    document.body.appendChild(close);
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            for (let page = 0; page < data.length; page++) { // Parcourir toutes les mises à jour
                const words = data[page].commit.message.split(" ");
                for (let i = 0; i < words.length; i++) {
                    if (gameUpdatesFound < 5 && titles.includes(words[i])) { // Vérifier si nous avons trouvé moins de 5 mises à jour de jeu
                        let index = titles.indexOf(words[i]);
                        const carrouselFrame = document.createElement('div');
                        carrouselFrame.className = 'carrouselFrame';
                        carrouselFrame.onclick = () => start(link[index], "carrouselFrame");
                        carrouselFrame.style.backgroundImage = `url(${img[index]})`;
                        carrouselNews.childNodes.length === 1 ? carrouselFrame.classList.add('carrouselFrameHere') : carrouselFrame.classList.add('carrouselFrameNotHere');
                        const messageText = document.createElement('p');
                        messageText.innerHTML = data[page].commit.message;
                        messageText.className = 'messageText';
                        const dateText = document.createElement('p');
                        dateText.className = 'dateText';
                        const date = data[page].commit.author.date;
                        dateText.innerHTML = date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4)
                        const version = document.createElement('p');
                        version.className = 'version';
                        version.innerHTML = versions[index];
                        carrouselFrame.appendChild(messageText);
                        carrouselFrame.appendChild(dateText);
                        carrouselFrame.appendChild(version);
                        carrouselNews.appendChild(carrouselFrame);
                        const carrouselDot = document.createElement('div');
                        carrouselDot.className = 'carrouselDot';
                        carrouselNews.childNodes.length === 2 ? carrouselDot.classList.add('carrouselDotHere') : carrouselDot.classList.add('carrouselDotNotHere');
                        carrouselDot.addEventListener('click', () => {
                            clearInterval(intervalOfCarouselSlide);
                            intervalOfCarouselSlide = setInterval(slideAuto, 5000);
                            carrouselNavigator.childNodes.forEach(dot => {
                                dot.classList.remove('carrouselDotHere');
                                dot.classList.add('carrouselDotNotHere');
                            });
                            let ancienhere = document.querySelector('.carrouselFrameHere');
                            ancienhere.classList.remove('carrouselFrameHere');
                            ancienhere.classList.add('carrouselFrameNotHere');
                            carrouselFrame.classList.remove('carrouselFrameNotHere');
                            carrouselFrame.classList.add('carrouselFrameHere');
                            carrouselDot.classList.remove('carrouselDotNotHere');
                            carrouselDot.classList.add('carrouselDotHere');
                        });
                        carrouselNavigator.appendChild(carrouselDot);
                        gameUpdatesFound++; // Incrémenter le nombre de mises à jour de jeu trouvées
                        break;
                    }
                }
                if (gameUpdatesFound >= 5) // Si nous avons trouvé 5 mises à jour de jeu, sortir de la boucle
                    break;
            }
        });
    intervalOfCarouselSlide = setInterval(slideAuto, 5000);

    const menus = document.querySelectorAll('.menuButton');
    menus.forEach((menu) => {
        const active = document.createElement('div');
        active.classList.add('activeDot');
        menu.appendChild(active);
        menu.classList.contains('activeMenu') ? active.style.display = 'flex' : active.style.display = 'none';
        menu.addEventListener('click', () => {
            if (menu.classList.contains('activeMenu')) {
                menu.classList.remove('activeMenu');
                active.style.display = 'none';
                menu.animate([
                    { backgroundColor: 'rgb(232, 239, 255)', color: 'royalblue', transform: 'translateX(0) translateY(0)' },
                    { backgroundColor: 'rgb(195, 55, 55)', color: 'rgba(255, 213, 213, 0.8)', transform: 'translateX(1px) translateY(3px)' },
                    { backgroundColor: 'rgb(232, 239, 255)', color: 'royalblue', transform: 'translateX(0) translateY(0)' }
                ], {
                    duration: 400,
                    iterations: 1,
                });
            } else {
                menu.classList.add('activeMenu');
                active.style.display = 'flex';
                menu.animate([
                    { backgroundColor: 'rgb(232, 239, 255)', color: 'royalblue', transform: 'translateX(0) translateY(0)' },
                    { backgroundColor: 'rgba(48, 255, 72, 0.8)', color: 'rgb(191, 245, 191)', transform: 'translateX(1px) translateY(3px)' },
                    { backgroundColor: 'rgb(232, 239, 255)', color: 'royalblue', transform: 'translateX(0) translateY(0)' }
                ], {
                    duration: 400,
                    iterations: 1,
                });
            }
        });
    });

    let searchClicked = false;
    let searchBarClicked = false;
    document.getElementById('searchButton').addEventListener('click', () => {
        if (document.getElementById('searchButton')) {
            const search = document.createElement('input');
            search.id = 'searchBar';
            search.type = 'text';
            search.placeholder = 'Search...';
            search.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    searchh();
                }
            });
            document.getElementById('searchButton').insertAdjacentElement('beforebegin', search);
            document.getElementById('searchButton').id = 'searchButtonActive';
            search.addEventListener('click', () => {
                searchBarClicked = true;
            });
            search.focus();
            const games = document.getElementsByClassName('game');
            let allsearch = true;
            for (let i = 0; i < games.length; i++) {
                if (games[i].style.display != 'none') allsearch = false;
            }
            if (allsearch) {
                for (let i = 0; i < games.length; i++) {
                    games[i].style.display = 'flex';
                }
            }
        }
        else {
            searchClicked = true;
            searchh();
        }
    });

    function searchh() {
        const search = document.getElementById('searchBar');
        const games = document.getElementsByClassName('game');
        const searchValue = search.value;
        for (let i = 0; i < games.length; i++) {
            games[i].style.display = 'none';
            games[i].querySelector('.parentGameOnRightImg>.titreGame').innerHTML = titles[i];
        }
        if (search.value === '') {
            for (let i = 0; i < games.length; i++) {
                games[i].style.display = 'flex';
            }
        } else {
            const searchValue = search.value.toLowerCase();
            for (let i = 0; i < games.length; i++) {
                const titre = games[i].querySelector('.titreGame').innerHTML.toLowerCase();
                const date = games[i].querySelector('.dateGame').innerHTML.toLowerCase();
                const version = games[i].querySelector('.versionGame').innerHTML.toLowerCase();
                if (titre.includes(searchValue) || date.includes(searchValue) || version.includes(searchValue)) {
                    games[i].style.display = 'flex';
                    const titre = games[i].querySelector('.parentGameOnRightImg>.titreGame').innerHTML;
                    const index = titre.toLowerCase().indexOf(searchValue);
                    if (index !== -1) {
                        const debut = titre.substring(0, index);
                        const fin = titre.substring(index + searchValue.length);
                        games[i].querySelector('.titreGame').innerHTML = debut + '<span style="background-color: rgba(255, 255, 255, 0.9); color: rgb(0,0,0); border-radius: 4px; padding:2px 1px;">' + titre.substring(index, index + searchValue.length) + '</span>' + fin;
                    }
                }
            }
            search.value = '';
        }
    }

    document.addEventListener('click', (e) => {
        if (document.getElementById('searchButtonActive') && document.getElementById('searchBar')) {
            if (document.getElementById('searchBar').offsetWidth === 190 && searchClicked === false && searchBarClicked === false) {
                document.getElementById('searchBar').animate([
                    { width: '190px' },
                    { width: '0px' }
                ], {
                    duration: 200,
                    iterations: 1,
                });
                setTimeout(() => {
                    document.getElementById('searchBar').remove();
                    document.getElementById('searchButtonActive').id = 'searchButton';
                }, 200);
            }
        }
        searchClicked = false;
        searchBarClicked = false;
    });

    const menuTitle = document.getElementById('menuTitle');
    if (!menuTitle.classList.contains('activeMenu')) {
        const titres = document.querySelectorAll('.titreGame');
        for (let i = 0; i < titres.length; i++) {
            titres[i].style.display = 'none';
        }
    }
    menuTitle.addEventListener('click', () => {
        const titres = document.querySelectorAll('.titreGame');
        if (!menuTitle.classList.contains('activeMenu')) {
            for (let i = 0; i < titres.length; i++)
                titres[i].style.display = 'none';
        } else {
            for (let i = 0; i < titres.length; i++)
                titres[i].style.display = 'flex';
        }
    });
    const menuDate = document.getElementById('menuDate');
    if (!menuDate.classList.contains('activeMenu')) {
        const dates = document.querySelectorAll('.dateGame');
        for (let i = 0; i < dates.length; i++) {
            dates[i].style.display = 'none';
        }
    }
    menuDate.addEventListener('click', () => {
        const dates = document.querySelectorAll('.dateGame');
        if (!menuDate.classList.contains('activeMenu')) {
            for (let i = 0; i < dates.length; i++)
                dates[i].style.display = 'none';
        } else {
            for (let i = 0; i < dates.length; i++)
                dates[i].style.display = 'flex';
        }
    });
    const menuVersion = document.getElementById('menuVersion');
    if (!menuVersion.classList.contains('activeMenu')) {
        const versions = document.querySelectorAll('.version');
        for (let i = 0; i < versions.length; i++) {
            versions[i].style.display = 'none';
        }
    }
    menuVersion.addEventListener('click', () => {
        const versions = document.querySelectorAll('.versionGame');
        if (!menuVersion.classList.contains('activeMenu')) {
            for (let i = 0; i < versions.length; i++)
                versions[i].style.display = 'none';
        } else {
            for (let i = 0; i < versions.length; i++)
                versions[i].style.display = 'flex';
        }
    });

    const games = document.getElementsByClassName('game');
    for (let i = 0; i < games.length; i++) {
        games[i].addEventListener('mouseover', () => {
            if (!menuTitle.classList.contains('activeMenu') && !menuDate.classList.contains('activeMenu') && !menuVersion.classList.contains('activeMenu')) {
                games[i].style.backgroundColor = 'transparent';
                const play = document.createElement('div');
                play.className = 'play';
                play.style.pointerEvents = 'none';
                play.style.height = '75px';
                play.style.alignItems = 'center';
                play.style.justifyContent = 'center';
                play.style.display = 'flex';
                play.style.width = '75px';
                play.style.position = 'absolute';
                play.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>';
                play.style.color = "rgba(255, 255, 255, 0.8)";
                games[i].appendChild(play);
                play.querySelector('.material-symbols-outlined').style.fontSize = '50px';
                play.querySelector('.material-symbols-outlined').style.textShadow = '3px 3px 4px rgba(0, 0, 0, 0.5)';
                play.animate([
                    { top: play.offsetTop - 30 + 'px', opacity: 0 },
                    { top: play.offsetTop + 0 + 'px', opacity: 0.8 }
                ], {
                    duration: 400,
                    iterations: 1,
                    easing: 'linear(0 0%, 0 2.27%, 0.02 4.53%, 0.04 6.8%, 0.06 9.07%, 0.1 11.33%, 0.14 13.6%, 0.25 18.15%, 0.39 22.7%, 0.56 27.25%, 0.77 31.8%, 1 36.35%, 0.89 40.9%, 0.85 43.18%, 0.81 45.45%, 0.79 47.72%, 0.77 50%, 0.75 52.27%, 0.75 54.55%, 0.75 56.82%, 0.77 59.1%, 0.79 61.38%, 0.81 63.65%, 0.85 65.93%, 0.89 68.2%, 1 72.7%, 0.97 74.98%, 0.95 77.25%, 0.94 79.53%, 0.94 81.8%, 0.94 84.08%, 0.95 86.35%, 0.97 88.63%, 1 90.9%, 0.99 93.18%, 0.98 95.45%, 0.99 97.73%, 1 100%)'
                });
            } else {
                games[i].style.backgroundColor = 'white';
            }
        });
        games[i].addEventListener('mouseout', () => {
            games[i].style.backgroundColor = 'transparent';
            const play = games[i].querySelector('.play');
            if (play !== null) {
                play.remove();
            }
        });
    }

    const menuGame = document.getElementById('menuGame');
    const allgames = document.getElementsByClassName('game');
    let justgames = [];
    for (let i = 0; i < allgames.length; i++) {
        if (allgames[i].dataset.type === "game") {
            justgames.push(allgames[i]);
        }
    }
    if (!menuGame.classList.contains('activeMenu')) {
        for (let i = 0; i < justgames.length; i++) {
            justgames[i].style.display = 'none';
        }
    }
    menuGame.addEventListener('click', () => {
        if (!menuGame.classList.contains('activeMenu')) {
            for (let i = 0; i < justgames.length; i++) {
                justgames[i].style.display = 'none';
            }
        } else {
            for (let i = 0; i < justgames.length; i++) {
                justgames[i].style.display = 'flex';
            }
        }
    });

    const menuExp = document.getElementById('menuExp');
    let justexp = [];
    for (let i = 0; i < allgames.length; i++) {
        if (allgames[i].dataset.type === "exp") {
            justexp.push(allgames[i]);
        }
    }
    if (!menuExp.classList.contains('activeMenu')) {
        for (let i = 0; i < justexp.length; i++) {
            justexp[i].style.display = 'none';
        }
    }
    menuExp.addEventListener('click', () => {
        if (!menuExp.classList.contains('activeMenu')) {
            for (let i = 0; i < justexp.length; i++) {
                justexp[i].style.display = 'none';
            }
        } else {
            for (let i = 0; i < justexp.length; i++) {
                justexp[i].style.display = 'flex';
            }
        }
    });

    const menuNews = document.getElementById('menuNews');
    const gameContainer = document.getElementById('gameContainer');
    if (!menuNews.classList.contains('activeMenu')) {
        carrouselNews.style.display = 'none';
        close.style.display = 'none';
        carrouselNavigator.style.display = 'none';
        gameContainer.style.margin = "20px auto 0 auto"
    }
    menuNews.addEventListener('click', () => {
        if (menuNews.classList.contains('activeMenu')) {
            carrouselNews.style.display = 'flex';
            close.style.display = 'flex';
            carrouselNavigator.style.display = 'flex';
            gameContainer.style.margin = "50px auto 0 auto"
        } else {
            carrouselNews.style.display = 'none';
            close.style.display = 'none';
            carrouselNavigator.style.display = 'none';
            gameContainer.style.margin = "20px auto 0 auto"
        }
    });
});

function slideAuto() {
    let ancienhere = document.querySelector('.carrouselFrameHere');
    let carrouselNews = document.getElementById('carrouselNews');
    let carrouselNavigator = document.getElementById('carrouselNavigator');
    let suivant = ancienhere.nextElementSibling;
    if (suivant === null) {
        suivant = carrouselNews.firstElementChild;
    }
    suivant.classList.remove('carrouselFrameNotHere');
    suivant.classList.add('carrouselFrameHere');
    let ancienhereDot = document.querySelector('.carrouselDotHere');
    ancienhereDot.classList.remove('carrouselDotHere');
    ancienhereDot.classList.add('carrouselDotNotHere');
    let suivantDot = ancienhereDot.nextElementSibling;
    if (suivantDot === null) {
        suivantDot = carrouselNavigator.firstElementChild;
    }
    suivantDot.classList.remove('carrouselDotNotHere');
    suivantDot.classList.add('carrouselDotHere');
    ancienhere.classList.remove('carrouselFrameHere');
    ancienhere.classList.add('carrouselFrameNotHere');
}