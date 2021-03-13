function plustocard() {
    let inputsl = document.getElementById('sladdtocard');
    inputsl.value = `${parseInt(inputsl.value) + 1}`;
}

function subtocard() {
    let inputsl = document.getElementById('sladdtocard');
    if (inputsl.value > 1) {
        inputsl.value = `${parseInt(inputsl.value) - 1}`;
    }
}

function plustocard2() {
    let inputsl = document.getElementById('sladdtocard2');
    inputsl.value = `${parseInt(inputsl.value) + 1}`;
}

function subtocard2() {
    let inputsl = document.getElementById('sladdtocard2');
    if (inputsl.value > 1) {
        inputsl.value = `${parseInt(inputsl.value) - 1}`;
    }
}

function report(item) {
    let listItem = item.children;
    if (listItem[4].checked == true) {
        listItem[4].checked = false;
        listItem[3].style.transform = "scaleY(0)";
    } else {
        listItem[4].checked = true;
        listItem[3].style.transform = "scaleY(1)";
    }
}

function vietdanhgia() {
    document.getElementById("vietdanhgia").style.transform = "scaleY(1)";
}

function closedanhgia() {
    document.getElementById("vietdanhgia").style.transform = "scaleY(0)";
}

function removedanhgia() {
    document.getElementById("danhgia").style.display = "block";
    document.getElementById("danhgia2").style.display = "none";
}

function dangdanhgia() {
    document.getElementById("danhgia2").style.display = "block";
    document.getElementById("danhgia").style.display = "none";
    closedanhgia();
}