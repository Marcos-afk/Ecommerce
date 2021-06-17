import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducer'
import { OrderCreateReducer, OrderDetailsReducer, OrderHistoricReducer, orderListReducer, OrderPayReducer } from './reducers/oderReducer'
import { adminListProdutosReducer, createdProdutoReducer, deleteProdutoReducer, produtoDetalhesReducer, produtosListaReducer, updateProdutoReducer } from './reducers/produtosReducer'
import { detailsUserReducer, listUserReducer, RegisterReducer, SignReducer, updateProfileReducer, updateUserReducer, userDeleteReducer } from './reducers/userReducer'

const initialState = {
    userSign :{
        userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    cart : {
        cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod : null
    },
    userRegister:{
        userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
    
}

const reducer = combineReducers({
    produtosLista : produtosListaReducer,
    produtoDetalhes : produtoDetalhesReducer,
    cart : cartReducer,
    userSign : SignReducer,
    userRegister : RegisterReducer,
    OrderCreate : OrderCreateReducer,
    OrderDetails : OrderDetailsReducer,
    OrderPay : OrderPayReducer,
    OrderHistoric : OrderHistoricReducer,
    OrderList : orderListReducer,
    UserDetails: detailsUserReducer,
    UserUpdate : updateProfileReducer,
    UserList : listUserReducer,
    UserAdminUpdate : updateUserReducer,
    UserDelete : userDeleteReducer,
    produtosListaAdmin : adminListProdutosReducer,
    produtoCreated : createdProdutoReducer,
    produtoDelete : deleteProdutoReducer,
    produtoUpdate : updateProdutoReducer
})

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer, 
    initialState, 
    composeEnhacer(applyMiddleware(thunk))
)

export default store