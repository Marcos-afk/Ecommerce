import Axios from "axios"
import { CART_EMPTY } from "../constantes/cartConstantes"
import { PRODUTO_DETALHES_REQUEST, PRODUTO_DETALHES_SUCESS, PRODUTO_LISTA_ERROR, PRODUTO_LISTA_REQUEST, 
    PRODUTO_LISTA_SUCESS, PRODUTO_ADMIN_LISTA_REQUEST, PRODUTO_ADMIN_LISTA_ERROR , PRODUTO_ADMIN_LISTA_SUCCESS, PRODUTO_CREATE_REQUEST, PRODUTO_CREATE_ERROR, PRODUTO_CREATE_SUCCESS, PRODUTO_DELETE_REQUEST, PRODUTO_DELETE_ERROR, PRODUTO_DELETE_SUCCESS, PRODUTO_UPDATE_REQUEST, PRODUTO_UPDATE_ERROR, PRODUTO_UPDATE_SUCCESS} from "../constantes/produtoConstantes"

export const listaProdutos = () => async (dispatch) =>{
    dispatch({
        type: PRODUTO_LISTA_REQUEST
    })

    try{
        const {data} = await Axios.get('/api/produtos')
        dispatch({
            type : PRODUTO_LISTA_SUCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUTO_LISTA_ERROR,
            payload: error.message
        })

    }
}

export const detalhesProdutos = (produtoId) => async (dispatch) =>{

    dispatch({
        type : PRODUTO_DETALHES_REQUEST,
        payload : produtoId
    })

    try{

        const {data} = await Axios.get(`/api/produtos/${produtoId}`)
        dispatch({
            type: PRODUTO_DETALHES_SUCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUTO_LISTA_ERROR,
            payload: error.response && error.response.data.message ?
            error.response.data.message 
            :
            error.message
        })

    }

}

export const adminListProdutos = () => async (dispatch, getState) =>{
    dispatch({ type: PRODUTO_ADMIN_LISTA_REQUEST})
    
    try{

        const {
            userSign: { userInfo }
        } = getState()

        const {data} = await Axios.get('/api/produtos/admin', {headers :{ Authorization: `bearer ${userInfo.token}`}})
        dispatch({ type: PRODUTO_ADMIN_LISTA_SUCCESS, payload : data})
        

    }catch(error){
        dispatch({ type: PRODUTO_ADMIN_LISTA_ERROR, payload : error.response && error.response.data.message ?
            error.response.data.message 
            :
            error.message
        })
    }
}

export const createdProduto = (produto) => async (dispatch, getState)=>{
    dispatch({ type: PRODUTO_CREATE_REQUEST, payload: produto})
    try{

        const {
            userSign: { userInfo }
        } = getState()

        const {data} = await Axios.post('/api/produtos', produto,{headers :{ Authorization: `bearer ${userInfo.token}`}} )
        dispatch({ type: PRODUTO_CREATE_SUCCESS, payload: data})
        document.location.href = '/productlist'

    }catch(error){
        dispatch({ type: PRODUTO_CREATE_ERROR, payload: error.response && error.response.data.message ?
            error.response.data.message 
            :
            error.message})
    }
}

export const deleteProduto = (produtoId) => async (dispatch, getState)=> {
    dispatch({ type: PRODUTO_DELETE_REQUEST, payload: produtoId})
    try{
        const {
            userSign: { userInfo }
        } = getState()

        const {data} = Axios.delete(`/api/produtos/${produtoId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          })
        
        dispatch({type: PRODUTO_DELETE_SUCCESS, payload: data})
        dispatch({ type: CART_EMPTY })
        localStorage.removeItem('cartItems')
        document.location.href = '/productlist'

    }catch(error){
        dispatch({type: PRODUTO_DELETE_ERROR, payload: error.response && error.response.data.message ?
            error.response.data.message 
            :
            error.message})
    }

}

export const updateProduto = (produto) => async (dispatch, getState) =>{
    dispatch({ type: PRODUTO_UPDATE_REQUEST, payload: produto})
    try{
        const {
            userSign: { userInfo }
        } = getState()

        const {data} = Axios.put(`/api/produtos/${produto._id}`, produto,  {
            headers: { Authorization: `bearer ${userInfo.token}` },
          })
        
        dispatch({ type: PRODUTO_UPDATE_SUCCESS, payload: data})
    }catch(error){
        dispatch({ type: PRODUTO_UPDATE_ERROR, payload:  error.response && error.response.data.message ?
            error.response.data.message 
            :
            error.message})
    }
}

