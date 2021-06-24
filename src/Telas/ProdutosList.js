import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminListProdutos, deleteProduto } from '../actions/produtosAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUTO_DETALHES_RESET } from '../constantes/produtoConstantes'

export default function ProdutosList(props){

    const  produtosListaAdmin = useSelector(state => state.produtosListaAdmin)
    const {produtos, error, loading} =   produtosListaAdmin

    const produtoDelete = useSelector(state => state.produtoDelete)
    const {error: errorDelete, success: successDelete, loading: loadingDelete} = produtoDelete

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(adminListProdutos())
        dispatch({type: PRODUTO_DETALHES_RESET})
    },[dispatch, successDelete])

    function deleteProd(produto) {
        if(window.confirm('Deseja Apagar esse produto ?')){
            dispatch(deleteProduto(produto._id))
        }
    }
    return (
        <div>
            <h1>Lista de produtos</h1>
            <button type="button" className="primary" onClick={() => props.history.push('/new-product')}> Adicionar Produto </button>
            <br/>
            <br/>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && (<MessageBox variant="success">Produto apagado com sucesso</MessageBox>)}
            {
                loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                (
                    <table className="table">
                        <thead>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Imagem</th>
                        <th>Preço</th>
                        <th>Fabricante</th>
                        <th>Descrição</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                        </thead>

                        <tbody>
                            {produtos.map((produto) =>(
                                <tr key={produto._id}>
                                <td>{produto._id}</td>
                                <td>{produto.name}</td>
                                <td>{produto.category}</td>
                                <td>{produto.image ? <img className="small" src={produto.image} alt={produto.name}/> : 'Sem imagem' }</td>
                                <td> ${produto.price}</td>
                                <td>{produto.brand}</td>
                                <td>{produto.description}</td>
                                <td>{produto.countInStock}</td>
                                <td>
                            <button type="button" className="small" onClick={()=>{ props.history.push(`/product/${produto._id}/edit`)}}> Editar </button>
                            <button type="button" className="small" onClick={()=> {deleteProd(produto)}}> Apagar </button>
                            </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}