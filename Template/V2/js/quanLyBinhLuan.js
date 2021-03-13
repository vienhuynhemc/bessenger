sapxepdanhsach();


function changesort(item) {
    let list = item.children;
    if (list[2].checked == false) {
        list[2].checked = true;
        document.getElementById("leftheadersort1").style.display = "none";
        document.getElementById("leftheadersort2").style.display = "block";
        item.style.marginTop = "0px";
    } else {
        list[2].checked = false;
        document.getElementById("leftheadersort2").style.display = "none";
        document.getElementById("leftheadersort1").style.display = "block";
        item.style.marginTop = "-5px";
    }
}

function showsearch() {
    let list = document.getElementById("leftheadersearch").children;
    list[0].style.display = "none";
    list[1].style.display = "flex";
}

function hiddensearch() {
    let list = document.getElementById("leftheadersearch").children;
    list[1].style.display = "none";
    list[0].style.display = "flex";
}


function changeShowBL(item) {
    let listItem = item.children;
    if (listItem[2].checked == true) {
        listItem[2].checked = false;
        item.classList.remove("anbinhluan");
        item.classList.add("hienthibinhluan");
    } else {
        listItem[2].checked = true;
        item.classList.add("anbinhluan");
        item.classList.remove("hienthibinhluan");
    }
}

function removeitem(item) {
    let listItem = document.getElementById("main").children;
    for (let i = 0; i < listItem.length; i++) {
        let list2 = listItem[i].children;
        let list3 = list2[0].children;
        if (list3[2] == item) {
            document.getElementById("main").removeChild(listItem[i]);
            sapxepdanhsach();
            return;
        }
    }
}

function sapxepdanhsach() {
    let listItem = document.getElementById("main").children;
    for (let i = 0; i < listItem.length; i++) {
        if (i > 5) {
            listItem[i].style.display = "none";
        } else {
            listItem[i].style.display = "flex";
        }
    }
}

function trovetrangquanly() {
    document.getElementById("div1").style.display = "block";
    document.getElementById("div2").style.display = "none";
}

function aibaocao(item) {
    document.getElementById("div2").style.display = "block";
    document.getElementById("div1").style.display = "none";

    let listRight = document.getElementById("div2").children;
    for (let i = 0; i < listRight.length; i++) {
        document.getElementById("div2").removeChild(listRight[i])
    }

    let l1 = document.getElementById("main").children;
    for (let i = 0; i < l1.length; i++) {
        let l2 = l1[i].children;
        let l3 = l2[0].children;
        let l4 = l3[3].children;
        if (l4[1] == item) {
            document.getElementById("div2").appendChild(l3[4].cloneNode(true));
            return;
        }
    }
}

function showsearch2(item) {
    let l1 = document.getElementById("div2").children;
    let l2 = l1[0].children;
    let l3 = l2[0].children;
    let l4 = l3[0].children;
    let l5 = l4[1].children;
    let l6 = l5[1].children;
    if (l6[0] == item) {
        l6[1].style.display = "flex";
        l6[0].style.display = "none";
        return;
    }
}

function hiddensearch2(item) {
    let l1 = document.getElementById("div2").children;
    let l2 = l1[0].children;
    let l3 = l2[0].children;
    let l4 = l3[0].children;
    let l5 = l4[1].children;
    let l6 = l5[1].children;
    let l7 = l6[1].children;
    if (l7[0] == item) {
        l6[0].style.display = "flex";
        l6[1].style.display = "none";
        return;
    }
}

function changesort2(item) {
    let list = item.children;
    console.log(list)
    if (list[2].checked == false) {
        list[2].checked = true;
        list[0].style.display = "none";
        list[1].style.display = "block";
        item.style.marginTop = "0px";
    } else {
        list[2].checked = false;
        list[1].style.display = "none";
        list[0].style.display = "block";
        item.style.marginTop = "-5px";
    }
}