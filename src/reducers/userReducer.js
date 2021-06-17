import { USER_ADMIN_UPDATE_ERROR, USER_ADMIN_UPDATE_REQUEST, USER_ADMIN_UPDATE_RESET, USER_ADMIN_UPDATE_SUCCESS, USER_DELETE_ERROR, USER_DELETE_REQUEST, USER_DELETE_RESET, USER_DELETE_SUCCESS, USER_DETAILS_ERROR, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_ERROR, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_ERROR, USER_REGISTER_REQUEST, USER_REGISTER_SUCESS, USER_SIGNIN_ERROR, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCESS, USER_SIGNOUT, USER_UPDATE_ERROR, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "../constantes/userConstantes";

export const SignReducer = ( state = {} , action) =>{
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return{
                loading : true
            }
        
        case USER_SIGNIN_SUCESS :
            return {
                loading : false,
                userInfo : action.payload
            }    
        
        case USER_SIGNIN_ERROR:
            return{
                loading : false,
                error : action.payload
            }
        
        case USER_SIGNOUT:
            return{
    
            }        

        default:
            return state
    }
}

export const RegisterReducer = ( state = {} , action) =>{
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return{
                loading : true
            }
        
        case USER_REGISTER_SUCESS:
            return {
                loading : false,
                userInfo : action.payload
            }    
        
        case USER_REGISTER_ERROR:
            return{
                loading : false,
                error : action.payload
            }
        
        default:
            return state
    }
}

export const detailsUserReducer = (state = {loading: true}, action)=>{
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true}
        
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload}
        
        case USER_DETAILS_ERROR:
            return {loading: false, error: action.payload}
        
        case USER_DETAILS_RESET:
            return { loading: true}
    
        default:
            return state 
    }

}

export const updateProfileReducer = ( state = {}, action)=>{
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {loading : true}
        case USER_UPDATE_SUCCESS:
            return {loading : false, success : true}
        case USER_UPDATE_ERROR:
            return {loading: false , error : action.payload}
        case USER_UPDATE_RESET:
            return {}
    
        default:
            return state
    }
}

export const listUserReducer = ( state = { loading : true }, action) =>{
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading : true}
        
        case USER_LIST_SUCCESS:
            return { loading : false, users: action.payload}
        
        case USER_LIST_ERROR:
            return {loading: false, error : action.payload}
        
    
        default:
            return state
    }
}

export const updateUserReducer = (state = {} , action) =>{
    switch (action.type) {
        case USER_ADMIN_UPDATE_REQUEST:
            return { loading : true}
            case USER_ADMIN_UPDATE_SUCCESS:
                return { loading: false, success: true }
              case USER_ADMIN_UPDATE_ERROR:
                return { loading: false, error: action.payload }
              case USER_ADMIN_UPDATE_RESET:
                return {}
              default:
                return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_DELETE_REQUEST:
        return { loading: true }
      case USER_DELETE_SUCCESS:
        return { loading: false, success: true }
      case USER_DELETE_ERROR:
        return { loading: false, error: action.payload }
      case USER_DELETE_RESET:
        return {}
      default:
        return state
    }
  }