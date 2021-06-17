import {  PRODUTO_ADMIN_LISTA_ERROR, PRODUTO_ADMIN_LISTA_REQUEST, PRODUTO_ADMIN_LISTA_SUCCESS, PRODUTO_CREATE_ERROR, PRODUTO_CREATE_REQUEST, PRODUTO_CREATE_RESET, PRODUTO_CREATE_SUCCESS, PRODUTO_DELETE_ERROR, PRODUTO_DELETE_REQUEST, PRODUTO_DELETE_RESET, PRODUTO_DELETE_SUCCESS, PRODUTO_DETALHES_ERROR, PRODUTO_DETALHES_REQUEST, PRODUTO_DETALHES_RESET, PRODUTO_DETALHES_SUCESS, PRODUTO_LISTA_ERROR, PRODUTO_LISTA_REQUEST, PRODUTO_LISTA_SUCESS, PRODUTO_UPDATE_ERROR, PRODUTO_UPDATE_REQUEST, PRODUTO_UPDATE_RESET, PRODUTO_UPDATE_SUCCESS } from "../constantes/produtoConstantes";

export const produtosListaReducer = (state = { loading : true , produtos : [] }, action) => {
    switch (action.type) {
        case PRODUTO_LISTA_REQUEST:
            return{
                  loading : true  
        }

        case PRODUTO_LISTA_SUCESS:
            
            return{
                loading : false,
                produtos : action.payload
            }

        case PRODUTO_LISTA_ERROR :
            return{
                loading: true,
                error : action.payload
            }   

        default:
            return state
     

    }
}

export const produtoDetalhesReducer = (state = {loading: true, produto : []}, action) =>{
    switch (action.type) {
        case PRODUTO_DETALHES_REQUEST:
            return{
                loading : true
            }
        
            case PRODUTO_DETALHES_SUCESS:
                return{
                    loading: false,
                    produto : action.payload
                }
            case PRODUTO_DETALHES_ERROR:
                return{
                    loading: true,
                    error : action.payload
                }
            
            case PRODUTO_DETALHES_RESET:
                return {}
    
        default:
            return state
    }
}

export const adminListProdutosReducer = (state = { loading : true }, action) => {
    switch (action.type) {
        case PRODUTO_ADMIN_LISTA_REQUEST:
            return {loading : true}
        
        case PRODUTO_ADMIN_LISTA_SUCCESS:
            return { loading: false, produtos: action.payload}

        case PRODUTO_ADMIN_LISTA_ERROR:
            return {loading : false, error : action.payload}
    
        default:
            return state
    }
}

export const  createdProdutoReducer = ( state = {} , action) =>{
    switch (action.type) {
        case  PRODUTO_CREATE_REQUEST:
            return { loading : true}
        case PRODUTO_CREATE_SUCCESS:
            return {loading: false, success: true}
        
        case PRODUTO_CREATE_ERROR:
            return {loading: false, error: action.payload}

        case PRODUTO_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const deleteProdutoReducer = (state = {}, action) =>{
    switch (action.type) {
        case PRODUTO_DELETE_REQUEST:
            return { loading: true}
        
        case PRODUTO_DELETE_SUCCESS:
            return {loading: false, success: true}
        
        case PRODUTO_DELETE_ERROR:
            return {loading: false, error: action.payload}
        
        case PRODUTO_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const updateProdutoReducer = ( state = {}, action) =>{
    switch (action.type) {
        case PRODUTO_UPDATE_REQUEST:
            return {loading: true}
        
        case PRODUTO_UPDATE_SUCCESS:
            return {loading: false, success: true}

        case PRODUTO_UPDATE_ERROR:
            return {loading: false, error: action.payload}
        
        case PRODUTO_UPDATE_RESET:
            return {}
    
        default:
            return state
    }
}

