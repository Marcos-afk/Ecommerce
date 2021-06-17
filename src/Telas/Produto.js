import React, { useEffect, useState } from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { detalhesProdutos } from '../actions/produtosAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Rating from '../components/Rating'

export default function ProdutoTela(props){

    const dispatch = useDispatch()
    const produtoId = props.match.params.id
    const produtoDetalhes = useSelector((state) => state.produtoDetalhes)
    const {produto, loading, error} = produtoDetalhes
    const [qtd, setQtd] = useState(1)

    useEffect(()=>{
        dispatch(detalhesProdutos(produtoId))
        
      },[dispatch , produtoId])

      function addCartHandle(){
          props.history.push(`/cart/${produtoId}?qtd=${qtd}`)
      }

    return(
        <div>
          {
            loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
                <div>
                <Link to="/"> Voltar</Link>
            <div className="row top">
                <div className="colum2">
                    <img  className="large" src={produto.image} alt={produto.name}/>
                </div>
    
                <div className="colum1">
                    <ul>
                        <li>
                            <h1>{produto.name}</h1>
                        </li>
                        <li>
                            <Rating rating={produto.rating} numReviews={produto.numReviews} />
                        </li>
                        <li>
                            Preço : {produto.price}
                        </li>
                        <li>
                            Descrição: <p>{produto.description}</p>
                        </li>
                    </ul>
    
    
                </div>
    
                <div className="colum1">
                    <div className="card card-body">
                        <ul>
                            <li>
                            <div className="row">
                            <div>Preço</div>
                            <div className="price">${produto.price}</div>
    
                            </div>
                            </li>
    
                            <li>
                            <div className="row">
                            <div>Status</div>
                            <div>
                                {
                                    produto.countInStock > 0 ? (<span className="success"> Em estoque</span> 
                                    ): 
                                    (<span className="error">Estoque vázio</span>)
                                }
                            </div>
    
                            </div>
                            </li>
                            {
                                produto.countInStock > 0 ?(
                                    <div>
                                        <li>
                                            <div className="row">
                                                <div>Quantidade</div>
                                                <div>
                                                    <select value={qtd} onChange={ e => setQtd(e.target.value)}>
                                                        {
                                                            [...Array(produto.countInStock).keys()].map(x => (
                                                                <option key={x+1} value={x + 1} >{ x + 1}</option>
                                                            ))
                                                        }

                                                    </select>

                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                             <button onClick={addCartHandle} className="primary block">Colocar no Carrinho</button>
                                         </li>
                                    </div>

                                ):(<span></span>)
                            }
    
                        </ul>
    
                    </div>
    
                </div>
            </div> 
            </div>   
            

            )
          }
            
        </div>
        
     
    )

    
}