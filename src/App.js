import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import ProdutoTela from './Telas/Produto';
import PaginaInical from './Telas/PaginaInicial';
import Cart from './Telas/Cart';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './Telas/Sign-in';
import { SignOutAction } from './actions/userAction';
import Register from './Telas/Register';
import Shipping from './Telas/Shipping';
import Payment from './Telas/Payment';
import PlaceOrder from './Telas/PlaceOrder';
import OrderScreen from './Telas/Order';
import Historic from './Telas/Historic';
import Profile from './Telas/Profile';
import AdminRoute from './components/AdminRoute';
import UserList from './Telas/UserList'
import UserEdit from './Telas/UserEdit'
import ProdutosList from './Telas/ProdutosList';
import NewProduto from './Telas/NewProduto';
import ProdutoEdit from './Telas/ProdutoEdit';
import Orders from './Telas/Orders';

function App() {
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  const userSignin = useSelector((state) => state.userSign);
  const { userInfo } = userSignin
  const dispatch = useDispatch()

  function signoutHandler() {
    dispatch(SignOutAction())
  }
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="row">
        <div>
            <Link  to="/"> Loja Virtual</Link>
        </div>
        <div>
            <Link to="/cart">Carrinho 
            {
              cartItems.length > 0  &&(
                <span className="badge">{cartItems.length}</span>

              )
            }
            </Link>
            &nbsp;
            &nbsp;
            {
              
              userInfo ? (
                <div className="dropdown">
                <Link >{userInfo.name}  &nbsp; <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">Perfil</Link>
                  </li>
                  <li>
                  <Link to="/historic">Histórico</Link>
                  </li>
                  <li>
                  <Link to="#signout" onClick={signoutHandler}>Sair</Link>
                  </li>
                  
                </ul>
                </div>

              )
              :
              (
                <Link to="/sign-in">Entrar</Link>
              )

            }
            {
              userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">Admin {' '}  &nbsp; <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/userlist">Usuários</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Produtos</Link>
                    </li>
                    <li>
                    <Link to="/orders">Encomendas</Link>
                  </li>
                  </ul>

                </div>
              )
            }
    
        </div>

    </header>
    <main>

      <Route path="/produtos/:id?" component={ProdutoTela}></Route>
      <Route path="/cart/:id?" component={Cart}></Route>
      <Route path="/sign-in" component={SignIn}></Route>
      <Route path="/" component={PaginaInical} exact></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/shipping" component={Shipping}></Route>
      <Route path="/payment" component={Payment}></Route>
      <Route path="/order/:id" component={OrderScreen}></Route>
      <Route path="/placeorder" component={PlaceOrder}></Route>
      <Route path="/historic" component={Historic}></Route>
      <Route path="/profile" component={Profile}></Route>

      <AdminRoute path="/userlist" component={UserList} exact></AdminRoute>
      <AdminRoute path="/user/:id/edit" component={UserEdit} exact></AdminRoute>
      <AdminRoute path="/productlist" component={ProdutosList} exact></AdminRoute>
      <AdminRoute path="/new-product" component={NewProduto} exact></AdminRoute>
      <AdminRoute path="/product/:id/edit" component={ProdutoEdit}></AdminRoute>
      <AdminRoute path="/orders" component={Orders}></AdminRoute>
  </main>
    <footer className="row center">
        Loja Virtual&copy; &nbsp; || <a href="https://www.instagram.com/marcosart_baybay/" rel="noreferrer" target="_blank"> Marcos André</a>
    </footer>
    </div>
    </BrowserRouter>
  )
}

export default App;
