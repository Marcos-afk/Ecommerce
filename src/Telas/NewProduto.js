import Axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createdProduto } from '../actions/produtosAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function NewProduto(props){

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState('')

    const produtoCreated = useSelector( state => state.produtoCreated)
    const {error, success, loading} = produtoCreated

    const dispatch = useDispatch()

    function submitHandler(e){
        e.preventDefault()
        dispatch( createdProduto({
            name,
            category,
            image,
            price,
            brand,
            description,
            countInStock
        }))
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
  
     

    return(
        <div>
            <div>
            <h1>Adicionar produto</h1>
            </div>
            { loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {success && <MessageBox variant="success">Produto adicionado com sucesso</MessageBox>}
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" required placeholder="Nome do produto" 
                    onChange={ e=> setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="category">Categoria</label>
                    <input type="text" id="category" required placeholder="Categoria do produto"
                     onChange={ e=> setCategory(e.target.value)}/>
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
                     onChange={ e=> setPrice(e.target.value)}/>
                </div>
                <div>
                <label htmlFor="brand">Fabricante</label>
                    <input type="text" id="brand" required placeholder="Fabricante do produto" 
                     onChange={ e=> setBrand(e.target.value)}/>
                </div>
                <div>
                <label htmlFor="description">Descrição</label>
                    <input type="text" id="description" required placeholder="Descrição do produto" 
                     onChange={ e=> setDescription(e.target.value)}/>
                </div>
                <div>
                <label htmlFor="countInStock">Estoque</label>
                    <input type="number" id="countInStock" required placeholder="Estoque do produto" 
                     onChange={ e=> setCountInStock(e.target.value)}/>
                </div>
                <div>
                    <label></label>
                    <button type="submit" className="primary">Adicionar</button>
                </div>


            </form>
        </div>
    )
}