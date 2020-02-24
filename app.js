const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext("2d");

let painting = false;

function onCanvasMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    //console.dir(e);
    //console.log(x, y);

    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function init() {
    if(canvas) {
        canvas.addEventListener('mousemove', onCanvasMouseMove);
        canvas.addEventListener('mousedown', startPainting);
        canvas.addEventListener('mouseup', stopPainting);
        canvas.addEventListener('mouseleave', stopPainting);

        canvas.width = 600;
        canvas.height = 600;
    }
    
    
    ctx.storkeStyle = "#2c2c2c";
    ctx.lineWith = "2.5";
}

init();