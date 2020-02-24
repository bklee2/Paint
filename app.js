const canvas = document.getElementById('jsCanvas');

let isClicked = false;
let prevPoint = null;
function toPoint(e) {
    return e ? { 
        x: e.offsetX,
        y: e.offsetY,
    } : null;
}


let mouseDownCnt = 0
let mouseUpCnt = 0

// function onCanvasMouseMove(e) {
//     //console.dir(e);
//     // console.log(x, y);
    
//     if(isClicked) {
//         // const x1 = prevX;
//         // const y1 = prevY;
//         // const x2 = e.offsetX;
//         // const y2 = e.offsetY;

//         // const currentPoint = { 
//         //     x: e.offsetX,
//         //     y: e.offsetY,
//         // };
//         SetPrevPoint(e);

//         drawLine(prevPoint, currentPoint);
//         prevPoint = currentPoint;
//     }
// }

function drawLine(point1, point2, lineWith = 1) {
    if(!point1 || !point2) {
        return;
    }

    // const btn = document.querySelector('.controls__color');
    // btn.style.backgroundColor = isClicked ? "rgb(180, 180, 0)" : "rgb(0, 200, 200)";

    //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
    const ctx = canvas.getContext('2d');
    if(!ctx) {
        return;
    }

    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = lineWith;
    ctx.stroke();
}

function init() {
    canvas.width = 600;
    canvas.height = 600;

    const ctx = canvas.getContext('2d');

    //canvas.addEventListener('mousemove', onCanvasMouseMove);
    canvas.addEventListener('mousemove', (e) => {
        //console.log('canvas mousemove');
        if(isClicked) {
            const currentPoint = toPoint(e);
            drawLine(prevPoint, currentPoint);
            prevPoint = toPoint(e);
        }
    });

    // const btn = document.querySelector('.controls__color');
    // btn.style.backgroundColor = isClicked ? "rgb(180, 180, 0)" : "rgb(0, 200, 200)";


    canvas.addEventListener('mousedown', (e) => {
        if(e.button == 0) {
            ++mouseDownCnt;
            console.log('canvas mousedown', mouseDownCnt);

            isClicked = true;
            prevPoint = toPoint(e);
        }
    });

    const onMouseUp = (e) => {
        if(e.button == 0) {
            ++mouseUpCnt;
            console.log('canvas mouseup ', mouseUpCnt);

            isClicked = false;
            prevPoint = null;
        }
    };
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);

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
}

init();