let countImg = 4;
let now = 0;
let slide = false;
let lastTime = 0;

function checkSlide() {
    let date = new Date();
    let time = date.getTime();
    if (time - lastTime > 1000) {
        slide = false;
        lastTime = time;
    }
}

setInterval(() => {
    checkSlide();
    if (!slide) {
        slide = true;
        let step = 100 * countImg - 100;
        if (countImg > 1) {
            if (now >= step) {
                now = 0;
            } else {
                now += 100;
            }
        }

        document.getElementById('mainslider').style.left = `-${now}%`;
    }
}, 3000);



function leftslide() {
    checkSlide();
    if (!slide) {
        slide = true;
        let step = 100 * countImg - 100;
        if (countImg > 1) {
            if (now <= 0) {
                now = step;
            } else {
                now -= 100;
            }
        }
        document.getElementById('mainslider').style.left = `-${now}%`;
    }
}

function rightslide() {
    checkSlide();
    if (!slide) {
        slide = true;
        let step = 100 * countImg - 100;
        if (countImg > 1) {
            if (now >= step) {
                now = 0;
            } else {
                now += 100;
            }
        }
        document.getElementById('mainslider').style.left = `-${now}%`;
    }
}



////////////////////////////////////////////

let rd = false;
let lastTimeRd = 0;
let nowRd = 0;

function checkRD() {
    let date = new Date();
    let time = date.getTime();
    if (time - lastTimeRd > 500) {
        rd = false;
        lastTimeRd = time;
    }
}

setInterval(() => {
    checkRD();
    if (!rd) {
        rd = true;
        if (nowRd == 0) {
            nowRd = 100;
            document.getElementById('runkhlist').style.left = `-${nowRd}%`;
            document.getElementById('rd2').checked = true;
        } else {
            nowRd = 0;
            document.getElementById('runkhlist').style.left = `-${nowRd}%`;
            document.getElementById('rd1').checked = true;
        }
    }
}, 5000);

function leftRD() {
    checkRD();
    if (!rd) {
        rd = true;
        nowRd = 0;
        document.getElementById('runkhlist').style.left = `-${nowRd}%`;
    } else {
        document.getElementById('rd2').checked = true;
    }
}

function rightRD() {
    checkRD();
    if (!rd) {
        console.log('a');
        rd = true;
        nowRd = 100;
        document.getElementById('runkhlist').style.left = `-${nowRd}%`;
    } else {
        document.getElementById('rd1').checked = true;
    }
}
