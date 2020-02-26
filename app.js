const DEFAULT_LINE_WIDTH = 2.5;
const DEFAULT_COLOR = "#2c2c2c";
const DEFAULT_CANVAS_SIZE = 600;

const canvas = document.getElementById('jsCanvas');

let painting = false;
let filling = false;

function init() {
    canvas.width = DEFAULT_CANVAS_SIZE;
    canvas.height = DEFAULT_CANVAS_SIZE;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = DEFAULT_COLOR;
    ctx.strokeStyle = DEFAULT_COLOR;
    ctx.lineWidth = DEFAULT_LINE_WIDTH;

    const onMouseDown = (e) => {
        if(e.button == 0) {
            if(filling) {
                ctx.fillRect(0, 0, canvas.width, canvas.height); // 색 채우기
            } else {
                painting = true;
            }
        }
    }

    const onMouseMove = (e) => {
        const x = e.offsetX || (e.touches[0].pageX - e.touches[0].target.offsetLeft);
        const y = e.offsetY || (e.touches[0].pageY - e.touches[0].target.offsetTop);
        if (!painting) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }

    const stopPainting = (e) => {
        if(e.button == 0) {
            painting = false;
        }
    }

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

    // 캔버스 이벤트
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('contextmenu', (e) => e.preventDefault()); // 우클릭 방지
    
    // 모바일
    canvas.addEventListener('touchstart', onMouseDown);
    canvas.addEventListener('touchmove', onMouseMove);
    canvas.addEventListener('touchend', stopPainting);
    canvas.addEventListener('touchcancel', stopPainting);

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