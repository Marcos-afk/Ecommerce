import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detalhesProdutos, updateProduto } from '../actions/produtosAction'
import { PRODUTO_UPDATE_RESET } from '../constantes/produtoConstantes'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


export default function ProdutoEdit(props){

    const produtoId = props.match.params.id

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState('')

    const  produtoDetalhes = useSelector(state => state.produtoDetalhes)
    const {loading, produto, error} = produtoDetalhes

    const produtoUpdate = useSelector( state => state.produtoUpdate)
    const {loading: loadingUpdate, success: successUpdate, error: errorUpdate} = produtoUpdate

    const dispatch = useDispatch()

    useEffect(()=>{
        if(successUpdate){
            dispatch({ type: PRODUTO_UPDATE_RESET})
            document.location.href = '/productlist'
        }

        if(!produto){
            dispatch(detalhesProdutos(produtoId))
        }else{
            setName(produto.name)
            setCategory(produto.category)
            setImage(produto.image)
            setPrice(produto.price)
            setBrand(produto.brand)
            setDescription(produto.description)
            setCountInStock(produto.countInStock)
        }
    }, [dispatch, props.history, successUpdate, produto, produtoId])

    function submitHandler(e){
        e.preventDefault()
        dispatch(updateProduto({ _id: produtoId, name, category, image, price, brand, description, countInStock }))
    }

    const [loadingUpload, setLoadingUpload] = useState(false)
    const [errorUpload, setErrorUpload] = useState('')
    const [SuccessUpload, setSuccesUpload] = useState(false)
    
    const userSign = useSelector((state) => state.userSign);
    const { userInfo } = userSign
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
          const { data } = await Axios.post('/uploads', bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
          setImage(data)
          setSuccesUpload(true)
          setLoadingUpload(false)
        } catch (error) {
          setErrorUpload(error.message)
          setLoadingUpload(false)
        }
      }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                    <div>
                    <h1>Editar produto : {name}</h1>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                    </div>
           
            {
                loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                (
                    <>
                        <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" required placeholder="Nome do produto" 
                    value={name} onChange={ e=> setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="category">Categoria</label>
                    <input type="text" id="category" required placeholder="Categoria do produto"
                     value={category} onChange={ e=> setCategory(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="imageFile">Imagem</label>
                    <input type="text" id="imageFile" required placeholder="Categoria do produto"
                     value={image} disabled/>
                </div>
                <div>
                    <label htmlFor="image">Upload da imagem</label>
                    <input type="file" id="image" name="image"  onChange={uploadFileHandler}/>
                    {loadingUpload && <LoadingBox></LoadingBox>}
                    {errorUpload ? (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>)
                        :
                    SuccessUpload ? (<MessageBox variant="sucess">Upload Realizado com sucesso!</MessageBox>)
                        :
                        <></>
                    }
                </div>
                <div>
                    <label htmlFor="price">Preço</label>
                    <input type="number" id="price" required placeholder="Preço do produto" 
                     value={price} onChange={ e=> setPrice(e.target.value)}/>
                </div>
                <div>
                <label htmlFor="brand">Fabricante</label>
                    <input type="text" id="brand" required placeholder="Fabricante do produto" 
                     value={brand} onChange={ e=> setBrand(e.target.value)}/>
                </div>
                <div>
                <label htmlFor="description">Descrição</label>
                    <input type="text" id="description" required placeholder="Descrição do produto" 
                    value={description} onChange={ e=> setDescription(e.target.value)}/>
                </div>
                <div>
                <label htmlFor="countInStock">Estoque</label>
                    <input type="number" id="countInStock" required placeholder="Estoque do produto" 
                     value={countInStock} onChange={ e=> setCountInStock(e.target.value)}/>
                </div>
                <div>
                    <label></label>
                    <button type="submit" className="primary">Atualizar</button>
                </div>
                    </>
                )
            }
             </form>
        </div>    
    )
    
}