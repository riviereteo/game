var opopi = false;
var ancienneFonction1 = window.onload;
window.onload = function () {
    if (ancienneFonction1) {
        ancienneFonction1();
    }

    // Création du canon à laser
    canon_laser();

    // Création du conteneur du laser
    var laserContainer = document.createElement('div');
    laserContainer.classList.add('laser-container');

    // Création de l'élément du laser
    var laser = document.createElement('div');
    laser.setAttribute('id', 'laser');

    // Création du centre blanc du laser
    var laserCenter = document.createElement('div');
    laserCenter.setAttribute('id', 'laser-center');

    // Ajout de l'élément du laser au conteneur
    laserContainer.appendChild(laser);
    laserContainer.appendChild(laserCenter);

    // Ajout du conteneur du laser à la page
    document.body.appendChild(laserContainer);

    //recupérer .alocolorcoin
    var alocolorcoins = document.getElementsByClassName('alocolorcoin');

    setTimeout(function () {
        laserContainer.classList.add('laser-container-active-10');
        for (alocolorcoin of alocolorcoins) {
            alocolorcoin.style.backgroundColor = 'yellow';
        }
        document.body.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
        //attendre 30s de plus avant la suite
        setTimeout(function () {
            laserContainer.classList.replace('laser-container-active-10', 'laser-container-active-20');
            for (alocolorcoin of alocolorcoins) {
                alocolorcoin.style.backgroundColor = 'red';
            }
            document.body.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            //attendre 25s de plus avant la suite
            setTimeout(function () {
                laserContainer.classList.replace('laser-container-active-20', 'laser-container-active-30');
                for (alocolorcoin of alocolorcoins) {
                    alocolorcoin.style.backgroundColor = 'blue';
                }
                document.body.style.backgroundColor = 'rgba(0, 0, 255, 0.1)';
                //attendre 20s de plus avant la suite
                setTimeout(function () {
                    laserContainer.classList.replace('laser-container-active-30', 'laser-container-active-40');
                    for (alocolorcoin of alocolorcoins) {
                        alocolorcoin.style.backgroundColor = 'green';
                    }
                    document.body.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
                    //attendre 15s de plus avant la suite
                    setTimeout(function () {
                        laserContainer.classList.replace('laser-container-active-40', 'laser-container-active-50');
                        for (alocolorcoin of alocolorcoins) {
                            alocolorcoin.style.backgroundColor = 'purple';
                        }
                        document.body.style.backgroundColor = 'rgba(255, 0, 255, 0.1)';
                        //attendre 10s de plus avant la suite
                        setTimeout(function () {
                            laserContainer.classList.replace('laser-container-active-50', 'laser-container-active-60');
                            for (alocolorcoin of alocolorcoins) {
                                alocolorcoin.style.backgroundColor = 'orange';
                            }
                            document.body.style.backgroundColor = 'rgba(255, 165, 0, 0.1)';
                            //attendre 8s de plus avant la suite
                            setTimeout(function () {
                                laserContainer.classList.replace('laser-container-active-60', 'laser-container-active-70');
                                for (alocolorcoin of alocolorcoins) {
                                    alocolorcoin.style.backgroundColor = 'pink';
                                }
                                document.body.style.backgroundColor = 'rgba(255, 192, 203, 0.1)';
                                //attendre 6s de plus avant la suite
                                setTimeout(function () {
                                    laserContainer.classList.replace('laser-container-active-70', 'laser-container-active-80');
                                    for (alocolorcoin of alocolorcoins) {
                                        alocolorcoin.style.backgroundColor = 'rgb(0, 255, 217)';
                                    }
                                    document.body.style.backgroundColor = 'rgba(0, 255, 217, 0.1)';
                                    //attendre 5s de plus avant la suite
                                    setTimeout(function () {
                                        laserContainer.classList.replace('laser-container-active-80', 'laser-container-active-90');
                                        for (alocolorcoin of alocolorcoins) {
                                            alocolorcoin.style.backgroundColor = 'rgb(0, 255, 132)';
                                        }
                                        document.body.style.backgroundColor = 'rgba(0, 255, 132, 0.1)';
                                        //attendre 4s de plus avant la suite
                                        setTimeout(function () {
                                            laserContainer.classList.replace('laser-container-active-90', 'laser-container-active-100');
                                            for (alocolorcoin of alocolorcoins) {
                                                alocolorcoin.style.backgroundColor = 'orangered';
                                            }
                                            document.body.style.backgroundColor = 'rgba(255, 69, 0, 0.1)';
                                        }, 4000);
                                    }, 5000);
                                }, 6000);
                            }, 8000);
                        }, 10000);
                    }, 15000);
                }, 20000);
            }, 25000);
        }, 30000);
    }, 3000);

    var onreload = false;
    // Créez une instance de ResizeObserver avec une fonction de rappel
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            // Accédez à la nouvelle largeur de la div
            const nouvelleLargeur = entry.contentRect.width;
            if (nouvelleLargeur >= window.innerWidth * 0.3) {
                //le scroll suit le laser
                window.scrollTo(nouvelleLargeur - window.innerWidth * 0.3, laserContainer.offsetTop - window.innerHeight / 2);
            } else {
                window.scrollTo(0, laserContainer.offsetTop - window.innerHeight / 2);
            }
            if (nouvelleLargeur >= alll8888) {
                if (!onreload) {
                    let pièces = document.getElementsByClassName('pièce');
                    for (let pièce of pièces) {
                        if (pièce.dataset.ischao === 'true') {
                            opopi = true;
                            laserContainer.style.animationPlayState = 'paused';
                            pièce.parentNode.style.pointerEvents = 'none';
                            const boundingpièce = pièce.getBoundingClientRect();
                            const voisinDroit = pièce.nextElementSibling;
                            voisinDroit.style.marginLeft = boundingpièce.width + marginPiècesRight + 'px';

                            const containerbille = document.createElement('div');
                            containerbille.style.cssText = 'position: absolute; width: ' + boundingpièce.width + 'px; height: ' + boundingpièce.height + 'px; top: ' + boundingpièce.top + 'px; left: ' + laserContainer.offsetWidth + 'px; justify-content: space-between; display: flex; flex-direction: row; flex-wrap: wrap; align-content: space-between; align-items: space-between;';
                            document.body.appendChild(containerbille);

                            const nbbillelargeur = Math.floor((boundingpièce.width - 20) / 10);
                            const nbbillehauteur = Math.floor((boundingpièce.height - 20) / 10);

                            for (let i = 0; i < nbbillehauteur; i++) {
                                for (let j = 0; j < nbbillelargeur; j++) {
                                    const bille = document.createElement('div');
                                    bille.style.cssText = 'width: 10px; height: 10px; border-radius: 50%;';
                                    bille.style.backgroundColor = Math.floor(Math.random() * 4) === 0 ? 'white' : pièce.style.backgroundColor;
                                    containerbille.appendChild(bille);
                                }
                            }
                            divendinggrayscale = document.createElement('div');
                            divendinggrayscale.style.cssText = 'position: fixed; width: 100vw; height: 100vh; left : 0; top : 0; animation: grayscalee 2s ease-in-out forwards; z-index: 1001;';
                            style8 = document.createElement('style');
                            style8.innerHTML = '@keyframes grayscalee {from {background-color: rgba(0, 0, 0, 0);} to {background-color: rgba(0, 0, 0, 1);}}';
                            document.head.appendChild(style8);
                            document.body.appendChild(divendinggrayscale);
                            pièce.style.display = 'none';
                            containerbille.style.zIndex = '1000';

                            const billes = containerbille.children;
                            let op = 0;

                            for (let bille of billes) {
                                bille.style.animation = 'forwards bille' + (++op) + ' 1.5s ease-in-out';

                                const style = document.createElement('style');
                                const minX = window.innerWidth * 0.7;
                                const maxX = window.innerWidth;
                                const minY = -innerHeight / 2;
                                const maxY = innerHeight / 2;
                                const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
                                const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
                                style.innerHTML = '@keyframes bille' + op + ' {from {transform: translate(0px, 0px);} to {transform: translate(' + randomX + 'px, ' + randomY + 'px);}}';
                                document.head.appendChild(style);
                            }

                            document.getElementsByClassName('canon')[0].style.animation = 'forwards tremblement 1.2s ease-in-out';
                            laserContaineroffsetWidth = laserContainer.offsetWidth;
                            laserContainer.style.animation = 'forwards tremblement 1.2s ease-in-out';
                            laserContainer.style.width = laserContaineroffsetWidth + 'px';
                            document.getElementsByClassName('pièces-container')[0].style.animation = 'forwards tremblement 1.2s ease-in-out';

                            var result = document.createElement('div');
                            result.setAttribute('id', 'result');
                            result.style.cssText = 'position: fixed; width: 100vw; height: 100vh; left : 0; top : 0; z-index: 1002; justify-content: center; display: flex; flex-direction: column; align-items: center;';
                            document.body.appendChild(result);
                            var resultpiècesauvées = document.createElement('div');
                            resultpiècesauvées.setAttribute('id', 'resultpiècesauvées');
                            var divresultpiècesauvéesnumber = document.createElement('div');
                            divresultpiècesauvéesnumber.setAttribute('id', 'divresultpiècesauvéesnumber');
                            resultpiècesauvées.appendChild(divresultpiècesauvéesnumber);
                            result.appendChild(resultpiècesauvées);
                            var numberresultpiècesauvées = document.createElement('p');
                            numberresultpiècesauvées.setAttribute('id', 'numberresultpiècesauvées');
                            numberresultpiècesauvées.innerHTML = nbpièceschao;
                            divresultpiècesauvéesnumber.appendChild(numberresultpiècesauvées);
                            var imgresultpiècesauvées = document.createElement('img');
                            imgresultpiècesauvées.setAttribute('id', 'imgresultpiècesauvées');
                            imgresultpiècesauvées.setAttribute('src', 'cards.gif');
                            divresultpiècesauvéesnumber.appendChild(imgresultpiècesauvées);

                            var resultlongueureparcourus = document.createElement('div');
                            resultlongueureparcourus.setAttribute('id', 'resultlongueureparcourus');
                            var divresultlongueureparcourusnumber = document.createElement('div');
                            divresultlongueureparcourusnumber.setAttribute('id', 'divresultlongueureparcourusnumber');
                            resultlongueureparcourus.appendChild(divresultlongueureparcourusnumber);
                            result.appendChild(resultlongueureparcourus);
                            var numberresultlongueureparcourus = document.createElement('p');
                            numberresultlongueureparcourus.setAttribute('id', 'numberresultlongueureparcourus');
                            numberresultlongueureparcourus.innerHTML = Math.trunc(nouvelleLargeur - document.getElementsByClassName('canon')[0].offsetWidth) + 'px';
                            var imgresultlongueureparcourus = document.createElement('img');
                            imgresultlongueureparcourus.setAttribute('id', 'imgresultlongueureparcourus');
                            imgresultlongueureparcourus.setAttribute('src', 'distance.png');
                            divresultlongueureparcourusnumber.appendChild(imgresultlongueureparcourus);
                            divresultlongueureparcourusnumber.appendChild(numberresultlongueureparcourus);

                            var restartbutton = document.createElement('div');
                            restartbutton.setAttribute('id', 'restartbutton');
                            var restartbuttonimg = document.createElement('img');
                            restartbuttonimg.setAttribute('id', 'restartbuttonimg');
                            restartbuttonimg.setAttribute('src', 'restart.png');
                            restartbutton.appendChild(restartbuttonimg);
                            result.appendChild(restartbutton);
                            restartbutton.setAttribute('onclick', 'window.location.reload();');
                            document.body.innerHTML += '<div class="dark:bg-gray-800" style="bottom: 25px; position: fixed; z-index: 1002; animation: fonduendbuttosn 2s forwards;"><div class="text-center w-full mx-auto lg:px-8 z-20"><div class="lg:mt-0 lg:flex-shrink-0"><div class="mt-6 inline-flex rounded-md shadow"><button type="button" class="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " style="padding: 10px 15px;"">Back to home</button></div></div></div></div>';
                            document.getElementsByClassName('dark:bg-gray-800')[0].setAttribute('onclick', 'window.location.href = "../index.php";');
                            for (let i = 1; i < 999999; i++) {
                                window.clearInterval(i);
                            }
                            break;
                        }
                    }
                    onreload = true;
                }
            } else {
                var divpanneauscore = document.getElementById('divpanneauscore');
                var premierEnfant = divpanneauscore.firstChild;
                premierEnfant.innerHTML = 'Longueure parcourus : ' + Math.trunc(nouvelleLargeur - document.getElementsByClassName('canon')[0].offsetWidth) + 'px ';
            }
            if (nouvelleLargeur >= (window.innerWidth * 10) - 2) {
                if (!onreload) {
                    alert('Vous avez gagné !');
                    window.location.reload();
                    onreload = true;
                }
            }
            if (nouvelleLargeur - window.innerWidth * 0.3 > document.getElementsByClassName('canon')[0].offsetWidth && document.getElementsByClassName('canon')[0].style.display != 'none') {
                document.getElementsByClassName('canon')[0].style.display = 'none';
            }
        }
    });
    // Ajoutez la div à l'écouteur de ResizeObserver
    resizeObserver.observe(laserContainer);
};

function canon_laser() {
    var canon = document.createElement('img');
    canon.classList.add('canon');
    document.body.appendChild(canon);
    canon.setAttribute('src', 'canon-1-1.png');
    //attendre 0.5s puis changer l'image du canon
    setTimeout(function () {
        canon.setAttribute('src', 'canon-1-2.png');
    }
        , 1000);
    //attendre 0.5s puis changer l'image du canon
    setTimeout(function () {
        canon.setAttribute('src', 'canon-1-3.png');
    }
        , 2000);
    //attendre 0.5s puis changer l'image du canon
    setTimeout(function () {
        canon.setAttribute('src', 'canon-1-4.png');
    }, 3000);
}