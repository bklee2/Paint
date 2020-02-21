const canvas = document.getElementById('jsCanvas');
let prevPoint = null;
let isClicked = false;

let mouseDownCnt = 0
let mouseUpCnt = 0
// onmouseup
// onmousedown
// onmouseenter
// onmouseleaveee
function onCanvasMouseMove(e) {
    //console.dir(e);
    // console.log(x, y);
    
    if(isClicked) {
        // const x1 = prevX;
        // const y1 = prevY;
        // const x2 = e.offsetX;
        // const y2 = e.offsetY;
        const currentPoint = { 
            x: e.offsetX,
            y: e.offsetY,
        };

        drawLine(prevPoint, currentPoint);
        prevPoint = currentPoint;
    }
}

function drawLine(prevPoint, currentPoint, lineWith = 1) {
    if(!prevPoint) {
        return;
    }

    const btn = document.querySelector('.controls__color');
    btn.style.backgroundColor = isClicked ? "rgb(180, 180, 0)" : "rgb(0, 200, 200)";

    //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
    const ctx = canvas.getContext('2d');
    if(!ctx) {
        return;
    }

    const x1 = prevPoint.x;
    const y1 = prevPoint.y;
    const x2 = currentPoint.x;
    const y2 = currentPoint.y;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = lineWith;
    ctx.stroke();
}

function init() {
    canvas.addEventListener('mousemove', onCanvasMouseMove);

    const btn = document.querySelector('.controls__color');
    btn.style.backgroundColor = isClicked ? "rgb(180, 180, 0)" : "rgb(0, 200, 200)";


    canvas.addEventListener('mousedown', (e) => {
        if(e.button == 0) {
            ++mouseDownCnt;
            //console.log('canvas mousedown', mouseDownCnt);

            isClicked = true;
        }
    });

    canvas.addEventListener('mouseup', (e) => {
        if(e.button == 0) {
            ++mouseUpCnt;
            //console.log('canvas mouseup ', mouseUpCnt);

            isClicked = false;
        }
    });

    canvas.addEventListener('onmouseleaveee', (e) => {
        isClicked = false;
    });

    // document.addEventListener('mousedown', (e) => {
    //     //console.log('document mousedown');
    //     // console.dir(e);

    //     if(e.button == 0) {
    //         ++mouseDownCnt;
    //         console.log('document mousedown', mouseDownCnt);
    //     }
    // });

    // document.addEventListener('mouseup', (e) => {
    //     //console.log('document mouseup');
    //     //console.dir(e);
    //     // button, buttons, detail, eventPhase, which

    //     //++mouseUpCnt;
    //     //console.log(mouseUpCnt, 'document mouseup', e.button, e.buttons, e.detail, e.eventPhase, e.which);

    //     if(e.button == 0) {
    //         e.preventDefault();
    //         ++mouseUpCnt;
    //         //console.log('document mouseup ', mouseUpCnt);
    //     }
    // });

    // document.body.oncontextmenu = 'return false';
    // const body = document.querySelector('body');
    // body.oncontextmenu = 'return false';
    // document.body.addEventListener('oncontextmenu', () => { return false; });
    //canvas.addEventListener('oncontextmenu', () => false);
    // document.addEventListener('ondragstart', () => false);
    // document.addEventListener('onselectstart', () => false);
    //oncontextmenu="return false" ondragstart="return false" onselectstart="return false"

}

init();