
function add(){
    var index = parseInt(document.getElementById('value').value);
        document.getElementById('value').value = index+1;
        console.log(index+1);
}
function sub(){
    var index = parseInt(document.getElementById('value').value);
    if (index == 0) {
        document.getElementById('value').value = 0;
    }
    else{
        document.getElementById('value').value = index-1;
        console.log(index-1);
    }
}
function change(){
    var l1 = document.getElementById('l1');
    var l2 = document.getElementById('l2');
    var l3 = document.getElementById('l3');
    var l4 = document.getElementById('l4');

    var slide1 = document.getElementById('slide1');
    var slide2 = document.getElementById('slide2');
    var slide3 = document.getElementById('slide3');
    var slide4 = document.getElementById('slide4');

    var arr = [l1,l2,l3,l4];

    for(let i = 0; i < 4;i++){
        arr[i].onclick = function(){
            if(i == 0){
                slide1.style.border = "border: 3px solid #f60";
            }
            else if(i == 1){
                slide2.style.border = "border: 3px solid #f60";
            }
            else if(i == 2){
                slide3.style.border = "border: 3px solid #f60";
            }
            else if(i == 3){
                slide4.style.border = "border: 3px solid #f60";
            }

        }
    }
}

