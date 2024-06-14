
const {odd,even}=require('./4A_1_NumberSet')

const checkOddOrEven=(num)=> {
    if (num % 2) {
        return odd
    }

    return even;
}

module.exports=checkOddOrEven;