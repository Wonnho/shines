const readline=require('readline')

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});


rl.question('반지름:',(r)=>{
    let radius;
    let area;
    radius=parseInt(r);
    area=Math.PI*radius*2 ;
    console.log(`area of radius ${radius} is ${area}`)
});

//let base;

