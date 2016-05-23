
var markdownContainer = document.getElementById('markdown-container');

markdownContainer.onclick = function (event) {
    if (event.target.nodeName === 'IMG') {
        if (event.target.parentNode.nodeName !== 'A') {
            window.imageBridge.openImage(event.target.src);
        }
    }
};

function updateContent(html) {
    markdownContainer.innerHTML = html;
}
