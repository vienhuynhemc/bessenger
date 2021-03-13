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
        if (list2[9] == item) {
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
        listItem[4].style.top = "-115px"
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
        let list2 = list[9].children;
        let list3 = list2[4].children;
        if (list3[1] == item) {
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

function themsanphammoi() {
    document.getElementById("div1").style.display = "block";
    document.getElementById("div2").style.display = "none";
    document.getElementById("div3").style.display = "none";
}

function trove() {
    document.getElementById("div2").style.display = "block";
    document.getElementById("div1").style.display = "none";
    document.getElementById("div3").style.display = "none";
}

function editkhachhang(item) {

    if (document.getElementById("div3").children.length > 0) {
        document.getElementById("div3").removeChild(document.getElementById("div3").children[0]);
    }

    let listItem = document.getElementById("maindiv2").children;
    for (let i = 1; i < listItem.length; i++) {
        let list = listItem[i].children;
        let list2 = list[9].children;
        let list3 = list2[4].children;
        if (list3[0] == item) {
            document.getElementById("div3").appendChild(list[10].cloneNode(true));
            document.getElementById("div3").style.display = "block";
            document.getElementById("div1").style.display = "none";
            document.getElementById("div2").style.display = "none";
            return;
        }
    }
}

function nam(item) {
    let l1 = document.getElementById("div1").children;
    let l2 = l1[0].children;
    let l3 = l2[0].children;
    let l4 = l3[5].children;
    let l5 = l4[1].children;
    l5[1].classList.remove("activebutton");
    l5[0].classList.add("activebutton")
}

function nu(item) {
    let l1 = document.getElementById("div1").children;
    let l2 = l1[0].children;
    let l3 = l2[0].children;
    let l4 = l3[5].children;
    let l5 = l4[1].children;
    l5[0].classList.remove("activebutton");
    l5[1].classList.add("activebutton")
}

function nam2(item) {
    let l1 = document.getElementById("div3").children;
    let l2 = l1[0].children;
    let l3 = l2[0].children;
    let l4 = l3[5].children;
    let l5 = l4[1].children;
    l5[1].classList.remove("activebutton");
    l5[0].classList.add("activebutton")
}

function nu2(item) {
    let l1 = document.getElementById("div3").children;
    let l2 = l1[0].children;
    let l3 = l2[0].children;
    let l4 = l3[5].children;
    let l5 = l4[1].children;
    l5[0].classList.remove("activebutton");
    l5[1].classList.add("activebutton")
}

function ao() {

    //---
    let list1 = document.getElementById("div1").children;
    let list2 = list1[0].children;
    //--
    let list3 = list2[2].children;
    let list4 = list3[2].children;
    let list5 = list4[1].children;

    if (list5[1].classList.contains("activebutton")) {
        list5[1].classList.remove("activebutton");
        list5[0].classList.add("activebutton");

        // size
        list6 = list3[5].children;

        list7 = list6[1].children;
        let count = list7.length;
        while (count > 0) {
            count--;
            list6[1].removeChild(list7[count]);
        }

        //color
        let list8 = list2[1].children;
        let list9 = list8[4].children;
        let list10 = list9[1].children;

        count = list10.length;
        while (count > 0) {
            count--;
            list9[1].removeChild(list10[count]);
        }
    }
}

function quan() {

    //---
    let list1 = document.getElementById("div1").children;
    let list2 = list1[0].children;
    //--
    let list3 = list2[2].children;
    let list4 = list3[2].children;
    let list5 = list4[1].children;
    if (list5[0].classList.contains("activebutton")) {
        list5[0].classList.remove("activebutton");
        list5[1].classList.add("activebutton");

        // size
        list6 = list3[5].children;

        list7 = list6[1].children;
        let count = list7.length;
        while (count > 0) {
            count--;
            list6[1].removeChild(list7[count]);
        }

        //color
        let list8 = list2[1].children;
        let list9 = list8[4].children;
        let list10 = list9[1].children;

        count = list10.length;
        while (count > 0) {
            count--;
            list9[1].removeChild(list10[count]);
        }
    }
}

function ao2() {

    //---
    let list1 = document.getElementById("div3").children;
    let list2 = list1[0].children;
    //--
    let list3 = list2[2].children;
    let list4 = list3[2].children;
    let list5 = list4[1].children;

    if (list5[1].classList.contains("activebutton")) {
        list5[1].classList.remove("activebutton");
        list5[0].classList.add("activebutton");

        // size
        list6 = list3[5].children;

        list7 = list6[1].children;
        let count = list7.length;
        while (count > 0) {
            count--;
            list6[1].removeChild(list7[count]);
        }

        //color
        let list8 = list2[1].children;
        let list9 = list8[4].children;
        let list10 = list9[1].children;

        count = list10.length;
        while (count > 0) {
            count--;
            list9[1].removeChild(list10[count]);
        }
    }
}

function quan2() {

    //---
    let list1 = document.getElementById("div3").children;
    let list2 = list1[0].children;
    //--
    let list3 = list2[2].children;
    let list4 = list3[2].children;
    let list5 = list4[1].children;
    if (list5[0].classList.contains("activebutton")) {
        list5[0].classList.remove("activebutton");
        list5[1].classList.add("activebutton");

        // size
        list6 = list3[5].children;

        list7 = list6[1].children;
        let count = list7.length;
        while (count > 0) {
            count--;
            list6[1].removeChild(list7[count]);
        }

        //color
        let list8 = list2[1].children;
        let list9 = list8[4].children;
        let list10 = list9[1].children;

        count = list10.length;
        while (count > 0) {
            count--;
            list9[1].removeChild(list10[count]);
        }
    }
}

function removeSize(button) {
    //---
    let list1 = document.getElementById("div1").children;
    let list2 = list1[0].children;
    //--
    let list3 = list2[2].children;

    list6 = list3[5].children;

    list7 = list6[1].children;
    for (let i = 0; i < list7.length; i++) {
        list8 = list7[i].children;
        if (list8[1] == button) {
            list6[1].removeChild(list7[i]);
            return;
        }
    }
}

function removeSize2(button) {
    //---
    let list1 = document.getElementById("div3").children;
    let list2 = list1[0].children;
    //--
    let list3 = list2[2].children;

    list6 = list3[5].children;

    list7 = list6[1].children;
    for (let i = 0; i < list7.length; i++) {
        list8 = list7[i].children;
        if (list8[1] == button) {
            list6[1].removeChild(list7[i]);
            return;
        }
    }
}

function themsize(item) {

    //---
    let list1 = document.getElementById("div1").children;
    let list2 = list1[0].children;
    //--
    let list3 = list2[2].children;
    if (item == list3[4]) {

        //lấy value size
        let list4 = list3[3].children;
        let select = list4[1];
        let value = select.value;

        // lấy listItemsize
        list6 = list3[5].children;
        list7 = list6[1].children;

        let check = 0;
        for (let i = 0; i < list7.length; i++) {
            let l1 = list7[i].children;
            let l2 = l1[0].children;
            if (l2[1].innerText == value) {
                check = 1;
                break;
            }
        }


        if (check == 0) {
            let div = document.createElement("div");
            div.classList.add("listSizeItem");

            let div2 = document.createElement("div");
            let i = document.createElement("i");
            i.classList.add("fa");
            i.classList.add("fa-circle");
            let p = document.createElement("p");
            p.innerText = value;
            div2.appendChild(i);
            div2.appendChild(p);
            div.appendChild(div2);

            let button = document.createElement("button");
            let i2 = document.createElement("i");
            i2.classList.add("fa");
            i2.classList.add("fa-trash");
            button.appendChild(i2);
            button.onclick = function () { removeSize(button) };
            div.appendChild(button);

            list6[1].appendChild(div);
        }
    }
}

function themsize2(item) {

    //---
    let list1 = document.getElementById("div3").children;
    let list2 = list1[0].children;
    //--
    let list3 = list2[2].children;
    if (item == list3[4]) {

        //lấy value size
        let list4 = list3[3].children;
        let select = list4[1];
        let value = select.value;

        // lấy listItemsize
        list6 = list3[5].children;
        list7 = list6[1].children;

        let check = 0;
        for (let i = 0; i < list7.length; i++) {
            let l1 = list7[i].children;
            let l2 = l1[0].children;
            if (l2[1].innerText == value) {
                check = 1;
                break;
            }
        }


        if (check == 0) {
            let div = document.createElement("div");
            div.classList.add("listSizeItem");

            let div2 = document.createElement("div");
            let i = document.createElement("i");
            i.classList.add("fa");
            i.classList.add("fa-circle");
            let p = document.createElement("p");
            p.innerText = value;
            div2.appendChild(i);
            div2.appendChild(p);
            div.appendChild(div2);

            let button = document.createElement("button");
            let i2 = document.createElement("i");
            i2.classList.add("fa");
            i2.classList.add("fa-trash");
            button.appendChild(i2);
            button.onclick = function () { removeSize2(button) };
            div.appendChild(button);

            list6[1].appendChild(div);
        }
    }
}

function removehinhitem(item) {
    //---
    let list1 = document.getElementById("div1").children;
    let list2 = list1[0].children;

    //color
    let list8 = list2[1].children;
    let list9 = list8[4].children;
    let list10 = list9[1].children;
    for (let i = 0; i < list10.length; i++) {
        list11 = list10[i].children;
        list12 = list11[0].children;

        // listhinh va 2 angle
        list13 = list12[1].children;

        // listhinh
        list14 = list13[0].children;
        for (let j = 0; j < list14.length; j++) {
            list15 = list14[j].children;
            if (list15[1] == item) {
                list13[0].removeChild(list14[j]);

                let newValue = parseInt(list13[3].value);
                if (newValue < 0) {
                    newValue += 50;
                    let space = newValue / -50;
                    list13[3].value = newValue;
                    if (space > 0) {
                        list13[0].style.marginLeft = `${newValue - space * 10}px`;
                    } else {
                        list13[0].style.marginLeft = `${newValue}px`;
                    }
                }

                return;
            }
        }
    }
}


function removehinhitem2(item) {
    //---
    let list1 = document.getElementById("div3").children;
    let list2 = list1[0].children;

    //color
    let list8 = list2[1].children;
    let list9 = list8[4].children;
    let list10 = list9[1].children;
    for (let i = 0; i < list10.length; i++) {
        list11 = list10[i].children;
        list12 = list11[0].children;

        // listhinh va 2 angle
        list13 = list12[1].children;

        // listhinh
        list14 = list13[0].children;
        for (let j = 0; j < list14.length; j++) {
            list15 = list14[j].children;
            if (list15[1] == item) {
                list13[0].removeChild(list14[j]);

                let newValue = parseInt(list13[3].value);
                if (newValue < 0) {
                    newValue += 50;
                    let space = newValue / -50;
                    list13[3].value = newValue;
                    if (space > 0) {
                        list13[0].style.marginLeft = `${newValue - space * 10}px`;
                    } else {
                        list13[0].style.marginLeft = `${newValue}px`;
                    }
                }

                return;
            }
        }
    }
}

function movehinhleft(item) {
    //---
    let list1 = document.getElementById("div1").children;
    let list2 = list1[0].children;

    //color
    let list8 = list2[1].children;
    let list9 = list8[4].children;
    let list10 = list9[1].children;
    for (let i = 0; i < list10.length; i++) {
        list11 = list10[i].children;
        list12 = list11[0].children;

        // listhinh va 2 angle
        list13 = list12[1].children;

        if (list13[1] == item) {
            let value = parseInt(list13[3].value);
            let sizeHinh = list13[0].children.length;
            if (sizeHinh > 6) {
                if (value == 0) {
                    value = -(sizeHinh * 50 - 300);
                    list13[3].value = value;
                    let space = value / 50;
                    list13[0].style.marginLeft = `${value + space * 10}px`;
                } else {
                    value += 50;
                    let space = value / 50;
                    list13[3].value = value;
                    list13[0].style.marginLeft = `${value + space * 10}px`;
                }
            }
        }
    }
}

function movehinhleft2(item) {
    //---
    let list1 = document.getElementById("div3").children;
    let list2 = list1[0].children;

    //color
    let list8 = list2[1].children;
    let list9 = list8[4].children;
    let list10 = list9[1].children;
    for (let i = 0; i < list10.length; i++) {
        list11 = list10[i].children;
        list12 = list11[0].children;

        // listhinh va 2 angle
        list13 = list12[1].children;

        if (list13[1] == item) {
            let value = parseInt(list13[3].value);
            let sizeHinh = list13[0].children.length;
            if (sizeHinh > 6) {
                if (value == 0) {
                    value = -(sizeHinh * 50 - 300);
                    list13[3].value = value;
                    let space = value / 50;
                    list13[0].style.marginLeft = `${value + space * 10}px`;
                } else {
                    value += 50;
                    let space = value / 50;
                    list13[3].value = value;
                    list13[0].style.marginLeft = `${value + space * 10}px`;
                }
            }
        }
    }
}

function movehinhright(item) {
    //---
    let list1 = document.getElementById("div1").children;
    let list2 = list1[0].children;

    //color
    let list8 = list2[1].children;
    let list9 = list8[4].children;
    let list10 = list9[1].children;
    for (let i = 0; i < list10.length; i++) {
        list11 = list10[i].children;
        list12 = list11[0].children;

        // listhinh va 2 angle
        list13 = list12[1].children;

        if (list13[2] == item) {
            let value = parseInt(list13[3].value);
            let sizeHinh = list13[0].children.length;
            if (sizeHinh > 6) {
                if (sizeHinh * 50 - (-value) == 300) {
                    value = 0;
                    list13[3].value = value;
                    list13[0].style.marginLeft = `${value}px`;
                } else {
                    value -= 50;
                    let space = value / -50;
                    list13[3].value = value;
                    list13[0].style.marginLeft = `${value - space * 10}px`;
                }
            }
        }
    }
}

function movehinhright2(item) {
    //---
    let list1 = document.getElementById("div3").children;
    let list2 = list1[0].children;

    //color
    let list8 = list2[1].children;
    let list9 = list8[4].children;
    let list10 = list9[1].children;
    for (let i = 0; i < list10.length; i++) {
        list11 = list10[i].children;
        list12 = list11[0].children;

        // listhinh va 2 angle
        list13 = list12[1].children;

        if (list13[2] == item) {
            let value = parseInt(list13[3].value);
            let sizeHinh = list13[0].children.length;
            if (sizeHinh > 6) {
                if (sizeHinh * 50 - (-value) == 300) {
                    value = 0;
                    list13[3].value = value;
                    list13[0].style.marginLeft = `${value}px`;
                } else {
                    value -= 50;
                    let space = value / -50;
                    list13[3].value = value;
                    list13[0].style.marginLeft = `${value - space * 10}px`;
                }
            }
        }
    }
}

function removecolor(item) {
    //---
    let list1 = document.getElementById("div1").children;
    let list2 = list1[0].children;

    //color
    let list8 = list2[1].children;
    let list9 = list8[4].children;
    let list10 = list9[1].children;
    for (let i = 0; i < list10.length; i++) {
        list11 = list10[i].children;
        list12 = list11[1].children;
        if (list12[1] == item) {
            list9[1].removeChild(list10[i]);
        }
    }
}

function removecolor2(item) {
    //---
    let list1 = document.getElementById("div3").children;
    let list2 = list1[0].children;

    //color
    let list8 = list2[1].children;
    let list9 = list8[4].children;
    let list10 = list9[1].children;
    for (let i = 0; i < list10.length; i++) {
        list11 = list10[i].children;
        list12 = list11[1].children;
        if (list12[1] == item) {
            list9[1].removeChild(list10[i]);
        }
    }
}

function themhinh(item) {
    //---
    let list1 = document.getElementById("div1").children;
    let list2 = list1[0].children;

    //color
    let list8 = list2[1].children;
    let list9 = list8[4].children;
    let list10 = list9[1].children;
    for (let i = 0; i < list10.length; i++) {
        list11 = list10[i].children;
        list12 = list11[1].children;
        if (list12[0] == item) {
            list12[2].click();
        }
    }
}

function themhinh2(item) {
    //---
    let list1 = document.getElementById("div3").children;
    let list2 = list1[0].children;

    //color
    let list8 = list2[1].children;
    let list9 = list8[4].children;
    let list10 = list9[1].children;
    for (let i = 0; i < list10.length; i++) {
        list11 = list10[i].children;
        list12 = list11[1].children;
        if (list12[0] == item) {
            list12[2].click();
        }
    }
}

function loadIMG(event, item) {
    //---
    let list1 = document.getElementById("div1").children;
    let list2 = list1[0].children;

    //color
    let list8 = list2[1].children;
    let list9 = list8[4].children;
    let list10 = list9[1].children;
    for (let i = 0; i < list10.length; i++) {
        list11 = list10[i].children;
        list12 = list11[1].children;
        if (list12[2] == item) {
            if (event.target.files.length > 0) {
                var src = URL.createObjectURL(event.target.files[0]);

                list13 = list11[0].children;

                // listhinh va 2 angle
                list14 = list13[1].children;

                let div1 = document.createElement("div");
                div1.classList.add("listHinhitem");
                let i1 = document.createElement("i");
                i1.classList.add("fa");
                i1.classList.add("fa-close");
                i1.onclick = function () { removehinhitem(i1) };
                let img = document.createElement("img");
                img.src = src;
                div1.appendChild(img);
                div1.appendChild(i1);
                list14[0].appendChild(div1);
                return;
            }
        }
    }
}

function loadIMG2(event, item) {
    //---
    let list1 = document.getElementById("div3").children;
    let list2 = list1[0].children;

    //color
    let list8 = list2[1].children;
    let list9 = list8[4].children;
    let list10 = list9[1].children;
    for (let i = 0; i < list10.length; i++) {
        list11 = list10[i].children;
        list12 = list11[1].children;
        if (list12[2] == item) {
            if (event.target.files.length > 0) {
                var src = URL.createObjectURL(event.target.files[0]);

                list13 = list11[0].children;

                // listhinh va 2 angle
                list14 = list13[1].children;

                let div1 = document.createElement("div");
                div1.classList.add("listHinhitem");
                let i1 = document.createElement("i");
                i1.classList.add("fa");
                i1.classList.add("fa-close");
                i1.onclick = function () { removehinhitem2(i1) };
                let img = document.createElement("img");
                img.src = src;
                div1.appendChild(img);
                div1.appendChild(i1);
                list14[0].appendChild(div1);
                return;
            }
        }
    }
}

function themmau(item) {
    let l1 = document.getElementById("div1").children;
    let l2 = l1[0].children;
    let l3 = l2[1].children;
    let l4 = l3[3].children;
    if (l4[0] == item) {

        //l5[1] = la listMau
        let l5 = l3[4].children;

        //lay du lieu
        let l6 = l3[2].children;
        let value = l6[1].value;
        let namecolor = l6[1].options[l6[1].selectedIndex].text;

        let check = 0;
        let listMau = l5[1].children;
        for (let j = 0; j < listMau.length; j++) {
            let a1 = listMau[j].children;
            let a2 = a1[0].children;
            let a3 = a2[0].children;
            if (a3[0].innerText == namecolor) {
                check = 1;
            }
        }
        if (check == 0) {
            // tao phan tu
            let div1 = document.createElement("div");
            div1.classList.add("listMauItem");

            let div2 = document.createElement("div");
            div2.classList.add("listMauItemleft");
            let div4 = document.createElement("div");
            let div5 = document.createElement("div");
            let p1 = document.createElement("p");
            p1.innerText = namecolor;
            let div6 = document.createElement("div");
            let img1 = document.createElement("img");
            img1.src = value;
            div6.appendChild(img1);
            div4.appendChild(p1);
            div4.appendChild(div6);
            div2.appendChild(div4);

            //div5
            let div7 = document.createElement("div");
            div7.classList.add("listHinh")
            let i2 = document.createElement("i");
            i2.classList.add("fa");
            i2.classList.add("fa-angle-left");
            i2.onclick = function () { movehinhleft(i2) };
            let i3 = document.createElement("i");
            i3.classList.add("fa");
            i3.classList.add("fa-angle-right");
            i3.onclick = function () { movehinhright(i3) };
            let input1 = document.createElement("input");
            input1.value = "0";
            input1.type = "number";
            input1.style.display = "none";
            div5.appendChild(div7);
            div5.appendChild(i2);
            div5.appendChild(i3);
            div5.appendChild(input1);

            div2.appendChild(div5);
            div1.appendChild(div2);

            let div3 = document.createElement("div");
            div3.classList.add("removecolor");
            let button1 = document.createElement("button");
            let button2 = document.createElement("button");
            let i4 = document.createElement("i");
            let i5 = document.createElement("i");
            i4.classList.add("fa");
            i5.classList.add("fa");
            i4.classList.add("fa-plus");
            i5.classList.add("fa-trash");
            button1.appendChild(i4);
            button2.appendChild(i5);
            button1.onclick = function () { themhinh(this) };
            button2.onclick = function () { removecolor(this) };
            let input2 = document.createElement("input");
            input2.type = "file";
            input2.style.display = "none";
            input2.onchange = function () { loadIMG(event, input2) };
            div3.appendChild(button1);
            div3.appendChild(button2);
            div3.appendChild(input2);
            div1.appendChild(div3);

            l5[1].appendChild(div1);
        }
    }
}

function themmau2(item) {
    let l1 = document.getElementById("div3").children;
    let l2 = l1[0].children;
    let l3 = l2[1].children;
    let l4 = l3[3].children;
    if (l4[0] == item) {

        //l5[1] = la listMau
        let l5 = l3[4].children;

        //lay du lieu
        let l6 = l3[2].children;
        let value = l6[1].value;
        let namecolor = l6[1].options[l6[1].selectedIndex].text;

        let check = 0;
        let listMau = l5[1].children;
        for (let j = 0; j < listMau.length; j++) {
            let a1 = listMau[j].children;
            let a2 = a1[0].children;
            let a3 = a2[0].children;
            if (a3[0].innerText == namecolor) {
                check = 1;
            }
        }
        if (check == 0) {
            // tao phan tu
            let div1 = document.createElement("div");
            div1.classList.add("listMauItem");

            let div2 = document.createElement("div");
            div2.classList.add("listMauItemleft");
            let div4 = document.createElement("div");
            let div5 = document.createElement("div");
            let p1 = document.createElement("p");
            p1.innerText = namecolor;
            let div6 = document.createElement("div");
            let img1 = document.createElement("img");
            img1.src = value;
            div6.appendChild(img1);
            div4.appendChild(p1);
            div4.appendChild(div6);
            div2.appendChild(div4);

            //div5
            let div7 = document.createElement("div");
            div7.classList.add("listHinh")
            let i2 = document.createElement("i");
            i2.classList.add("fa");
            i2.classList.add("fa-angle-left");
            i2.onclick = function () { movehinhleft2(i2) };
            let i3 = document.createElement("i");
            i3.classList.add("fa");
            i3.classList.add("fa-angle-right");
            i3.onclick = function () { movehinhright2(i3) };
            let input1 = document.createElement("input");
            input1.value = "0";
            input1.type = "number";
            input1.style.display = "none";
            div5.appendChild(div7);
            div5.appendChild(i2);
            div5.appendChild(i3);
            div5.appendChild(input1);

            div2.appendChild(div5);
            div1.appendChild(div2);

            let div3 = document.createElement("div");
            div3.classList.add("removecolor");
            let button1 = document.createElement("button");
            let button2 = document.createElement("button");
            let i4 = document.createElement("i");
            let i5 = document.createElement("i");
            i4.classList.add("fa");
            i5.classList.add("fa");
            i4.classList.add("fa-plus");
            i5.classList.add("fa-trash");
            button1.appendChild(i4);
            button2.appendChild(i5);
            button1.onclick = function () { themhinh2(this) };
            button2.onclick = function () { removecolor2(this) };
            let input2 = document.createElement("input");
            input2.type = "file";
            input2.style.display = "none";
            input2.onchange = function () { loadIMG2(event, input2) };
            div3.appendChild(button1);
            div3.appendChild(button2);
            div3.appendChild(input2);
            div1.appendChild(div3);

            l5[1].appendChild(div1);
        }
    }
}

function taomaumoi() {
    document.getElementById("taomaumoi").style.display = "block";
}

function taomauxong() {
    document.getElementById("taomaumoi").style.display = "none";
}

function loadIMGMau(event) {
    if (event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        document.getElementById("psm").src = src;
    }
}