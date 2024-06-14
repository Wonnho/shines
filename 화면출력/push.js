const numberSet = [1, 1, 2, 3, 5];
const newNumberSet = [];
function getSquare(num) {
    return num * (num + 1);
}

// 첫 번째 루프: 각 숫자의 제곱 값을 출력
for (let k = 0; k < numberSet.length; k++) {
    console.log(getSquare(numberSet[k]));
}

// 두 번째 루프: 각 숫자의 제곱 값을 새로운 배열에 추가
for (let k = 0; k < numberSet.length; k++) {
    newNumberSet.push(getSquare(numberSet[k]));
}

console.log(`numberSet: ${numberSet}`);
console.log(`newNumberSet: ${newNumberSet}`);

const mapNumberSet=numberSet.map(getSquare);

console.log((`mapNumber:${mapNumberSet}`))