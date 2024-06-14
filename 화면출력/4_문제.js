const readline=require('readline')

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});


rl.question('첫번째 수를 입력하세요:',(num1)=>{

    rl.question('두번째 수를 입력하세요:',(num2)=>{
        const first=parseInt(num1);
        const second=parseInt(num2);


   let  difference;
   difference=Math.max(first,second)-Math.min(first,second)
        console.log(`difference:${difference}`)

        rl.close();
    });

});





