import bcrypt from 'bcrypt'

const data = {

    user:[
        {
            name : 'Marcos André',
            email : 'marcos300@gmail.com',
            password: bcrypt.hashSync('12345' , 8),
            isAdmin : true
        },
        {
            name: 'Marcos Lima',
            email: 'marcos400@gmail.com',
            password: bcrypt.hashSync('12345', 8),
            isAdmin : false
        }
    ],
    produtos:[
      {

          name: 'Produtos Slim',
          category: 'Limpeza',
          image: '/images/3878564.jpg',
          price : 150,
          brand: 'ASSAI INC',
          rating : 4.5,
          numReviews : 200,
          description : 'Mega promoção',
          countInStock: 9
      },
      {
    
        name: 'Produtos Slim 2',
        category: 'Limpeza',
        image: '/images/3878564.jpg',
        price : 151,
        brand: 'ASSAI INC',
        rating : 3.5,
        numReviews : 199,
        description : 'Mega promoção',
        countInStock: 10

    },
    {
        name: 'Produtos Slim 3',
        category: 'Limpeza',
        image: '/images/3878564.jpg',
        price : 152,
        brand: 'ASSAI INC',
        rating : 2.5,
        numReviews : 198,
        description : 'Mega promoção',
        countInStock: 11

    },
    {
        name: 'Produtos Slim 4',
        category: 'Limpeza',
        image: '/images/3878564.jpg',
        price : 153,
        brand: 'ASSAI INC',
        rating : 1.5,
        numReviews : 197,
        description : 'Mega promoção',
        countInStock: 0

    },
    {
        name: 'Produtos Slim 5',
        category: 'Cozinha',
        image: '/images/3878564.jpg',
        price : 200,
        brand: 'ASSAI INC',
        rating : 5,
        numReviews : 200,
        description : 'Mega promoção',
        countInStock: 5

    }
    ]
}

export  default data