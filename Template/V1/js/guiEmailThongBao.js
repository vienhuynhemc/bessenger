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
    let list =  document.getElementById("right").children;
    document.getElementById("right").removeChild(list[0]);
}