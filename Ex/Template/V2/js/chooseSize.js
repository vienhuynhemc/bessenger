
function woman() {
    document.getElementById('size1').style.display = 'none';
    document.getElementById('size2').style.display = 'none';
    document.getElementById('size3').style.display = 'block';
    document.getElementById('size4').style.display = 'block';
    document.getElementById('men').style.color = 'white';
    document.getElementById('men').style.background = '#232020';
    document.getElementById('woman').style.color = '#232020';
    document.getElementById('woman').style.background = 'white';
}

function man() {
    document.getElementById('size1').style.display = 'block';
    document.getElementById('size2').style.display = 'block';
    document.getElementById('size3').style.display = 'none';
    document.getElementById('size4').style.display = 'none';
    document.getElementById('woman').style.color = 'white';
    document.getElementById('woman').style.background = '#232020';
    document.getElementById('men').style.color = '#232020';
    document.getElementById('men').style.background = 'white';
}