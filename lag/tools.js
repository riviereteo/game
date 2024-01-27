var autorandom = true;
var newnbOfBalls = 50;
var coeffSize = 1;
function creatTools() {
    var tools = document.createElement("div");
    tools.id = "tools";
    var jauge = document.createElement("div");
    jauge.id = "jauge";
    var jaugeBar = document.createElement("div");
    jaugeBar.id = "jaugeBar";
    var imgbefore = document.createElement("img");
    imgbefore.src = "./before.png";
    imgbefore.classList.add("fire");
    var imgafter = document.createElement("img");
    imgafter.src = "./after.png";
    imgafter.classList.add("fire");
    jaugebarContainer = document.createElement("div");
    jaugebarContainer.id = "jaugebarContainer";
    var toolsimg = document.createElement("img");
    toolsimg.src = "./tools.png";
    toolsimg.id = "toolsimg";
    var backtohome = document.createElement("div");
    backtohome.id = "backtohome";
    backtohome.innerHTML = '<span class="material-symbols-outlined">home</span>';
    backtohome.addEventListener("click", function () {
        window.location.href = "../index.html";
    });
    jaugebarContainer.appendChild(jaugeBar);
    jauge.appendChild(imgbefore);
    jauge.appendChild(jaugebarContainer);
    jauge.appendChild(imgafter);
    tools.appendChild(jauge);
    tools.appendChild(toolsimg);
    tools.appendChild(backtohome);
    document.body.appendChild(tools);
    jauge.style.marginTop = (tools.offsetHeight - jauge.offsetHeight) / 2 + "px";
    toolsimg.style.marginTop = (tools.offsetHeight - jauge.offsetHeight) / 2 + "px";
    imgbefore.style.height = jauge.offsetHeight - 6 + "px";
    imgafter.style.height = jauge.offsetHeight - 6 + "px";
    jaugebarContainer.style.marginTop = (jauge.offsetHeight - jaugebarContainer.offsetHeight) / 2 + "px";
    toolsimg.addEventListener("click", function () {
        var toolsWindow = document.createElement("div");
        toolsWindow.id = "toolsWindow";
        var toolsWindowClose = document.createElement("div");
        toolsWindowClose.id = "toolsWindowClose";
        toolsWindowClose.innerHTML = "X";
        var toolsWindowValidate = document.createElement("div");
        toolsWindowValidate.id = "toolsWindowValidate";
        toolsWindowValidate.innerHTML = "Valider";
        var toolsWindowAttributes = document.createElement("div");
        toolsWindowAttributes.id = "toolsWindowAttributes";
        var toolsWindowButonsQuitParent = document.createElement("div");
        toolsWindowButonsQuitParent.id = "toolsWindowButonsQuitParent";
        var attributenbOfBallsChekauto = document.createElement("input");
        attributenbOfBallsChekauto.type = "checkbox";
        attributenbOfBallsChekauto.id = "attributenbOfBallsChekauto";
        var attributenbOfBallsChekautotxt = document.createElement("p");
        attributenbOfBallsChekautotxt.innerHTML = "Nombre de balles random : ";
        attributenbOfBallsChekautotxt.classList.add("attributetxt");
        var attributenbOfBallsChekautoParent = document.createElement("div");
        attributenbOfBallsChekautoParent.classList.add("attributeparent");
        var attributecoeffsizeparent = document.createElement("div");
        attributecoeffsizeparent.classList.add("attributeparent");
        var attributecoeffsize = document.createElement("input");
        attributecoeffsize.type = "number";
        attributecoeffsize.id = "attributecoeffsize";
        attributecoeffsize.value = coeffSize;
        var attributecoeffsizetxt = document.createElement("p");
        attributecoeffsizetxt.innerHTML = "Coefficient de taille : ";
        attributecoeffsizetxt.classList.add("attributetxt");
        toolsWindowAttributes.appendChild(attributenbOfBallsChekautoParent);
        attributenbOfBallsChekautoParent.appendChild(attributenbOfBallsChekautotxt);
        attributenbOfBallsChekautoParent.appendChild(attributenbOfBallsChekauto);
        toolsWindowAttributes.appendChild(attributecoeffsizeparent);
        attributecoeffsizeparent.appendChild(attributecoeffsizetxt);
        attributecoeffsizeparent.appendChild(attributecoeffsize);
        toolsWindow.appendChild(toolsWindowAttributes);
        toolsWindow.appendChild(toolsWindowButonsQuitParent);
        toolsWindowButonsQuitParent.appendChild(toolsWindowValidate);
        toolsWindowButonsQuitParent.appendChild(toolsWindowClose);
        document.body.appendChild(toolsWindow);
        toolsWindowClose.addEventListener("click", function () {
            toolsWindow.remove();
        });
        toolsWindowValidate.addEventListener("click", function () {
            if (!attributenbOfBallsChekauto.checked) {
                newnbOfBalls = document.getElementById("attributenbOfBallsChekautoinput").value;
            }
            coeffSize = document.getElementById("attributecoeffsize").value;
            while (document.body.firstChild) {
                document.body.removeChild(document.body.firstChild);
            }
            times = [0, 0, 0, 0, 0]
            creatTools();
            main();
        });
        if (autorandom) {
            attributenbOfBallsChekauto.checked = true;
        }
        attributenbOfBallsChekauto.addEventListener("click", function () {
            autorandom = !autorandom;
        });
        if (!attributenbOfBallsChekauto.checked) {
            attributenbOfBallsChekautotxt.innerHTML = "Nombre de balles random : ";
            var attributenbOfBallsChekautoinput = document.createElement("input");
            attributenbOfBallsChekautoinput.type = "number";
            attributenbOfBallsChekautoinput.id = "attributenbOfBallsChekautoinput";
            attributenbOfBallsChekautoinput.value = newnbOfBalls;
            attributenbOfBallsChekautoParent.appendChild(attributenbOfBallsChekautoinput);
        }
        attributenbOfBallsChekauto.addEventListener("click", function () {
            if (!attributenbOfBallsChekauto.checked) {
                attributenbOfBallsChekautotxt.innerHTML = "Nombre de balles random : ";
                var attributenbOfBallsChekautoinput = document.createElement("input");
                attributenbOfBallsChekautoinput.type = "number";
                attributenbOfBallsChekautoinput.id = "attributenbOfBallsChekautoinput";
                attributenbOfBallsChekautoinput.value = newnbOfBalls;
                attributenbOfBallsChekautoParent.appendChild(attributenbOfBallsChekautoinput);
            } else {
                attributenbOfBallsChekautotxt.innerHTML = "Nombre de balles random : ";
                attributenbOfBallsChekautoParent.removeChild(document.getElementById("attributenbOfBallsChekautoinput"));
            }
        });
    });
}
var ancien_temps = 0;
function startJauge() {
    var tiime = 0;
    for (var i = 0; i < 5; i++) {
        tiime += times[times.length - 1 - i];
    }
    time = tiime / 5;
    if (ancien_temps + 1 < time) {
        ancien_temps = time;
        var jaugeBar = document.getElementById("jaugeBar");
        jaugeBar.style.width = time * 1.2 + "%";
    }
}