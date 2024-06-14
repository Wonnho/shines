
const {odd,even}=require('./4A_1_NumberSet')
const checkNumber=require('./4_2_CallbackFcn')

const checkStringOddOrEven=(str)=>{
    if(str.length%2) {return even}
    return odd;
}

console.log(checkNumber(3332));
console.log(checkStringOddOrEven('hello'))