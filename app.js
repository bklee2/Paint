const canvas = document.getElementById('jsCanvas');

// onmouseup
// onmousedown
// onmouseenter
// onmouseleaveee
function onCanvasMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    console.dir(e);
    // console.log(x, y);
}

function init() {
    canvas.addEventListener('mousemove', onCanvasMouseMove);
}

init();