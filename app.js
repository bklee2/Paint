const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext("2d");

let painting = false;
let filling = false;

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
        //ctx.closePath();        
    }
}

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function handleColorClick(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}

function handleRangeChange(event) {
    //console.log(event.target.value);
    ctx.lineWidth = event.target.value;
}

function handleModeClick(event) {
    //console.log(event);
    if(filling) {
        filling = false;
        event.target.innerText = "fill";
    } else {
        filling = true;
        event.target.innerText = "paint";
    }
}

function handleCanvasClick(event) {
    // console.log(event);
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }  
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick(event) {
    //console.log(event);
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "image";
    link.click();
    console.log(link);
}

function init() {
    if(canvas) {
        canvas.addEventListener('mousemove', onCanvasMouseMove);
        canvas.addEventListener('mousedown', startPainting);
        canvas.addEventListener('mouseup', stopPainting);
        canvas.addEventListener('mouseleave', stopPainting);
        canvas.addEventListener('click', handleCanvasClick);
        canvas.addEventListener('contextmenu', handleCM);

        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;
    }
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.strokeStyle = INITIAL_COLOR;
    ctx.fillStyle = INITIAL_COLOR;
    
    ctx.lineWidth = "2.5";

    const colors = document.getElementsByClassName("jsColor");
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
    

    const range = document.getElementById("jsRange");
    if(range) {
        range.addEventListener("input", handleRangeChange);
    }

    const mode = document.getElementById("jsMode");
    if(mode) {
        mode.addEventListener("click", handleModeClick);
    }

    const saveBtn = document.getElementById("jsSave");
    if(jsSave) {
        jsSave.addEventListener("click", handleSaveClick);
    }
}

init();