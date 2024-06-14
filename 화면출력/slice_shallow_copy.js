var averageRating=[4,25,3.8,4.5,4.0,4.2]

var ascendingOrder=averageRating.slice().sort((k,j)=>k-j);

console.log(ascendingOrder);

var products = [

    {

        name: '상품1',

        averageRating: 4.25,

    },

    {

        name: '상품2',

        averageRating: 3.8,

    },

    {

        name: '상품3',

        averageRating: 4.5,

    },

    {

        name: '상품4',

        averageRating: 4.0,

    },

    {

        name: '상품5',

        averageRating: 4.75,

    },

];

products.sort((k,j)=>k.averageRating-j.averageRating);

console.log('평점별로 정렬된 상품정보:',products);

