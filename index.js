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
    const apiUrl = `https://api.github.com/repos/riviereteo/game/commits?page=1&per_page=100`;
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
    close.animate([
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1 }
    ], {
        duration: 200,
        iterations: 1,
        delay: 950,
        easing: 'linear',
        fill: 'forwards'
    });
    let jeux_déjà_vus = [];
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            for (let page = 0; page < data.length; page++) { // Parcourir toutes les mises à jour
                const words = data[page].commit.message.split(" ");
                for (let i = 0; i < words.length; i++) {
                    if (gameUpdatesFound < 5 && titles.includes(words[i])) { // Vérifier si nous avons trouvé moins de 5 mises à jour de jeu
                        if (jeux_déjà_vus.includes(words[i])) {
                            document.querySelectorAll('.messageText').forEach(message => {
                                if (message.innerHTML.includes(words[i])) {
                                    let parent = message.parentElement;
                                    let titre1 = document.getElementById('messageText' + titles.indexOf(words[i])).innerHTML;
                                    let wordss = titre1.split(" ");
                                    for (let i = 0; i < wordss.length; i++) {
                                        if (titles.includes(wordss[i])) {
                                            titre1 = titre1.replace(wordss[i], '<span class="messageText_span">' + wordss[i] + '</span>');
                                        }
                                    }
                                    let dateTextElement = document.getElementById('dateText' + titles.indexOf(words[i]));
                                    let dateText = dateTextElement.innerHTML;
                                    let date1 = dateText.substring(dateText.length - 10, dateText.length);
                                    parent.innerHTML = '';
                                    const ul = document.createElement('ul');
                                    ul.className = 'titreGameList';
                                    parent.appendChild(ul);
                                    const li = document.createElement('li');
                                    li.innerHTML = '<p>' + titre1 + '<span class="daaaaaaate"> | depuis le ' + date1 + '</span></p>';
                                    ul.appendChild(li);
                                    const li2 = document.createElement('li');
                                    let commit = data[page].commit.message;
                                    let wordssss = commit.split(" ");
                                    for (let i = 0; i < wordssss.length; i++) {
                                        if (titles.includes(wordssss[i])) {
                                            commit = commit.replace(wordssss[i], '<span class="messageText_span">' + wordssss[i] + '</span>');
                                        }
                                    }
                                    li2.innerHTML = '<p>' + commit + '<span class="daaaaaaate"> | depuis le ' + data[page].commit.author.date.substring(8, 10) + '/' + data[page].commit.author.date.substring(5, 7) + '/' + data[page].commit.author.date.substring(0, 4) + '</span></p>';
                                    ul.appendChild(li2);
                                    li2.addEventListener('click', () => {
                                        start(link[titles.indexOf(words[i])], "game");
                                    });
                                }
                            });
                            document.querySelectorAll('.titreGameList').forEach(titre => {
                                if (titre.innerHTML.includes(words[i])) {
                                    const li = document.createElement('li');
                                    let commit = data[page].commit.message;
                                    let wordssss = commit.split(" ");
                                    for (let i = 0; i < wordssss.length; i++) {
                                        if (titles.includes(wordssss[i])) {
                                            commit = commit.replace(wordssss[i], '<span class="messageText_span">' + wordssss[i] + '</span>');
                                        }
                                    }
                                    li.innerHTML = '<p>' + commit + '<span> | depuis le ' + data[page].commit.author.date.substring(8, 10) + '/' + data[page].commit.author.date.substring(5, 7) + '/' + data[page].commit.author.date.substring(0, 4) + '</span></p>';
                                    titre.appendChild(li);
                                    li.addEventListener('click', () => {
                                        start(link[titles.indexOf(words[i])], "game");
                                    });
                                }
                            });
                        } else {
                            jeux_déjà_vus.push(words[i]);
                            let index = titles.indexOf(words[i]);
                            const carrouselFrame = document.createElement('div');
                            carrouselFrame.className = 'carrouselFrame';
                            carrouselFrame.onclick = () => start(link[index], "carrouselFrame");
                            carrouselFrame.style.backgroundImage = `url(${img[index]})`;
                            carrouselNews.childNodes.length === 1 ? carrouselFrame.classList.add('carrouselFrameHere') : carrouselFrame.classList.add('carrouselFrameNotHere');
                            const messageText = document.createElement('p');
                            messageText.id = 'messageText' + index;
                            let msg = data[page].commit.message;
                            if (msg.length > 100) {
                                msg = msg.substring(0, 100) + '...';
                            }
                            //trouver le titre du jeu et le mettre dans un span
                            let wordsssss = msg.split(" ");
                            for (let i = 0; i < wordsssss.length; i++) {
                                if (titles.includes(wordsssss[i])) {
                                    msg = msg.replace(wordsssss[i], '<span class="messageText_span">' + wordsssss[i] + '</span>');
                                }
                            }
                            messageText.innerHTML = msg;
                            messageText.className = 'messageText';
                            const dateTextversion = document.createElement('p');
                            dateTextversion.id = 'dateText' + index;
                            dateTextversion.className = 'dateText_version';
                            const date = data[page].commit.author.date;
                            dateTextversion.innerHTML = "La " + versions[index] + " est disponnible depuis le " + date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4)
                            carrouselFrame.appendChild(messageText);
                            carrouselFrame.appendChild(dateTextversion);
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
                            carrouselDot.animate([
                                { opacity: 0, scale: 0 },
                                { opacity: 1, scale: 1 }
                            ], {
                                duration: 400,
                                iterations: 1,
                                delay: 900 + gameUpdatesFound * 100,
                                easing: 'linear',
                                fill: 'forwards'
                            });
                            gameUpdatesFound++; // Incrémenter le nombre de mises à jour de jeu trouvées
                        }
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
                    if (!document.getElementById('menuExp').classList.contains('activeMenu')) {
                        document.getElementById('menuExp').classList.add('activeMenu');
                        const active = document.getElementById('menuExp').querySelector('.activeDot');
                        active.classList.add('activeDot');
                        active.style.display = 'flex';
                        document.getElementById('menuExp').animate([
                            { backgroundColor: 'rgb(232, 239, 255)', color: 'royalblue', transform: 'translateX(0) translateY(0)' },
                            { backgroundColor: 'rgba(48, 255, 72, 0.8)', color: 'rgb(191, 245, 191)', transform: 'translateX(1px) translateY(3px)' },
                            { backgroundColor: 'rgb(232, 239, 255)', color: 'royalblue', transform: 'translateX(0) translateY(0)' }
                        ], {
                            duration: 400,
                            iterations: 1,
                        });
                    }
                    if (!document.getElementById('menuGame').classList.contains('activeMenu')) {
                        document.getElementById('menuGame').classList.add('activeMenu');
                        const active = document.getElementById('menuGame').querySelector('.activeDot');
                        active.classList.add('activeDot');
                        active.style.display = 'flex';
                        document.getElementById('menuGame').animate([
                            { backgroundColor: 'rgb(232, 239, 255)', color: 'royalblue', transform: 'translateX(0) translateY(0)' },
                            { backgroundColor: 'rgba(48, 255, 72, 0.8)', color: 'rgb(191, 245, 191)', transform: 'translateX(1px) translateY(3px)' },
                            { backgroundColor: 'rgb(232, 239, 255)', color: 'royalblue', transform: 'translateX(0) translateY(0)' }
                        ], {
                            duration: 400,
                            iterations: 1,
                        });
                    }
                    games[i].style.display = 'flex';
                    const titre = games[i].querySelector('.parentGameOnRightImg>.titreGame').innerHTML;
                    const index = titre.toLowerCase().indexOf(searchValue);
                    if (index !== -1) {
                        const debut = titre.substring(0, index);
                        const fin = titre.substring(index + searchValue.length);
                        games[i].querySelector('.titreGame').innerHTML = debut + '<span style="background-color: rgba(255, 255, 255, 0.9); color: rgb(0,0,0); border-radius: 4px; padding:2px 1px; border:1px solid black;">' + titre.substring(index, index + searchValue.length) + '</span>' + fin;
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
        const games = document.querySelectorAll('.game');
        if (!menuTitle.classList.contains('activeMenu')) {
            for (let i = 0; i < titres.length; i++)
                titres[i].style.display = 'none';
        } else {
            for (let i = 0; i < titres.length; i++) {
                titres[i].style.display = 'flex';
                games[i].style.padding = '6px 10px';
                games[i].style.gap = "10px";
                games[i].style.margin = '0';
            }
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
        const games = document.querySelectorAll('.game');
        if (!menuDate.classList.contains('activeMenu')) {
            for (let i = 0; i < dates.length; i++)
                dates[i].style.display = 'none';
        } else {
            for (let i = 0; i < dates.length; i++) {
                dates[i].style.display = 'flex';
                games[i].style.padding = '6px 10px';
                games[i].style.gap = "10px";
                games[i].style.margin = '0';
            }
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
        const games = document.querySelectorAll('.game');
        if (!menuVersion.classList.contains('activeMenu')) {
            for (let i = 0; i < versions.length; i++)
                versions[i].style.display = 'none';
        } else {
            for (let i = 0; i < versions.length; i++) {
                versions[i].style.display = 'flex';
                games[i].style.padding = '6px 10px';
                games[i].style.gap = "10px";
                games[i].style.margin = '0';
            }
        }
    });

    const games = document.getElementsByClassName('game');
    for (let i = 0; i < games.length; i++) {
        games[i].addEventListener('mouseover', () => {
            const imgGame = games[i].querySelector('.imgGame');
            if (!imgGame.src.includes('/gif')) {
                imgGame.dataset.oldsrc = imgGame.src;
                imgGame.src = imgGame.src.substring(0, imgGame.src.lastIndexOf('/') + 1) + 'gif/' + imgGame.src.substring(imgGame.src.lastIndexOf('/') + 1);
                imgGame.src = imgGame.src.substring(0, imgGame.src.lastIndexOf('.')) + '.gif';
            }
            if (!menuTitle.classList.contains('activeMenu') && !menuDate.classList.contains('activeMenu') && !menuVersion.classList.contains('activeMenu')) {
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
                games[i].style.padding = '0';
                games[i].style.gap = "0";
                games[i].style.margin = '6px 10px';
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
            }
        });
        games[i].addEventListener('mouseout', () => {
            const imgGame = games[i].querySelector('.imgGame');
            if (imgGame.src.includes('/gif')) {
                imgGame.src = imgGame.dataset.oldsrc;
            }
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

document.getElementById('menuRandom').addEventListener('click', () => {
    const games = document.getElementsByClassName('game');
    let random = Math.floor(Math.random() * games.length);
    while (games[random].style.display === 'none') {
        random = Math.floor(Math.random() * games.length);
    }
    games[random].click();
});

document.addEventListener("DOMContentLoaded", function () {
    var carrouselNews = document.getElementById("carrouselNews");
    var playText = document.getElementById("playText");

    carrouselNews.addEventListener("mousemove", function (event) {
        var x = event.clientX - 35;
        var y = event.clientY - 50;
        playText.style.display = "block";
        playText.style.left = x + 'px';
        playText.style.top = y + 'px';
    });

    carrouselNews.addEventListener("mouseleave", function () {
        playText.style.display = "none";
    });
});

window.onload = function () {
    const games = document.getElementsByClassName('game');
    for (let i = 0; i < games.length; i++) {

        games[i].animate([
            { opacity: 0,
                scale: 0,
                marginLeft: '-200px'
            },
            { opacity: 1,
                scale: 1,
                marginLeft: '0px'
            }
        ], {
            duration: 600,
            iterations: 1,
            delay: i * 50 + 700,
            easing: 'ease-out',
            fill: 'forwards'
        });
    }

}
