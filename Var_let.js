
function exaplevar() {
    if(true) {
        var k=231;
    }

    console.log(k);
}

function letIden() {
    if(true) {
     let   j=889;
    }
    console.log(j)
}
//Var은 전역변수이므로 출력이 됨
exaplevar();

//// let은 블록 스코프를 갖기 때문에 블록 내에서만 접근 가능
letIden();
