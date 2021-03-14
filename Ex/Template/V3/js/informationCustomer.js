let countImg = 5;
let now = 0;
let slide = false;
let lastTime = 0;

// function loadIMG(event) {
//     if (event.target.files.length > 0) {
//         var src = URL.createObjectURL(event.target.files[0]);
//         document.getElementById('avatar').src = src;
//         document.getElementById('avatar2').src = src;
//     }
// }

// function removeAvatar() {
//     document.getElementById('avatar').src = 'img/user.jpg';
//     document.getElementById('avatar2').src = 'img/user.jpg';
// }

function gobackpassword() {
    document.getElementById('changepassword').style.transform = 'scaleY(0)';
    document.getElementById('changepassworddiv').style.opacity = '1';
    document.getElementById('changepassworddiv').style.zIndex = '2';
    document.getElementById('changepasswordsuccess').style.opacity = '0';
    document.getElementById('changepasswordsuccess').style.zIndex = '1';
}

function gotosuccesspassword() {
    document.getElementById('changepassworddiv').style.opacity = '0';
    document.getElementById('changepassworddiv').style.zIndex = '1';
    document.getElementById('changepassworddiv').style.transform = 'scaleY(0)';
    document.getElementById('changepasswordsuccess').style.opacity = '1';
    document.getElementById('changepasswordsuccess').style.zIndex = '2';
}

function doimatkhau() {
    document.getElementById('changepassworddiv').style.transform = 'scaleY(1)';
    document.getElementById('changepassword').style.transform = 'scaleY(1)';
}

function left() {
    checkSlide();
    if (!slide) {
        slide = true;
        let step = 33 * countImg - 100 + 1;
        if (countImg > 1) {
            console.log(now);
            if (now <= 0) {
                now = step;
            } else {
                now -= 33;
            }
        }
        document.getElementById('listhinh').style.left = `-${now}%`;
    }
}

function right() {
    checkSlide();
    if (!slide) {
        slide = true;
        let step = 33 * countImg - 100;
        if (countImg > 1) {
            if (now >= step) {
                now = 0;
            } else {
                now += 33;
            }
        }
        document.getElementById('listhinh').style.left = `-${now}%`;
    }
}

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
        let step = 33 * countImg - 100;
        if (countImg > 1) {
            if (now >= step) {
                now = 0;
            } else {
                now += 33;
            }
        }
        document.getElementById('listhinh').style.left = `-${now}%`;
    }
}, 2000);

function trangthai() {
    document.getElementById('leftaccount').style.height = '1225px';
    document.getElementById('rightaccount').style.height = '1125px';
    document.getElementById('contentaccount').style.height = '1325px';
    document.getElementById('historyorder').style.top = '100%';
    document.getElementById('status').style.top = '0%';
    document.getElementById('buttontrangthai').classList.add('activeeselect');
    document.getElementById('buttonlsm').classList.remove('activeeselect');
}

function lichsumua() {
    document.getElementById('leftaccount').style.height = '940px';
    document.getElementById('rightaccount').style.height = '720px';
    document.getElementById('contentaccount').style.height = '1040px';
    document.getElementById('historyorder').style.top = '0%';
    document.getElementById('status').style.top = '100%';
    document.getElementById('buttontrangthai').classList.remove('activeeselect');
    document.getElementById('buttonlsm').classList.add('activeeselect');

}

function trovetaikhoan() {
    document.getElementById('inforcart').style.transform = 'scaleY(0)';
}

function xemchitiet() {
    document.getElementById('inforcart').style.transform = 'scaleY(1)';
}


