
const numberSet=[1,1,2,3,5]
const newNumberSet=[]
function  getSquare(num) {

    return num*(num+1);
}

for(let k=0;k<numberSet.length;k++) {
    getSquare(numberSet[k]);
    console.log(getSquare(numberSet[k]));
}


for(let k=0;k<numberSet.length;k++) {
    newNumberSet.push(getSquare(numberSet[k]));

}

console.log(`numberSet:${numberSet}`);
console.log(`NewNumberSet:${newNumberSet}`);
