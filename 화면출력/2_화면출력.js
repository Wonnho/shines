const readline=require('readline')

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});


rl.question('첫번째 수를 입력하세요:',(num1)=>{

    rl.question('두번째 수를 입력하세요:',(num2)=>{
        const result=parseInt(num1)+parseInt(num2);
        console.log(`result:${result}`)
        rl.close();
    });

});





