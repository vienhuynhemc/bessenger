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

function changerightdonhang(item) {
    let listItem = document.getElementById("listleftitem").children;
    for (let i = 0; i < listItem.length; i++) {
        listItem[i].classList.remove("activeleftitem");
    }

    item.classList.add("activeleftitem");

    let right = document.getElementById("right").children;
    if (right.length > 0) {
        document.getElementById("right").removeChild(right[0]);
    }

    let itemNew = item.children;
    document.getElementById("right").appendChild(itemNew[3].cloneNode(true));
}


function removeitem(item) {
    item.style.display = "none";
    let list = document.getElementById("right").children;
    document.getElementById("right").removeChild(list[0]);
}

function removeitemm(item) {
    let main = document.getElementById("right").children;
    let list1 = main[0].children;
    for (let i = 0; i < list1.length; i++) {
        let list2 = list1[i].children;
        let list3 = list2[1].children;
        let list4 = list3[2].children;
        if (list4[1] == item) {
            main[0].removeChild(list1[i]);
        }
    }
}

function removeitemmm(item) {
    let main = document.getElementById("right").children;
    let list1 = main[0].children;

    let list2 = list1[list1.length - 1].children;
    let list3 = list2[0].children;
    let list4 = list3[2].children;
    if (list4[1] == item) {
        main[0].removeChild(list1[list1.length - 1]);
        let list5 = list1[0].children;
        let list6 = list5[3].children;
        list6[1].checked = false;
    }
}

function mora(item) {
    let main = document.getElementById("right").children;
    let list1 = main[0].children;

    for (let i = 0; i < list1.length; i++) {
        if (!list1[i].classList.contains("reply")) {
            list1[i].classList.remove("activeright");
            let list2 = item.children;
            list2[0].checked = false;
        }
    }

    for (let i = 0; i < list1.length; i++) {
        if (list1[i] == item) {
            let list2 = item.children;
            if (list2[0].checked == false) {
                list2[0].checked = true;
                list1[i].classList.add("activeright");
                return;
            }
        }
    }
}

function phanHoi(item) {
    let main = document.getElementById("right").children;
    let list1 = main[0].children;
    let list2 = list1[0].children;
    let list3 = list2[3].children;
    if (list3[0] == item) {
        if (list3[1].checked == false) {
            list3[1].checked = true;


            let div1 = document.createElement("div");
            div1.classList.add("rightitem");
            div1.classList.add("activeright");
            div1.classList.add("reply");

            let div2 = document.createElement("div");
            div2.classList.add("rightheader");

            let div21 =document.createElement("div");
            let i21 = document.createElement("i");
            i21.classList.add("fa");
            i21.classList.add("fa-reply");
            i21.style.color = "#9a9a9a";
            div21.appendChild(i21);
            div2.appendChild(div21);
            let div22 = document.createElement("div");
            div22.classList.add("rightinfor");
            let p22 = document.createElement("p");
            p22.innerText = "nguyenvana@gmail.com";
            p22.style.marginTop = "6px";
            let p222 = document.createElement("p");
            div22.appendChild(p22);
            div22.appendChild(p222);
            div2.appendChild(div22);
            let div23 = document.createElement("div");
            div23.classList.add("rightend");
            let p23 = document.createElement("p");
            p23.innerText = "28 Tháng Tám, 2018, 11:18 AM";
            let i23 = document.createElement("i");
            i23.classList.add("fa");
            i23.classList.add("fa-trash");
            i23.onclick = function(){removeitemmm(i23)};
            div23.appendChild(p23);
            div23.appendChild(i23);
            div2.appendChild(div23);
            div1.appendChild(div2);

            let div3 = document.createElement("div");
            div3.classList.add("rightcontent");
            let div31 = document.createElement("div");
            let textarea = document.createElement("textarea");
            textarea.placeholder = "Nhập nội dung ở đây";
            div31.appendChild(textarea);
            div3.appendChild(div31);
            div1.appendChild(div3);

            let div4 = document.createElement("div");
            div4.classList.add("rightsubmit");
            let button41 = document.createElement("button");
            button41.innerText= "GỬI";
            div4.appendChild(button41);
            div1.appendChild(div4);

            let list = document.getElementById("right").children;
            list[0].appendChild(div1);
        }
    }
}