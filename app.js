const DEFAULT_LINE_WIDTH = 2.5;
const DEFAULT_COLOR = "#2c2c2c";
const DEFAULT_CANVAS_SIZE = 600;

const canvas = document.getElementById('jsCanvas');

let prevPoint = null;
function toPoint(e) {
    return e ? { 
        x: e.offsetX,
        y: e.offsetY,
    } : null;
}

let painting = false;
let filling = false;

function drawLine(point1, point2) {
    if(!point1 || !point2) {
        return;
    }

    //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
    const ctx = canvas.getContext('2d');
    if(!ctx) {
        return;
    }

    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    // ctx.lineWidth = lineWith;
    // ctx.strokeStyle = color;
    ctx.stroke();
    //ctx.closePath();
}

function init() {
    canvas.width = DEFAULT_CANVAS_SIZE;
    canvas.height = DEFAULT_CANVAS_SIZE;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = DEFAULT_COLOR;
    ctx.strokeStyle = DEFAULT_COLOR;
    ctx.lineWidth = DEFAULT_LINE_WIDTH;


    //canvas.addEventListener('mousemove', onCanvasMouseMove);
    const onCanvasMouseMove = (e) => {
        //console.log('canvas mousemove');

        if(painting) {
            const currentPoint = toPoint(e);
            drawLine(prevPoint, currentPoint);
            prevPoint = toPoint(e);
            return;
        }
    }

    const startPainting = (e) => {
        if(e.button == 0) {
            painting = true;
            prevPoint = toPoint(e);
        }
    }

    const stopPainting = (e) => {
        if(e.button == 0) {
            painting = false;
            prevPoint = null;
        }
    };

    const onMouseDown = (e) => {
        if(filling) {
            if(e.button == 0) {
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                stopPainting(e);
            }
            
            return;
        } else {
            startPainting(e);
        }
    };
    
    const onModeClick = (e) => {
        e.target.innerText = filling ? "fill" : "paint";
        filling = !filling;
    };

    const onSaveClick = (e) => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "image";
        link.click();
    };

    canvas.addEventListener('mousemove', onCanvasMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    // canvas.addEventListener('contextmenu', (e) => e.preventDefault()); // 우클릭 방지
    

    // 컬러 버튼 클릭 시 색상 변경 이벤트
    const colors = document.getElementsByClassName("controls__color");
    Array.from(colors).forEach(c => c.addEventListener("click", (e) => ctx.fillStyle = ctx.strokeStyle = e.target.style.backgroundColor));

    // 펜 두께 설정 range 컨트롤 이벤트
    const range = document.getElementById("jsRange");
    range.addEventListener("input", (e) => ctx.lineWidth = e.target.value);
    //range.addEventListener("input", (e) => console.log(e.target.value));
    
    // 펜으로 그리기, 색 채우기 모드 변경 버튼 이벤트
    const mode = document.getElementById("jsMode");
    mode.addEventListener("click", onModeClick);
    
    // 펜으로 그리기, 색 채우기 모드 변경 버튼 이벤트
    const save = document.getElementById("jsSave");
    save.addEventListener("click", onSaveClick);

}

init();