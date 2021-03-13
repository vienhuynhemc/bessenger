capnhaphienthi();

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

function showselect(item) {

    let index = 0;

    let list = document.getElementById("maindiv2").children;
    for (let i = 1; i < list.length; i++) {
        list2 = list[i].children;
        if (list2[8] == item) {
            index = i;
            break;
        }
    }

    if (index < 9) {
        let listItem = item.children;
        if (listItem[0].checked == true) {
            listItem[0].checked = false;
            listItem[4].style.display = "none";
        } else {
            listItem[0].checked = true;
            listItem[4].style.display = "block";
        }
    } else {


        let listItem = item.children;
        listItem[4].style.top = "-82px"
        if (listItem[0].checked == true) {
            listItem[0].checked = false;
            listItem[4].style.display = "none";
        } else {
            listItem[0].checked = true;
            listItem[4].style.display = "block";
        }
    }
}

function removekhachhang(item) {
    let listItem = document.getElementById("maindiv2").children;
    for (let i = 1; i < listItem.length; i++) {
        let list = listItem[i].children;
        let list2 = list[8].children;
        let list3 = list2[4].children;
        if (list3[0] == item) {
            document.getElementById("maindiv2").removeChild(listItem[i]);
            capnhaphienthi();
            return;
        }
    }
}

function capnhaphienthi() {
    let listItem = document.getElementById("maindiv2").children;
    for (let i = 0; i < listItem.length; i++) {
        if (i <= 10) {
            listItem[i].style.display = "flex";
        } else {
            listItem[i].style.display = "none";
        }
    }
}

function xoacacmuadachon() {
    let listItem = document.getElementById("maindiv2").children;
    let array = [];
    for (let i = 1; i < listItem.length; i++) {
        let list2 = listItem[i].children;
        let list3 = list2[0].children;
        if (list3[0].checked == true) {
            array.push(listItem[i]);
        }
    }

    for (let i = 0; i < array.length; i++) {
        document.getElementById("maindiv2").removeChild(array[i]);
    }
}

function allselect() {
    let listItem = document.getElementById("maindiv2").children;
    let a = 0;
    for (let i = 1; i < listItem.length; i++) {
        let list2 = listItem[i].children;
        let list3 = list2[0].children;
        if (list3[0].checked == true) {
            a = 1;
            break;
        }
    }

    if (a == 1) {
        for (let i = 1; i < listItem.length; i++) {
            let list2 = listItem[i].children;
            let list3 = list2[0].children;
            if (list3[0].checked == true) {
                list3[0].checked = false;
            }
        }
    } else {
        for (let i = 1; i < listItem.length; i++) {
            let list2 = listItem[i].children;
            let list3 = list2[0].children;
            list3[0].checked = true;
        }
    }
}

function nhaphang() {


    let div1 = document.createElement("div");
    div1.classList.add("item");
    let label = document.createElement("label");
    let input1 = document.createElement("input");
    input1.type = "checkbox";
    label.appendChild(input1);
    div1.appendChild(label);
    let div2 = document.createElement("div");
    let img = document.createElement("img");
    img.src = "/tvtShop/img/product/pro10.webp";
    div2.classList.add("hinhsanpham");
    div2.appendChild(img);
    div1.appendChild(div2);

    let p = document.createElement("p");
    p.innerText = "Áo Thun MTS 1011";
    p.classList.add("itemname");
    div1.appendChild(p);

    let pp1 = document.createElement("p");
    pp1.innerHTML = "M";
    pp1.classList.add("itemsize");

    let pp2 = document.createElement("p");
    pp2.innerHTML = "Đỏ";
    pp2.classList.add("itemmau")
    div1.appendChild(pp1);
    div1.appendChild(pp2);

    let p1 = document.createElement("p");
    p1.innerText = "360,000 VND";
    p1.classList.add("itemgianhap");
    div1.appendChild(p1);

    let input2 = document.createElement("input");
    input2.type = "number";
    input2.classList.add("itemsoluong");
    input2.value = "40";
    div1.append(input2);

    let p2 = document.createElement("p");
    p2.innerText = "12,400,000 VND";
    p2.classList.add("itemtongia");
    div1.appendChild(p2);

    let div3 = document.createElement("div");
    div3.classList.add("itemsubmit");
    div3.onclick = function () { showselect(div3) };
    let input3 = document.createElement("input");
    input3.type = "text";
    input3.style.display = "none";
    div3.appendChild(input3);
    let i1 = document.createElement("i");
    i1.classList.add("fa");
    i1.classList.add("fa-circle");
    let i2 = document.createElement("i");
    i2.classList.add("fa");
    i2.classList.add("fa-circle");
    let i3 = document.createElement("i");
    i3.classList.add("fa");
    i3.classList.add("fa-circle");
    div3.append(i1);
    div3.append(i2);
    div3.append(i3);
    let div4 = document.createElement("div");
    let button = document.createElement("button");
    button.onclick = function () { removekhachhang(button) };
    let i4 = document.createElement("i");
    i4.classList.add("fa");
    i4.classList.add("fa-trash");
    button.appendChild(i4);
    let pxoa = document.createElement("p");
    pxoa.innerText = "Xóa";
    button.appendChild(pxoa);
    div4.appendChild(button);
    div3.appendChild(div4)
    div1.appendChild(div3)

    document.getElementById("maindiv2").appendChild(div1);
    capnhaphienthi();
}
