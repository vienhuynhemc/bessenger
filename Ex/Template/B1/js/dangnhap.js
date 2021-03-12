function dangky() {
    document.getElementById('left').style.left = '40%';
    document.getElementById('right').style.left = '0%';
    document.getElementById('contentright').style.opacity = '0';
    document.getElementById('ctl').style.opacity = '1';
    document.getElementById('ctl').style.zIndex = 10;
    document.getElementById('contentright').style.zIndex = 1;

    document.getElementById('loginpage').style.zIndex = '2';
    document.getElementById('signuppage').style.zIndex = '5';
    document.getElementById('loginpage').style.opacity = '0';
    document.getElementById('signuppage').style.opacity = '1';
}

function dangnhap() {
    document.getElementById('left').style.left = '0%';
    document.getElementById('right').style.left = '60%';
    document.getElementById('contentright').style.opacity = '1';
    document.getElementById('ctl').style.opacity = '0';
    document.getElementById('ctl').style.zIndex = 1;
    document.getElementById('contentright').style.zIndex = 10;

    document.getElementById('loginpage').style.zIndex = '5';
    document.getElementById('signuppage').style.zIndex = '2';
    document.getElementById('loginpage').style.opacity = '1';
    document.getElementById('signuppage').style.opacity = '0';
}

function completesuccess() {
    document.getElementById('success').style.transform = 'scaleY(0)';
    dangnhap();
}

function displayNoti() {
    document.getElementById('notifi1').style.display = 'flex';
    document.getElementById('notifi2').style.display = 'none';
    document.getElementById('success').style.transform = 'scaleY(1)';
}

function gotocomplete(){

   hiddendivpassword();

    document.getElementById('notifi2').style.display = 'flex';
    document.getElementById('notifi1').style.display = 'none';
    document.getElementById('success').style.transform = 'scaleY(1)';
}

function displaydivpassword() {
    document.getElementById('divpassword').style.transform = 'scaleY(1)';
}

function hiddendivpassword() {
    document.getElementById('divpassword').style.transform = 'scaleY(0)';
    document.getElementById('left2divpassword1').style.top = '100%';
    document.getElementById('left2divpassword1').style.opacity = '0';
    document.getElementById('left2divpassword1').style.zIndex = '1';
    document.getElementById('left2divpassword2').style.top = '100%';
    document.getElementById('left2divpassword2').style.opacity = '0';
    document.getElementById('left2divpassword2').style.zIndex = '1';
    document.getElementById('left1divpassword').style.opacity = '1';
    document.getElementById('left1divpassword').style.zIndex = 2;
    document.getElementById('left3divpassword').style.top = '100%';
    document.getElementById('left3divpassword').style.opacity = '0';
    document.getElementById('left3divpassword').style.zIndex = '1';
}

function sdt() {
    document.getElementById('left1divpassword').style.opacity = '0';
    document.getElementById('left1divpassword').style.zIndex = 1;

    document.getElementById('left2divpassword11').style.display = 'none';
    document.getElementById('left2divpassword12').style.display = 'block';

    document.getElementById('left2divpassword1').style.opacity = '1';
    document.getElementById('left2divpassword1').style.zIndex = '2';
    document.getElementById('left2divpassword1').style.top = '0%'
}

function email() {
    document.getElementById('left1divpassword').style.opacity = '0';
    document.getElementById('left1divpassword').style.zIndex = 1;

    document.getElementById('left2divpassword12').style.display = 'none';
    document.getElementById('left2divpassword11').style.display = 'block';

    document.getElementById('left2divpassword1').style.opacity = '1';
    document.getElementById('left2divpassword1').style.zIndex = '2';
    document.getElementById('left2divpassword1').style.top = '0%'
}

function hiddendivpasswordBack1() {
    document.getElementById('left2divpassword1').style.top = '100%';
    document.getElementById('left2divpassword1').style.opacity = '0';
    document.getElementById('left2divpassword1').style.zIndex = '1';
    document.getElementById('left1divpassword').style.opacity = '1';
    document.getElementById('left1divpassword').style.zIndex = 2;
}

function verysdt() {

    document.getElementById('left2divpassword1').style.opacity = '0';
    document.getElementById('left2divpassword1').style.zIndex = 1;

    document.getElementById('left2divpassword2').style.top = '0%';
    document.getElementById('left2divpassword2').style.opacity = '1';
    document.getElementById('left2divpassword2').style.zIndex = '2';

    document.getElementById('left2divpassword21').style.display = 'none';
    document.getElementById('left2divpassword22').style.display = 'block';
}

function veryemail() {
    document.getElementById('left2divpassword1').style.opacity = '0';
    document.getElementById('left2divpassword1').style.zIndex = 1;

    document.getElementById('left2divpassword2').style.top = '0%';
    document.getElementById('left2divpassword2').style.opacity = '1';
    document.getElementById('left2divpassword2').style.zIndex = '2';

    document.getElementById('left2divpassword21').style.display = 'block';
    document.getElementById('left2divpassword22').style.display = 'none';
}

function hiddendivpasswordBack2() {
    document.getElementById('left2divpassword2').style.opacity = '0';
    document.getElementById('left2divpassword2').style.zIndex = '1';

    document.getElementById('left2divpassword1').style.opacity = '1';
    document.getElementById('left2divpassword1').style.zIndex = 2;
}

function gotochange() {
    document.getElementById('left2divpassword2').style.opacity = '0';
    document.getElementById('left2divpassword2').style.zIndex = '1';

    document.getElementById('left3divpassword').style.top = '0%';
    document.getElementById('left3divpassword').style.opacity = '1';
    document.getElementById('left3divpassword').style.zIndex = '2';
}

function toAccount(){
    window.location = '../../tvtShop/changeInforCustomer.html';
}