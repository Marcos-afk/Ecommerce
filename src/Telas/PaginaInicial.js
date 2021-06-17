import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Produto from '../components/Produtos'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import { listaProdutos } from '../actions/produtosAction'

export default function PaginaInical(){

  const dispatch = useDispatch()
  const produtosLista = useSelector( state => state.produtosLista)
  const {error, produtos, loading} = produtosLista
 
  useEffect(()=>{
    dispatch(listaProdutos())
    
    
  },[dispatch])

    return(
        <div>
          {
            loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
              <div className="row center">
            {
                    produtos.map((item)=>(
                    
                      <Produto key={item._id} item={item}/>
                      
                    ))
                  }
        </div>

            )
          }
            
        </div>
    )
    
}