function indexleftselectitemlv2(item) {
    let listItem = item.children;

    let itemarrow = listItem[0].children;

    if (listItem[2].checked == false) {
        listItem[2].checked = true;
        item.classList.remove("dontactiveindexleftselectitemlv2");

        itemarrow[1].style.transform = "rotate(90deg)"
    } else {
        listItem[2].checked = false;
        item.classList.add("dontactiveindexleftselectitemlv2");

        itemarrow[1].style.transform = "rotate(0deg)"
    }
}

function indextopbellinfor(item) {
    let listItem = item.children;
    if (listItem[3].checked == false) {
        listItem[3].checked = true;
        item.classList.remove("dontindextopbellinfor");
    } else {
        listItem[3].checked = false;
        item.classList.add("dontindextopbellinfor");
    }
}

function addViecCanLam() {
    let value = document.getElementById("inputvieccanlam").value;
    value = value.trim();
    if (value != "") {
        document.getElementById("inputvieccanlam").value = "";

        let iconDiv1 = document.createElement("i");
        iconDiv1.classList.add("fa");
        iconDiv1.classList.add("fa-close");
        iconDiv1.onclick = function () { removevieccanlam(iconDiv1) };
        let pDiv1 = document.createElement("p");
        pDiv1.innerText = value;

        let div1 = document.createElement("div");
        div1.appendChild(pDiv1);
        div1.appendChild(iconDiv1);

        let div2 = document.createElement("div");
        div2.classList.add("div32line");

        let div3 = document.createElement("div");
        div3.classList.add("div32item");
        div3.appendChild(div1);
        div3.appendChild(div2);

        let newLi = document.createElement("li");

        newLi.appendChild(div3);
        document.getElementById("vieccanlam").appendChild(newLi);
    }
}

function removevieccanlam(item) {
    let list = document.getElementById("vieccanlam").children;
    for (let i = 0; i < list.length; i++) {
        let itemlv2 = list[i].children;
        let divtong = itemlv2[0];
        let itemlv3 = divtong.children;
        let divcon = itemlv3[0];
        let itemlv4 = divcon.children;
        let icondiv = itemlv4[1];
        if (icondiv == item) { document.getElementById("vieccanlam").removeChild(list[i]); break; }
    }
}