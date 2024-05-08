const valueBar = document.getElementById('valueBar');
valueBar.addEventListener('input', (e) => {
    const zoomLevel = e.target.value;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    document.body.style.backgroundSize = `${zoomLevel}px ${zoomLevel}px`;
    document.body.style.backgroundPosition = `${centerX}px ${centerY}px`;
});

const backtohome = document.getElementById('backtohome');
backtohome.addEventListener('click', () => {
    document.location.href = '../index.php';
});