const readline=require('readline')

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});


rl.question('첫번째 수를 입력하세요:',(num1)=>{

    rl.question('두번째 수를 입력하세요:',(num2)=>{
        const first=parseInt(num1);
        const second=parseInt(num2);

        if(first>second) {

            console.log(`result:${first-second}`)
        }
        else {

            console.log(`result:${second-first}`)
        }


        rl.close();
    });

});





