const readline=require('readline')

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

let inputNum1;
let inputNum2;
rl.question('첫번째 수를 입력하세요:',(num1)=>{
    inputNum1=num1;
});


rl.question('두번째 수를 입력하세요:',(num2)=>{
    inputNum2=num2;
});

const result=parseInt(inputNum1)+parseInt(inputNum2);
console.log(`result:${result}`)
rl.close();


