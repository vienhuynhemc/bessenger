leftnextdplistitem();

function doiHinhChinh(div) {
    let array = div.children;
    console.log(array[0]);
    let src = array[0].src;
    console.log(src);
    document.getElementById("img1").src = src;
    document.getElementById("img2").src = src;
}

function leftnextdplistitem() {
    document.getElementById("dplistitem").style.marginLeft = "0px";
    document.getElementById("nextdp1").style.background = " #9fa6a5"
    document.getElementById("nextdp2").style.background = " white"
}

function rightnextdplistitem() {
    document.getElementById("dplistitem").style.marginLeft = "-330px";
    document.getElementById("nextdp2").style.background = " #9fa6a5"
    document.getElementById("nextdp1").style.background = " white"
}

function damXanh() {
    document.getElementById("colordpdx").style.display = "block";
    document.getElementById("colordpxn").style.display = "none";

    document.getElementById("doiHinhChinh1").src = "img/product/dp1.webp";
    document.getElementById("doiHinhChinh2").src = "img/product/dp2.webp";
    document.getElementById("doiHinhChinh3").src = "img/product/dp3.webp";
    document.getElementById("doiHinhChinh4").src = "img/product/dp4.webp";

    document.getElementById("img1").src = "img/product/dp1.webp";
    document.getElementById("img2").src = "img/product/dp1.webp";
}

function xanhNhat() {
    document.getElementById("colordpxn").style.display = "block";
    document.getElementById("colordpdx").style.display = "none";

    document.getElementById("doiHinhChinh1").src = "img/product/dp5.webp";
    document.getElementById("doiHinhChinh2").src = "img/product/dp6.webp";
    document.getElementById("doiHinhChinh3").src = "img/product/dp7.webp";
    document.getElementById("doiHinhChinh4").src = "img/product/dp8.webp";

    document.getElementById("img1").src = "img/product/dp5.webp";
    document.getElementById("img2").src = "img/product/dp5.webp";
}
