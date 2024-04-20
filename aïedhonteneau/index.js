const width = 1;

window.onload = () => {
    const numberOfBoxes = Math.floor(document.body.offsetWidth / width);
    for (let i = 0; i < numberOfBoxes; i++) {
        const bottomHeight = getRandomHeight(i, numberOfBoxes);
        const topHeight = window.innerHeight - bottomHeight;

        const divBottom = createBox('boxBottom', width * i, bottomHeight);
        const divTop = createBox('boxTop', width * i, topHeight);

        animateBox(divBottom, bottomHeight);
        animateBox(divTop, topHeight);

        document.body.appendChild(divBottom);
        document.body.appendChild(divTop);
    }
}

function createBox(className, left, height) {
    const div = document.createElement('div');
    div.classList.add(className);
    div.style.width = width + 'px';
    div.style.left = left + 'px';
    div.style.height = `${height}px`;
    return div;
}

function animateBox(box, height) {
    const minHeight = window.innerHeight / 3;
    const duration = 10000000 / height;
    const keyframes = [
        { height: `${height}px` },
        { height: `${minHeight}px` },
        { height: `${height}px` }
    ];
    const options = {
        duration: duration,
        iterations: Infinity
    };
    box.animate(keyframes, options);
}

function getRandomHeight(i, numberOfBoxes) {
    const amplitude = window.innerHeight;

    const periode = Math.PI / numberOfBoxes;

    const height = amplitude * Math.sin(periode * i);

    const adjustedHeight = Math.abs(height);

    return adjustedHeight;
}

