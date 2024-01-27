function start (url) {
    alert('ok');
    let href = window.location.href;
    let index = href.indexOf('game/');
    if (index !== -1) {
        href = href.substring(0, index + 5);
    }
    window.location.href = href + url;
}